import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout, autoLogin } from '../actions';

const LoginLink = ({ onLogin }) => {
  return (
    <Link onClick={onLogin} to="/search">
      Login
    </Link>
  );
};

const LogoutLink = ({ onLogout }) => {
  return (
    <Link onClick={onLogout} to="/search">
      Logout
    </Link>
  );
};

class Header extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    autoLogin: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }

  render() {
    const { isAuthenticated, onLogin, onLogout } = this.props;
    return (
      <div>
        { isAuthenticated ? <LogoutLink onLogout={onLogout} /> : <LoginLink onLogin={onLogin} /> }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isAuthenticated: Boolean(store.session.session)
});

export default connect(mapStateToProps, {
  onLogin: login,
  onLogout: logout,
  autoLogin
})(Header);
