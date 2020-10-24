import React, { useEffect } from 'react';
import GiffCard from "./GiffCard";
import { CardColumns, Pagination, Card } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {search_giffs, trending_giffs} from '../store/actions';
import loading from "../loading.gif";
export default function GridGiffs({top}){
    const {giffs, total, pag, query, limit} = useSelector(state => state);
    const dispatch = useDispatch();
    const PrevPag = () =>{
        !!pag && dispatch(search_giffs(query, pag -1));
    }
    const NextPag = () =>{
        if(pag < (total/25))dispatch(search_giffs(query, pag +1));
    }
    useEffect(()=>{
        if(!!top){
            dispatch(trending_giffs(top));
        }
    },[top, dispatch])
    const renderPagination = (total, limit, pag) =>{
        let pagination = [];
        for(let i=1;i<=Math.ceil(total/ limit);i++){
            if(Array.isArray(pagination[Math.ceil(i/5) -1]))pagination[Math.ceil(i/5) -1] = [...pagination[Math.ceil(i/5) -1], i];
            else pagination[Math.ceil(i/5) -1] = [i];
        }
        return(
            <Pagination>
                <Pagination.Prev onClick={() => PrevPag()}/>
                {pagination[(pag % 5)?(Math.ceil(pag/5) -1):(Math.ceil(pag/5))].map(page => 
                    <Pagination.Item
                        active={page === pag}
                        onClick={() => dispatch(search_giffs(query, page))}
                    >
                        {page}
                    </Pagination.Item>
                )}
                <Pagination.Ellipsis disabled/>
                {pag < Math.ceil(total / limit) && 
                    <Pagination.Item 
                        active={pag === Math.ceil(total / limit)} 
                        onClick={() => dispatch(search_giffs(query, Math.ceil(total / limit)))}
                    >
                        {Math.ceil(total / limit)}
                    </Pagination.Item>
                }
                {pag < Math.ceil(total / limit) && <Pagination.Next onClick={() => NextPag()}/>}
            </Pagination>
        );
    }
    if(!giffs) return (
            <div className="GridGiffs">
                <Card className="Loading">
                    <Card.Img src={loading}/>
                </Card>
            </div>
        );
    if(Array.isArray(giffs) && !giffs.length) return (
        <div className="GridGiffs">
            <h1>No hay nada aqui :V</h1>
        </div>
    );
    return (
        <div className="GridGiffs">
            <CardColumns>
                {giffs.map(giff => (
                    <GiffCard giff={giff}/>
                ))}
            </CardColumns>
            {!!query && renderPagination(total, limit, pag)}
        </div>
    );
}