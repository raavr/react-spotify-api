import { actionTypes } from '../../constants';
import { showErrorMessage, dismissError } from '..';

describe('error actions', () => {
  it('should create an action to show an error message', () => {
    const error = 'error';
    const expectedAction = {
      type: actionTypes.SHOW_ERROR_MESSAGE,
      error
    };

    expect(showErrorMessage(error)).toEqual(expectedAction);
  });

  it('should create an action to dismiss an error message', () => {
    const expectedAction = {
      type: actionTypes.RESET_ERROR_MESSAGE
    };

    expect(dismissError()).toEqual(expectedAction);
  });
});
