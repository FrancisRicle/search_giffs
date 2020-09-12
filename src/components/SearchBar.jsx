import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import {search_giffs} from '../store/actions';
export default function SearchBar(){
    const [searchField, setSearchField] = useState("");
    const dispatch = useDispatch();
    const search = (e) =>{
        e.preventDefault();
        dispatch(search_giffs(searchField));
    }
    return(
        <div className="searchBar">
            <Form inline onSubmit={search}>
                <Form.Control value={searchField} onChange={e => setSearchField(e.target.value)} type="text" placeholder="ex: Los simpson" className="mr-sm-2" />
                <Button variant="outline-success" type="submit">Buscar</Button>
            </Form>
        </div>
    );
}