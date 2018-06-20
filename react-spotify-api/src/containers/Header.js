import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions';

const LoginLink = ({ onLogin }) => {
  return (
    <Link onClick={onLogin} to='/'>
      Login
    </Link>
  );
}
  
const LogoutLink = ({ onLogout }) => {
  return (
    <Link onClick={onLogout} to='/'>
      Logout
    </Link>
  );
}

const Header = ({ isAuthenticated, onLogout, onLogin }) => {
  return (
    <div>
      { isAuthenticated ? <LogoutLink onLogout={onLogout}/> : <LoginLink onLogin={onLogin}/> }
    </div>
  )
}

Header.propTypes = {
  isAuthenticated: PropTypes.object,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func
}

const mapStateToProps = (store) => ({
  isAuthenticated: store.session.session
});

export default connect(mapStateToProps, {
  onLogin: login,
  onLogout: logout
})(Header);