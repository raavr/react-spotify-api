import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

export const Login = ({ isAuthenticated, onLogin, location }) => {
  const { from } = location.state || { from: { pathname: "/search" } };
  return isAuthenticated
    ? <Redirect to={from} />
    : (
      <button type="button" onClick={onLogin} className="btn btn__login-with">
        Login with Spotify
      </button>
    );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: Boolean(state.session.session)
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: bindActionCreators(login, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
