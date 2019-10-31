import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dismissError } from '../actions';

export const ErrorMessage = ({ dismiss, error }) => {
  return error ? (
    <p className="alert-error">
      <span>
        {error.message}
      </span>
      <button onClick={dismiss} type="button" className="btn btn__dismiss">
        Dismiss
      </button>
    </p>
  ) : null;
};

ErrorMessage.protoTypes = {
  error: PropTypes.object,
  dismiss: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  error: state.error
});

export default connect(mapStateToProps, {
  dismiss: dismissError
})(ErrorMessage);
