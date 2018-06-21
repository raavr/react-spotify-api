import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout, autoLogin } from '../actions';

const LoginLink = ({ onLogin }) => {
  return (
    <Link onClick={onLogin} to='/search'>
      Login
    </Link>
  );
}
  
const LogoutLink = ({ onLogout }) => {
  return (
    <Link onClick={onLogout} to='/search'>
      Logout
    </Link>
  );
}

class Header extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.object,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    autoLogin: PropTypes.func
  }

  componentWillMount() {
    this.props.autoLogin();
  }

  render() {
    const { isAuthenticated, onLogin, onLogout } = this.props;
    return (
      <div>
        { isAuthenticated ? <LogoutLink onLogout={onLogout}/> : <LoginLink onLogin={onLogin}/> }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  isAuthenticated: store.session.session
});

export default connect(mapStateToProps, {
  onLogin: login,
  onLogout: logout,
  autoLogin
})(Header);