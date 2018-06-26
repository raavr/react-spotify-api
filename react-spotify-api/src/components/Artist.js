import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Artist = ({ artist }) => {
  const imgUrl = artist.images.length !== 0 ? artist.images[0].url : '';
  return (
    <Link className="list-item" to={`/artist/${artist.id}`}>
      <img src={imgUrl} className="list-item__img artist-item__img" alt={artist.name} />
      <div className="list-item__name">
        {artist.name}
      </div>
    </Link>
  );
};

Artist.propTypes = {
  artist: PropTypes.object.isRequired
};

export default Artist;
