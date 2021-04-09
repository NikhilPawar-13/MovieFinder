import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import MovieCards from "./Components/MovieCards";
import Details from "./Components/Details";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        
        <BrowserRouter>      
        
          <Switch>                    
            <Route path="/" component={MovieCards} exact></Route>
            <Route path="/Details" component={Details}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
