import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestTypes } from '../actions';
import { Search } from '../components/Search';

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.object,
    isPendingRequest: PropTypes.bool,
    searchValue: PropTypes.string
  }

  handleChange = nextValue => {
    this.props.history.push(`/search/${nextValue}`)
  }

  render() {
    const { isAuthenticated, isPendingRequest, searchValue } = this.props;

    if (isPendingRequest) {
      return <div>Waiting...</div>;
    }

    if (!isAuthenticated) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Search searchValue={searchValue} onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.session.session,
  isPendingRequest: state.request[requestTypes.AUTH],
  searchValue: ownProps.match.params.name || ''
});

export default withRouter(connect(mapStateToProps)(App));
