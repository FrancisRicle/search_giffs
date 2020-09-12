import React from 'react';
import {Navbar} from 'react-bootstrap';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
export default function NavBar(){
    return(
        <Navbar fixed="top" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/top/25">Top 25 Giffs</Navbar.Brand>
            <SearchBar/>
        </Navbar>
    );
}