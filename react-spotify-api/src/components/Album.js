import PropTypes from 'prop-types';
import React from 'react';

const Album = ({ album, artist }) => {
  const imgUrl = album.images.length !== 0 ? album.images[0].url : '';
  return (
    <div className="list-item" to={`/artist/${album.id}`}>
      <img src={imgUrl} className="list-item__img" alt={album.name} />
      <div className="list-item__name">
        <div>
          {album.name}
        </div>
        <div>
          {artist.name}
        </div>
      </div>
    </div>
  );
};

Album.propTypes = {
  album: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired
};

export default Album;
