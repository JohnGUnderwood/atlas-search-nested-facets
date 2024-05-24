import axios from 'axios';
import Header from '../components/head';
import {SearchInput} from '@leafygreen-ui/search-input';
import { useState, useEffect } from 'react';
import { H1, Subtitle, Description, } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import { NestedFacets, Filters, SearchResult } from '../components/search';

// schema variables
const schema = {
  descriptionField : "description",
  contentField : "description",
  titleField : "name",
  imageField : "images.picture_url"
}

export default function Home(){
  const [query, setQuery] = useState(null);
  const [filters, setFilters] = useState({});
  const [instantResults, setInstantResults] = useState(null);
  const [facets, setFacets] = useState(null);

  const handleSearch = () => {
    if(query && query != ""){
      getInstantResults(query,filters)
      .then(resp => setInstantResults(resp.data.results))
      .catch(error => console.log(error));

      getFacets(query,filters)
      .then(resp => setFacets(resp.data.results))
      .catch(error => console.log(error));
    }else{
      setQuery(null);
    }
  }

  const handleAddFilter = (filter,val) => {
    console.log(filter,val)
    let copiedFilters = {...filters};
    copiedFilters[filter] = val;
    setFilters(copiedFilters);
  };

  const handleRemoveFilter = (field) => {
    let copiedFilters = {...filters};
    delete copiedFilters[field]
    setFilters(copiedFilters);
  }

  const handleQueryChange = (event) => {
    setInstantResults(null);
    setQuery(event.target.value);
    getInstantResults(event.target.value,filters)
    .then(resp => setInstantResults(resp.data.results))
    .catch(error => console.log(error));

    getFacets(event.target.value,filters)
    .then(resp => setFacets(resp.data.results))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    handleSearch();
  },[filters]);

  return (
    <>
    <Header/>
    <div style={{display:"grid",gridTemplateColumns:"30% 70%",gap:"0px",alignItems:"start"}}>
      <div style={{paddingTop:"225px"}}>
      {facets
        ? 
        // JSON.stringify(facets,null,2)
        <NestedFacets facets={facets} onFilterChange={handleAddFilter}/>
        : <></>
      }
      </div>
      <div>
        <H1 style={{paddingLeft:"30%",paddingTop:"100px"}}>Property Search</H1>
        <div style={{display:"grid",gridTemplateColumns:"75% 60px 60px",gap:"10px",alignItems:"start", paddingLeft:"16px"}}>
          <div><SearchInput onChange={handleQueryChange} aria-label="some label" style={{marginBottom:"20px"}}></SearchInput></div>
          <div><Button onClick={()=>handleSearch()} variant="primary">Search</Button></div>
        </div>
        {filters? Object.keys(filters).length > 0 ? <Filters filters={filters} handleRemoveFilter={handleRemoveFilter}/> :<></>:<></>}
        {
          instantResults && instantResults.length > 0
          ?
          <div style={{maxWidth:"95%"}}>
            {instantResults.map(r => (
              <SearchResult query={query} key={r._id} r={r} schema={schema}></SearchResult>
            ))}
          </div>
          :
          <></>
        }
      </div>
    </div>
    </>
  )
}

function createHighlighting(highlightsField,fieldName,fieldValue) {
  const highlightedStrings = highlightsField.map(h => {
    if(h.path === fieldName){
      return h.texts.map(t => {
        if(t.type === "hit"){
          return "<strong style='color:blue'>"+t.value+"</strong>"
        }else{
          return t.value
        }
        
      }).join('')
    }
  });

  const nonHighlightedStrings = highlightsField.map(h => {
    if(h.path === fieldName){
      return h.texts.map(t => t.value).join('')
    }
  });

  highlightedStrings.forEach((str,idx) => {
    fieldValue = fieldValue.replace(nonHighlightedStrings[idx],str);
  });

  return {__html: fieldValue};
}

async function getInstantResults(query,filters) {
  var searchStage = {
    $search:{
      index:'nestedFacetsSearchIndex',
      highlight:{
        path:`${schema.descriptionField}`
      },
      compound:{
        must:[
          {
            text:{
              query:query,
              path:{wildcard:"*"}
            },
          }
        ],
        filter:[]
      }
    },
  }

  if(filters && Object.keys(filters).length > 0){
    for (const [field, filter] of Object.entries(filters)){

      if(filter.type == "equals"){
          const opt = {
              equals: {
                  path: field,
                  value: filter.val
              }
          }
          searchStage.$search.compound.filter.push(opt);
      }
    }
  }
  const pipeline = [
      searchStage,
      {
          $limit:10
      },
      {
          $project:{
            title:`$${schema.titleField}`,
            image:`$${schema.imageField}`,
            description:`$${schema.descriptionField}`,
            highlights: { $meta: "searchHighlights" },
            score:{$meta:"searchScore"},
          }
      }
  ]
  return new Promise((resolve) => {
      axios.post(`api/search`,
          { 
            pipeline : pipeline
          },
      ).then(response => resolve(response))
      .catch((error) => {
          console.log(error)
          resolve(error.response.data);
      })
  });
}

async function getFacets(query,filters) {
  const searchMeta = {
        $searchMeta:{
          index:'nestedFacetsSearchIndex',
          facet:{
            operator:{
              compound:{
                must:[
                  {
                    text:{
                      query:query,
                      path:{wildcard:"*"}
                    }
                  }
                ],
                filter:[]
              }
            },
            facets:{}
          }
        },
      }
  
  if(filters && Object.keys(filters).length > 0){
    for (const [field, filter] of Object.entries(filters)){

      if(filter.type == "equals"){
          const opt = {
              equals: {
                  path: field,
                  value: filter.val
              }
          }
          searchMeta.$searchMeta.facet.operator.compound.filter.push(opt);
      }
    }
  }
  return new Promise((resolve) => {
      axios.post(`api/facets`,
          { 
            searchMeta : searchMeta
          },
      ).then(response => resolve(response))
      .catch((error) => {
          console.log(error)
          resolve(error.response.data);
      })
  });
}