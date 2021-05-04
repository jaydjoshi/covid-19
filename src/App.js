import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AboutPage from "./component/about/AboutPage";
import CovidDashboardPage from "./component/dashboard/CovidDashboardPage";
import NotFoundPage from "./component/NotFoundPage";
import { hot } from "react-hot-loader";
import Login from "./component/auth/Login"

class App extends React.Component {
  render() {

    return (
      <div>

         <Router>
             <Switch>

          <Route exact path="/covid-19" component={Login} />
          <Route exact path="/covid-19/dashboard" component={CovidDashboardPage} />
          <Route path="/covid-19/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
          </Router>
      </div>
    );
  }
}


export default hot(module)(App);
