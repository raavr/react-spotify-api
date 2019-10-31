import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { autoLogin } from '../actions';

export class PrivateRoute extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    autoLogin: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { autoLogin, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      autoLogin();
    }
  }

  renderIfAuthenticated = props => {
    const { component: WrappedComponent, isAuthenticated } = this.props;
    return isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.location
          }
        }}
      />
    );
  };

  render() {
    const {
      component: WrappedComponent,
      isAuthenticated,
      ...rest
    } = this.props;

    return <Route {...rest} render={this.renderIfAuthenticated} />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: Boolean(state.session.session)
});

export default connect(
  mapStateToProps,
  {
    autoLogin
  }
)(PrivateRoute);
