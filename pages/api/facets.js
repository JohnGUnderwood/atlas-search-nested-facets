import { createRouter } from 'next-connect';
import database from '../../middleware/database';
import dotenv from 'dotenv';
dotenv.config();

function buildPipeline(searchMeta){
    for(var i = 0; i<process.env.nested_levels; i++){
        searchMeta.$searchMeta.facet.facets[`${process.env.nested_facet_name}_level${i}`] = {type:"string",path:`${process.env.nested_facet_name}.level${i}`}
    }
    var splitPaths = {$addFields:{}}
    for(var i = 0; i<process.env.nested_levels; i++){
        splitPaths.$addFields[`facet.${process.env.nested_facet_name}_level${i}.buckets`] = {
            $map: {
              input: `$facet.${process.env.nested_facet_name}_level${i}.buckets`,
              as: "bucket",
              in: {
                path: {
                  $split: ["$$bucket._id", "/"]
                },
                _id: "$$bucket._id",
                count: "$$bucket.count"
              }
            }
          }
    }
    var pipeline = [searchMeta,splitPaths]
    for(var i = process.env.nested_levels-2; i>=0; i--){
        const n = i+1
        pipeline.push({$addFields:{
            [`facet.${process.env.nested_facet_name}_level${i}.buckets`]:{
                $map: {
                    input: `$facet.${process.env.nested_facet_name}_level${i}.buckets`,
                    as: "bucket",
                    in: {
                        _id: {
                        $last: "$$bucket.path"
                        },
                        count: "$$bucket.count",
                        path: "$$bucket.path",
                        buckets: {
                        $filter: {
                            input:`$facet.${process.env.nested_facet_name}_level${n}.buckets`,
                            as: "candidate",
                            cond: {
                            $eq: [
                                {
                                $slice: ["$$candidate.path", i+1]
                                },
                                "$$bucket.path"
                            ]
                            }
                        }
                        }
                    }
                }
            }
        }
        })
    }
    pipeline.push({$project:{ 
        [`facet.${process.env.nested_facet_name}`]:`$facet.${process.env.nested_facet_name}_level0`,
    }})
    return pipeline;
}

async function getResults(collection,pipeline){
    try{
        const results = await collection.aggregate(pipeline).toArray();
        return results;
    }catch(error){
        throw error
    }
}

const router = createRouter();

router.use(database);

router.post(async (req, res) => {
    if(!req.body.searchMeta){
        console.log(`Request missing 'searchMeta' data`)
        res.status(400).send(`Request missing 'searchMeta' data`);
    }else{
        const searchMeta = req.body.searchMeta;
        const pipeline = buildPipeline(searchMeta);
        try{
            const response = await getResults(req.collection,pipeline);
            res.status(200).json({results:response,query:pipeline});
        }catch(error){
            res.status(405).json({'error':`${error}`,query:pipeline});
        }
    }
});

export default router.handler();