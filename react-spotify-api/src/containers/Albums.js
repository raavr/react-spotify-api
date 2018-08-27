import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestTypes, actionTypes } from '../constants';
import { loadAlbums } from '../actions';
import List from '../components/List';
import Album from '../components/Album';
import Loading from '../components/Loading';


class Albums extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    loadAlbums: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    artist: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loadAlbums, id } = this.props;
    loadAlbums(id);
  }

  componentDidUpdate(prevProps) {
    const { repeatRequest, id, loadAlbums } = this.props;
    if (prevProps.repeatRequest !== repeatRequest) {
      loadAlbums(id);
    }
  }

  fetchMore = () => {
    const { loadAlbums, id } = this.props;
    loadAlbums(id, true);
  }

  renderAlbum = (item) => {
    const { artist } = this.props;
    return <Album key={item.id} album={item} artist={artist} />;
  }

  render() {
    const { isLoading, items, artist } = this.props;

    return (
      <React.Fragment>
        <h1 className="page-title">
          {artist.name ? artist.name + '\'s albums' : 'Albums'}
        </h1>
        <List
          items={items}
          isLoading={isLoading && items.length === 0}
          onScroll={this.fetchMore}
          renderItem={this.renderAlbum}
        />
        <Loading isLoading={isLoading && items.length > 0} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { albumsByArtist, albums, artists } = state.entities;
  const { id } = ownProps.match.params;
  let items = [];

  if (id && albumsByArtist[id]) {
    items = Object.values(albumsByArtist[id].items).map(elem => albums[elem]);
  }

  return {
    isLoading: Boolean(state.request[requestTypes.ALBUMS]),
    items,
    id,
    artist: artists[id] || {},
    repeatRequest: Boolean(state.request[actionTypes.REPEAT_REQUEST])
  };
};

export default withRouter(connect(mapStateToProps, {
  loadAlbums
})(Albums));
