import PropTypes from 'prop-types';
import React from 'react';
import withLoading from './withLoading';
import Artist from './Artist';

const List = ({ items }) => {
    return (
        <div className="artist-list">
            { items.map(item => <Artist key={item.id} artist={item}/>) }
        </div>
    )
}

List.propTypes = {
    items: PropTypes.array.isRequired
}

export default withLoading(List);