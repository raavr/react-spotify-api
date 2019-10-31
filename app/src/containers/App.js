import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestTypes } from '../constants';
import { Search } from '../components/Search';
import SearchResult from './SearchResult';
import Loading from '../components/Loading';

export class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    searchValue: PropTypes.string.isRequired
  }

  handleChange = nextValue => {
    const { history } = this.props;
    history.push(`/search/${nextValue}`);
  }

  render() {
    const { isLoading, searchValue } = this.props;

    if (isLoading) {
      return <Loading isLoading={isLoading} />;
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
  isLoading: Boolean(state.request[requestTypes.AUTH]),
  searchValue: ownProps.match.params.name || ''
});

export default withRouter(connect(mapStateToProps)(App));
