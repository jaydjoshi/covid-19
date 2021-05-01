import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AboutPage from "./component/about/AboutPage";
import CovidDashboardPage from "./component/dashboard/CovidDashboardPage";
import HomePage from "./component/HomePage";
import NotFoundPage from "./component/NotFoundPage";
import { hot } from "react-hot-loader";

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>

         <Router>
             <Switch>
          {/* till login page is not created*/}
          <Route exact path="/" component={CovidDashboardPage} />

          <Route path="/covid-dashboard" component={CovidDashboardPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
          </Router>
      </div>
    );
  }
}


export default hot(module)(App);
