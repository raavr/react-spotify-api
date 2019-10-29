import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Artist = ({ artist }) => {
  const imgUrl = artist.images && artist.images.length !== 0 ? artist.images[0].url : '';
  return (
    <li className="col-6 col-sm-4 col-md-3 col-lg-2 list-item">
      <Link to={`/artist/${artist.id}`}>
        <div
          className="list-item__img artist-item__img"
          style={{ backgroundImage: `url(${imgUrl})` }}
        >
        </div>
        <div className="list-item__desc">
          {artist.name}
        </div>
      </Link>
    </li>
  );
};

Artist.propTypes = {
  artist: PropTypes.object.isRequired
};

export default Artist;
