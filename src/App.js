import React from 'react';
import './App.css';
import { Switch, Route, Link,  BrowserRouter as Router } from "react-router-dom";

import AboutPage from "./component/about/AboutPage";
import CovidDashboardPage from "./component/dashboard/CovidDashboardPage";
import NotFoundPage from "./component/NotFoundPage";
import { hot } from "react-hot-loader";
import Login from "./component/auth/Login"
import Register from "./component/auth/Register"

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {

    return (
      <div>

        <div className="container-fluid">
           <div className="col-lg-12">


            <Router>
          <Switch>

          <Route exact path={["/covid-19", "/covid-19/login"]} component={Login} />

          <Route exact path="/covid-19/register" component={Register} />
          <Route exact path="/covid-19/dashboard" component={CovidDashboardPage} />
          <Route path="/covid-19/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
        </Router>


          </div>
          </div>
      </div>
    );
  }
}


export default hot(module)(App);
