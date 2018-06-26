import { actionTypes } from '../../constants';

export const error = (state = null, action) => {
  const { type, error } = action;

  switch (type) {
    case actionTypes.SHOW_ERROR_MESSAGE:
      return error;
    case actionTypes.RESET_ERROR_MESSAGE:
      return null;
    default:
      return state;
  }
};
