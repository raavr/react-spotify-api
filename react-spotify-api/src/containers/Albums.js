import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestTypes } from '../actions';
import { loadAlbums } from '../actions';
import List from '../components/List';
import Album from '../components/Album';


class Albums extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    loadAlbums: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    artist: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if(this.props.isAuthenticated) {
      this.props.loadAlbums(this.props.id);
    }
  }

  fetchMore = () => {
    const { loadAlbums, id } = this.props;
    loadAlbums(id, true);
  }
  
  renderAlbum = (item) => {
    return <Album key={item.id} album={item} artist={this.props.artist}/>
  }

  render() {
    const { isLoading, items, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/login" />
    }
    
    return (
      <React.Fragment>
        <h1>Albums</h1>
        <List items={items} isLoading={isLoading && items.length === 0} onScroll={this.fetchMore} renderItem={this.renderAlbum}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { albumsByArtist, albums, artists } = state.entities;
  const id = ownProps.match.params.id;
  let items = [];

  if (id && albumsByArtist[id]) {
    items = Object.values(albumsByArtist[id].items).map(elem => albums[elem]);
  }

  return {
    isLoading: Boolean(state.request[requestTypes.ALBUMS]),
    items,
    id,
    artist: artists[id],
    isAuthenticated: Boolean(state.session.session)
  }
};

export default withRouter(connect(mapStateToProps, {
  loadAlbums
})(Albums));


