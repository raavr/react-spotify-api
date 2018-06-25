import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadArtist, requestTypes } from '../actions';
import List from '../components/List'; 
import Artist from '../components/Artist';

class SearchResult extends Component {
  static protoType = {
    artistName: PropTypes.string.isRequired,
    loadArtist: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    nextPageUrl: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { loadArtist, artistName } = this.props;
    if(artistName !== '') {
      loadArtist(artistName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artistName !== this.props.artistName) {
      nextProps.loadArtist(nextProps.artistName);
    }
  }

  fetchMore = () => {
    const { loadArtist, artistName } = this.props;
    loadArtist(artistName, true);
  }

  renderArtist(item) {
    return <Artist key={item.id} artist={item}/>
  }

  render() {
    const { artistName, isLoading, items } = this.props;
    
    return artistName ? 
      <List items={items} isLoading={isLoading && items.length === 0} onScroll={this.fetchMore} renderItem={this.renderArtist}/> : 
      <div>Search for artists</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const { searches, artists } = state.entities;
  let nextPageUrl = '';
  let items = [];

  if(ownProps.artistName && searches[ownProps.artistName]) {
    items = Object.values(searches[ownProps.artistName].items).map(elem => artists[elem]);
    nextPageUrl = artists.next;
  }
  
  return {
    isLoading: state.request[requestTypes.SEARCH],
    items,
    nextPageUrl
  }
};

export default connect(mapStateToProps, {
  loadArtist
})(SearchResult);