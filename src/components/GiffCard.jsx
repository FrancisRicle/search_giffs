import React from 'react';
import {Card} from 'react-bootstrap';
export default function GiffCard({giff}){
    return(
    <Card>
        <Card.Img src={giff}/>
    </Card>)
}