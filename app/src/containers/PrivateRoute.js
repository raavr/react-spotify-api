import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { autoLogin } from '../actions';

class PrivateRoute extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    autoLogin: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { autoLogin, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      autoLogin();
    }
  }

  render() {
    const {
      component: WrappedComponent,
      isAuthenticated,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => (
          isAuthenticated ? (
            <WrappedComponent {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          )
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: Boolean(state.session.session)
});

export default connect(mapStateToProps, {
  autoLogin
})(PrivateRoute);
