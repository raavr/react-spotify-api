import PropTypes from 'prop-types';
import React from 'react';
import withLoading from './withLoading';
import withFetchOnScroll from './withFetchOnScroll';

const List = ({ items, renderItem }) => {
  return (
    <div className="container container-list">
      <ul className="row">
        {items.map(renderItem)}
        {items.length === 0
          ? (
          <div className="no-items">
            Nothing here...
          </div>
          )
          : null}
      </ul>
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default withFetchOnScroll(withLoading(List));
