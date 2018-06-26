import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestTypes } from '../constants';
import { Search } from '../components/Search';
import SearchResult from './SearchResult';
import Loading from '../components/Loading';

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchValue: PropTypes.string.isRequired
  }

  handleChange = nextValue => {
    const { history } = this.props;
    history.push(`/search/${nextValue}`);
  }

  render() {
    const { isAuthenticated, isLoading, searchValue } = this.props;

    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Search searchValue={searchValue} onChange={this.handleChange} />
        <SearchResult artistName={searchValue} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: Boolean(state.session.session),
  isLoading: Boolean(state.request[requestTypes.AUTH]),
  searchValue: ownProps.match.params.name || ''
});

export default withRouter(connect(mapStateToProps)(App));
