import { MongoClient, MongoError } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const searchIndex = {
  name:"nestedFacetsSearchIndex",
  definition: {
    "mappings": {
      "dynamic": true,
      "fields": {
        [process.env.nested_facet_name]: {
          "fields": {},
          "dynamic": false,
          "type": "document"
        },
        [process.env.normal_facet_name]:[
          {"type": "stringFacet"},
          {"type": "token"}
        ]
      }
    }
  }
  
}

for (let i = 0; i < process.env.nested_levels; i++) {
  searchIndex.definition.mappings.fields[process.env.nested_facet_name].fields[`level${i}`] = [
    {
      "type": "stringFacet"
    },
    {
      "type": "token"
    }
  ]
}

console.log("Search index definition: ", JSON.stringify(searchIndex,null,2))

console.log("Connection string: ", process.env.uri);
console.log("Database: ", process.env.database);
console.log("Collection: ", process.env.collection);

try{
  const client = new MongoClient(process.env.uri);
  await client.connect();
  try{
      const db = client.db(process.env.database);
      const collection = db.collection(process.env.collection);
      try{
        await collection.createSearchIndex(searchIndex);
      }catch(error){
        if(error instanceof MongoError && error.codeName == 'IndexAlreadyExists'){
          console.log('Index already exists. Updating...');
          await collection.updateSearchIndex("nestedFacetsSearchIndex",searchIndex.definition);
        }
        else{
          console.log(`Creating index failed ${error}`);
          throw error;
        }
      }finally{
        console.log('Existing search indexes...');
        const indexes = await collection.listSearchIndexes().toArray();
        for(const index of indexes){
          console.log(index.name,'\t',index.status);
        }
      }

      try{
        var matchStage = {'$match':{
          [process.env.nested_facet_name]: {'$exists': false}
        }}
        var addFieldsStage = {
          '$addFields': {
            [process.env.nested_facet_name]: {}
          }
        }
        const fields = process.env.nested_fields.split(',');
        for (const i in fields){
          matchStage['$match'][fields[i]] = {'$exists': true}
          if(i == 0){
            addFieldsStage['$addFields'][process.env.nested_facet_name][`level${i}`] = `$${fields[i]}`
          }else{
            var concat = []
            var j = 0; 
            while(j<i){
              concat.push(`$${fields[j]}`);
              concat.push('/');
              j++;
            }
            concat.push(`$${fields[i]}`);
            addFieldsStage['$addFields'][process.env.nested_facet_name][`level${i}`] = {
              '$concat': concat
            }
          }
        }

        const pipeline = [
          matchStage,
          addFieldsStage,
          {
            '$merge': {
              'into': process.env.collection, 
              'on': '_id', 
              'whenMatched': 'merge', 
              'whenNotMatched': 'discard'
            }
          }
        ]
        console.log('Executing merge pipeline...');
        console.log(JSON.stringify(pipeline,null,2));
        await collection.aggregate(pipeline).toArray();
        console.log('Merge pipeline executed');
      }catch(error){
        console.log(`Executing merge pipeline failed ${error}`);
        console.log(JSON.stringify(pipeline,null,2));
        throw error;
      }
      try{
        const testResult = await collection.findOne({[process.env.nested_facet_name]: {'$exists': true}},{projection:{[process.env.nested_facet_name]:1}});
        console.log('Test result:',JSON.stringify(testResult,null,2));
      }catch(error){
        console.log(`Test failed ${error}`);
        throw error;
      }
  }catch(error){
      throw error;
  }finally{
      client.close();
  }
}catch(error){
  console.log(`Connection failed ${error}`);
  throw error;
}
