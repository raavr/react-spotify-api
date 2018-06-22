import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Artist = ({ artist }) => {
    const imgUrl = artist.images.length !== 0 ? artist.images[0].url : '';
    return (
        <Link className="artist-item" to={`/albums/${artist.id}`}>
            <img src={imgUrl} className="artist-item__img" alt={artist.name} />
            <div className="artist-item__name">{artist.name}</div>
        </Link>
    )
};

Artist.propTypes = {
    artist: PropTypes.object.isRequired
}

export default Artist;