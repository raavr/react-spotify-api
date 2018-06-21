import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

const Login = ({ isAuthenticated, onLogin }) => {
  return isAuthenticated ? 
    <Redirect to="/search" /> : 
    <button type="button" onClick={onLogin}>Login with Spotify</button>
}

Login.propTypes = {
  isAuthenticated: PropTypes.object,
  onLogin: PropTypes.func
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.session
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: bindActionCreators(login, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);