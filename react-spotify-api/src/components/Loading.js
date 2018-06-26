import PropTypes from 'prop-types';
import React from 'react';

const Loading = ({ isLoading }) => {
  return isLoading ? (
    <div>
      Waiting...
    </div>
  ) : null;
};

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Loading;
