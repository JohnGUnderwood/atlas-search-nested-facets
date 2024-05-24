import React, { useState } from 'react';
import Card from '@leafygreen-ui/card';
import { Subtitle } from '@leafygreen-ui/typography';

function Facets({facets,onFilterChange}){
    return (
        <Card>
            { Object.entries(facets).map(([facet,vals])=>(
                    <div key={facet}>
                        <Subtitle key={`${facet}_name`}>{facet}</Subtitle>
                        {vals.buckets.map(bucket => (
                            <div key={bucket._id} style={{paddingLeft:"15px"}}>
                                <span key={`${bucket._id}_label`} onClick={()=>onFilterChange(facet,{val:bucket._id,type:"equals"})} style={{cursor:"pointer",paddingRight:"5px", color:"blue"}}>{bucket._id}</span>
                                <span key={`${bucket._id}_count`}>({bucket.count})</span>
                            </div>
                        ))}
                    </div>
                ))
            }
        </Card>
    )
}

function NestedFacets({facets, onFilterChange}){
    const [expanded, setExpanded] = useState({});

    const toggleExpanded = id => {
        setExpanded(prev => ({...prev, [id]: !prev[id]}));
    };

    const renderBuckets = (buckets, padding, facet) => {
        return buckets.map(bucket => (
            <div key={bucket._id} style={{paddingLeft: `${padding}px`}}>
                {bucket.buckets && bucket.buckets.length > 0 && (
                    <span onClick={() => toggleExpanded(bucket._id)} style={{cursor:"pointer", paddingRight:"5px"}}>
                        {expanded[bucket._id] ? '-' : '+'}
                    </span>
                )}
                {bucket.path && bucket.path.length>0?(
                    <>
                    <span key={`${bucket.path.join('/')}`} onClick={()=>onFilterChange(`${facet}.level${bucket.path.length-1}`,{val:bucket.path.join('/'), type:"equals"})} style={{cursor:"pointer",paddingRight:"5px", color:"blue"}}>{bucket._id}</span>
                    <span key={`${bucket.path.join('/')}_count`}>({bucket.count})</span>
                    </>
                ):(
                    <>
                    <span key={`${bucket._id}_label`} onClick={()=>onFilterChange(facet,{val:bucket._id,type:"equals"})} style={{cursor:"pointer",paddingRight:"5px", color:"blue"}}>{bucket._id}</span>
                    <span key={`${bucket._id}_count`}>({bucket.count})</span>
                    </>
                )}
                {expanded[bucket._id] && bucket.buckets && bucket.buckets.length > 0 && renderBuckets(bucket.buckets, padding + padding, facet)}
            </div>
        ));
    };

    return (
        <Card>
            {Object.entries(facets).map(([facet, vals]) => (
                <div key={facet}>
                    <Subtitle key={`${facet}_name`}>{facet}</Subtitle>
                    {renderBuckets(vals.buckets, 5, facet)}
                </div>
            ))}
        </Card>
    );
}

export { Facets, NestedFacets };