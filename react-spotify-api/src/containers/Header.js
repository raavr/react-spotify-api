import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions';

const LoginLink = ({ onLogin }) => {
  return (
    <Link onClick={onLogin} to="/login">
      Login
    </Link>
  );
};

const LogoutLink = ({ onLogout }) => {
  return (
    <Link onClick={onLogout} to="/login">
      Logout
    </Link>
  );
};

class Header extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  render() {
    const { isAuthenticated, onLogin, onLogout } = this.props;
    return (
      <div className="header">
        {isAuthenticated
          ? <LogoutLink onLogout={onLogout} />
          : <LoginLink onLogin={onLogin} />
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isAuthenticated: Boolean(store.session.session)
});

export default connect(mapStateToProps, {
  onLogin: login,
  onLogout: logout
})(Header);
