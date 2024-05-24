import { Subtitle, Description, Label } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import { useState, } from 'react';
import styles from './results.module.css';

function getHighlightsHTML(highlightsField,fieldName){
    const highlightedStrings = highlightsField
        .filter(h => h.path == fieldName)
        .map(h => {
        return h.texts.map(t => {
            if(t.type === "hit"){
            return "<strong style='color:blue'>"+t.value+"</strong>"
            }else{
            return t.value
            }
        }).join('')
        
    });
    return highlightedStrings;
}

function createHighlighting(highlightsField,fieldName,fieldValue) {
    const highlightedStrings = getHighlightsHTML(highlightsField,fieldName);

    const nonHighlightedStrings = highlightsField
        .filter(h => h.path == fieldName)
        .map(h => {
        return h.texts.map(t => t.value).join('')
    });

    highlightedStrings.forEach((str,idx) => {
        fieldValue = fieldValue.replace(nonHighlightedStrings[idx],str);
    });

    return {__html: fieldValue};
}


function SearchResult({r,schema}){
    const [showHighlights, setShowHighlights] = useState(false);

    const toggleHighlights = () => {
        setShowHighlights(!showHighlights);
    }

    return (
        <Card style={{margin:"10px"}}>
            <Label>{r.attribution}</Label>
            <div style={{display: 'flex',gap:'10px'}}>
                {r.image?<img src={r.image} style={{maxHeight:"120px"}}/>:<></>}
                <div>
                    <Subtitle style={{paddingBottom:"5px"}}>
                        {'lang' in r ? r.title[r.lang] : r.title}
                    </Subtitle>
                    { 'lang' in r
                        ?
                        <Description>
                            {r.highlights?.length > 0
                                ?
                                <span dangerouslySetInnerHTML={createHighlighting(r.highlights,`${schema.descriptionField}.${r.lang}`,r.description[r.lang])} />
                                : 
                                r.description[r.lang]
                            }
                        </Description>
                        :
                        <Description>
                            {r.highlights?.length > 0
                                ?
                                <span dangerouslySetInnerHTML={createHighlighting(r.highlights,`${schema.descriptionField}`,r.description)} />
                                : 
                                r.description
                            }
                        </Description>
                    }
                </div>
            </div>
            {getHighlightsHTML(r.highlights,`${schema.contentField}.${r.lang}`).length > 0
                ?
                <div style={{paddingTop:"25px"}}>
                    <span><Label>Content highlights - {getHighlightsHTML(r.highlights,`${schema.contentField}.${r.lang}`).length}</Label><Icon className={styles.toggle} onClick={toggleHighlights} glyph={showHighlights? "ChevronDown": "ChevronUp"} fill="None" /></span>
                    {showHighlights?
                        <Description>
                            {getHighlightsHTML(r.highlights,`${schema.contentField}.${r.lang}`).map((h,i) => (
                                <p key={`${r._id}_content_highlight_p${i}`}>...<span key={`${r._id}_content_highlight_span${i}`} dangerouslySetInnerHTML={{__html:h}}/>...</p>
                            ))}
                        </Description>
                        :
                        <></>
                    }
                </div>
                :
                <></>
            }
        </Card>
    )
}

function ChunksResult({r,schema}){
    const [showChunks, setShowChunks] = useState(false);

    const toggleChunks = () => {
        setShowChunks(!showChunks);
    }

    return (
        <Card style={{margin:"10px"}}>
            <Label>{r.attribution}</Label>
            <div style={{display: 'flex',gap:'10px'}}>
                <div>
                    <Subtitle style={{paddingBottom:"5px"}}>
                        {r.title}
                    </Subtitle>
                    <Label>Most Relevant Chunk: {r.chunks[0].chunk} - Score: {r.chunks[0].score.toFixed(5)}</Label>
                    <Description>
                        {r.chunks[0].content}
                    </Description>
                </div>
            </div>
            {r.chunks.length > 1
                ?
                <div style={{paddingTop:"25px"}}>
                    <span><Label>{r.chunks.length - 1} more chunks</Label><Icon className={styles.toggle} onClick={toggleChunks} glyph={showChunks? "ChevronDown": "ChevronUp"} fill="None" /></span>
                    {showChunks?
                        <Description>
                            {r.chunks.slice(1).map((c,i) => (
                                <div key={`${r._id}_chunk_p${i}`}>
                                    <Label key={`${r._id}_score_p${i}`}>Chunk: {c.chunk} - Score: {c.score.toFixed(5)}</Label>
                                    <p key={`${r._id}_content_p${i}`}>{c.content}</p>
                                </div>
                            ))}
                        </Description>
                        :
                        <></>
                    }
                </div>
                :
                <></>
            }
        </Card>
    )
}

export { SearchResult, ChunksResult };