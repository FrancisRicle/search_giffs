import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import GridGiffs from "./components/GridGiffs";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar}/>
      <Route exact path="/" component={GridGiffs}/>
      <Route exact path="/top/:top" render={({match}) => <GridGiffs top={match.params.top}/>}/>
    </div>
  );
}
export default App;
