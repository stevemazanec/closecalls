import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Recent from './Components/Recent';
import Past from './Components/Past';
import Heatmap from './Components/Heatmap';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/recent" component={Recent} />
          <Route exact path="/past" component={Past} />
          <Route exact path="/heatmap" component={Heatmap} />
        </div>
      </Router>

    );
  }
}

export default App;
