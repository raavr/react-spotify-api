import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import DevTools from './DevTools';
import App from './App';
import Header from './Header';
import Login from './Login';
import Callback from '../components/Callback';
import Albums from './Albums';
import ErrorMessage from './ErrorMessage';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <ErrorMessage />
      <Switch>
        <Route path="/search/:name?" component={App} />
        <Route path="/artist/:id" component={Albums} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/callback" component={Callback} />
        <Redirect to="/search" />
      </Switch>
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
