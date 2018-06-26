import PropTypes from 'prop-types';
import React from 'react';
import withLoading from './withLoading';
import withFetchOnScroll from './withFetchOnScroll';

const List = ({ items, renderItem }) => {
  return (
    <div className="list">
      {items.map(renderItem)}
      {items.length === 0
        ? (
        <div>
          Nothing here...
        </div>
        )
        : null}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default withFetchOnScroll(withLoading(List));
