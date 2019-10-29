import PropTypes from 'prop-types';
import React from 'react';

const Album = ({ album, artist }) => {
  const imgUrl = album.images && album.images.length !== 0 ? album.images[0].url : '';
  return (
    <li className="col-6 col-sm-4 col-md-3 col-lg-2 list-item">
      <div className="list-item__img" style={{ backgroundImage: `url(${imgUrl})` }}></div>
      <div className="list-item__desc">
        <p className="album-title">
          {album.name}
        </p>
        <p className="album-artist">
          {artist.name}
        </p>
      </div>
    </li>
  );
};

Album.propTypes = {
  album: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired
};

export default Album;
