import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestTypes } from '../actions';

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.object,
    isPendingRequest: PropTypes.bool
  }

  render() {
    const { isAuthenticated, isPendingRequest } = this.props;

    if (isPendingRequest) {
      return <div>Waiting...</div>;
    }

    if (!isAuthenticated) {
      return <Redirect to="/login" />
    }

    return (
      <p>Let's get started!</p>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.session,
  isPendingRequest: state.request[requestTypes.AUTH]
});

export default connect(mapStateToProps)(App);
