import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadArtist } from '../actions';
import { requestTypes, actionTypes } from '../constants';
import List from '../components/List';
import Artist from '../components/Artist';
import Loading from '../components/Loading';

export class SearchResult extends Component {
  static protoType = {
    artistName: PropTypes.string.isRequired,
    loadArtist: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    nextPageUrl: PropTypes.string.isRequired,
    repeatRequest: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const { loadArtist, artistName } = this.props;
    if (artistName !== '') {
      loadArtist(artistName);
    }
  }

  componentDidUpdate(prevProps) {
    const { repeatRequest, artistName, loadArtist } = this.props;
    if (prevProps.repeatRequest !== repeatRequest || prevProps.artistName !== artistName) {
      loadArtist(artistName);
    }
  }

  fetchMore = () => {
    const { loadArtist, artistName } = this.props;
    loadArtist(artistName, true);
  }

  renderArtist(item) {
    return <Artist key={item.id} artist={item} />;
  }

  render() {
    const { artistName, isLoading, items } = this.props;

    return artistName
      ? (
        <React.Fragment>
          <List
            items={items}
            isLoading={isLoading && items.length === 0}
            onScroll={this.fetchMore}
            renderItem={this.renderArtist}
          />
          <Loading isLoading={isLoading && items.length > 0} />
        </React.Fragment>
      )
      : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { searches, artists } = state.entities;
  let nextPageUrl = '';
  let items = [];

  if (ownProps.artistName && searches[ownProps.artistName]) {
    items = Object.values(searches[ownProps.artistName].items).map(elem => artists[elem]);
    nextPageUrl = artists.next;
  }

  return {
    isLoading: Boolean(state.request[requestTypes.SEARCH]),
    items,
    nextPageUrl,
    repeatRequest: Boolean(state.request[actionTypes.REPEAT_REQUEST])
  };
};

export default connect(mapStateToProps, {
  loadArtist
})(SearchResult);
