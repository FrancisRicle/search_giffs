import React, { useEffect, useState } from 'react';
import GiffCard from "./GiffCard";
import { CardColumns, Pagination, Spinner, Button } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {search_giffs, trending_giffs} from '../store/actions'
import {Link} from 'react-router-dom';
export default function GridGiffs({top}){
    const {giffs, total, pag, query} = useSelector(state => state);
    const dispatch = useDispatch();
    const [grid, setGrid] = useState();
    const Loading = (<h3><Spinner animation="border"/>Buscando ...</h3>);
    const [status, setStatus] = useState(Loading);
    const PrevPag = () =>{
        !!pag && dispatch(search_giffs(query, pag -1));
    }
    const NextPag = () =>{
        if(pag < (total/25))dispatch(search_giffs(query, pag +1));
    }
    useEffect(()=>{
        if(!giffs) setTimeout(()=>setStatus(<h3>Sin Resultados</h3>),3000);
        else {
            alert("new giffs")
            setGrid();
            setStatus(Loading)
            setTimeout(()=>setGrid(giffs),3000)
        }
        //eslint-disable-next-line
    },[giffs])
    useEffect(()=>{
        if(!!top){
            setGrid();
            dispatch(trending_giffs(top));
        }
    },[top, dispatch])
    return(
        <div className="GridGiffs">
            {
                !!grid?(<CardColumns>
                    {
                        grid.map(giff => <GiffCard giff={giff.images.original.url}/> )
                    }
                </CardColumns>):
                (<div className="Loading">
                   {status}
                </div>)
            }
            { (!!total && !!grid)? 
                (<Pagination>
                    {(pag > 0) && (<Pagination.Prev onClick={() =>PrevPag()}/>)}
                    {(pag > 0) && 
                        <Pagination.Item active={pag ===0} onClick={() => dispatch(search_giffs(query, 0))}>
                            1
                        </Pagination.Item>
                    }
                    {(pag > 0) && <Pagination.Ellipsis disabled/>}
                    {(()=>{
                        let pag_items = []
                        for(let i=0;i<Math.floor(total / 25);i++){
                            pag_items.push(i)
                        }
                        return pag_items.map(pag_item =>{
                            if(pag_item >=pag && pag_item < pag + 5)return(
                                <Pagination.Item active={(pag+1===pag_item+1)} onClick={() => dispatch(search_giffs(query, pag_item))} >
                                    {pag_item +1}
                                </Pagination.Item>
                            );
                            return(<div></div>);
                        });
                    })()}
                    {(pag < Math.floor(total/25)) && <Pagination.Ellipsis disabled/>}
                    {(pag < Math.floor(total/25)) && 
                        <Pagination.Item active={pag ===Math.floor(total/25)} onClick={() => dispatch(search_giffs(query, Math.floor(total/25)))}>
                            {Math.floor(total/25)}
                        </Pagination.Item>
                    }
                    {(pag < Math.floor(total/25)) && <Pagination.Next onClick={() =>NextPag()}/>}
                </Pagination>): (!!top && !!grid && 
                ((parseInt(top) < 49) && <Button variant="primary" size="lg" as={Link} to={"/top/" +(parseInt(top)+25)}>Mostrar mas</Button>))
            }
        </div>
    );
}