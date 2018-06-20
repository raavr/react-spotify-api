import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route } from 'react-router-dom'
import App from './App'
import Header from './Header';
import Login from './Login';
import Callback from '../components/Callback';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/callback" component={Callback} />
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
