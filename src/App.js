import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import APIEX from './components/APIEX';
import DataVis from './components/DataVis';
import Misc from './components/Misc';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/api" component={APIEX} />
        <Route exact path="/data" component={DataVis} />
        <Route exact path="/misc" component={Misc} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
      <Footer /> 
      </Router>
    </div>
  );
}

export default App;
