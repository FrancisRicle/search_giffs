import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import GridGiffs from "./components/GridGiffs";
import SearchBar from "./components/SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={SearchBar}/>
      <Route exact path="/" component={GridGiffs}/>
    </div>
  );
}
export default App;
