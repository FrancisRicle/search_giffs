import React from 'react';
import GiffCard from "./GiffCard";
import { CardColumns, Pagination } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {search_giffs} from '../store/actions'
export default function GridGiffs(){
    const {giffs, total, pag, query} = useSelector(state => state);
    const dispatch = useDispatch();
    return(
        <div className="GridGiffs">
            <CardColumns>
                {
                    !!giffs && giffs.map(giff => <GiffCard giff={giff.images.original.url}/> )
                }
            </CardColumns>
            { !!total && 
                <Pagination>
                    {(()=>{
                        let pag_items = []
                        for(let i=0;i<(total / 25);i++){
                            pag_items.push(i)
                        }
                        return pag_items.map(pag_item => 
                            <Pagination.Item active={(pag+1===pag_item+1)} onClick={() => dispatch(search_giffs(query, pag_item))} >
                                {pag_item +1}
                            </Pagination.Item>
                        )
                    })()}
                </Pagination>
            }
        </div>
    );
}