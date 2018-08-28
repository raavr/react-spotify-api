import { actionTypes } from '../../constants';

export const showErrorMessage = (error) => ({
  type: actionTypes.SHOW_ERROR_MESSAGE,
  error
});

export const dismissError = () => ({
  type: actionTypes.RESET_ERROR_MESSAGE
});
