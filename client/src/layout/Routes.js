import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../components/Auth/PrivateRoute';

// PAGES
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import Dashboard from '../components/Dashboard/Dashboard';

import NotFound from '../components/NotFound/404';

// SUPPORT

// LEGAL


export default class Body extends React.Component {
  render() {
    return (
      <Switch>
        {/* PUBLIC ROUTES */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        {/* PRIVATE ROUTES */}
        <PrivateRoute path="/dashboard" component={Dashboard} />

        {/* 404 - PAGE NOT FOUND ROUTE */}
        <Route component={NotFound} />
        <Redirect from="*" to="/404" />

      </Switch>
    );
  }
}
