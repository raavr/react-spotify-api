import PropTypes from 'prop-types';
import React from 'react';

const Loading = ({ isLoading }) => {
  return isLoading ? (
    <div className="loading-spinner">
      <div className="bounce-1"></div>
      <div className="bounce-2"></div>
      <div className="bounce-3"></div>
    </div>
  ) : null;
};

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Loading;
