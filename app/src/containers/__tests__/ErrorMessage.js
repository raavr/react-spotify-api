import React from 'react';
import { shallow } from 'enzyme';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage component', () => {
  it("should render an error message if it's not empty", () => {
    const dismiss = jest.fn();
    const error = { message: 'Error message' };
    const wrapper = shallow(
      <ErrorMessage error={error} dismiss={dismiss} />
    );
    expect(wrapper.find('span').text()).toEqual(error.message);
  });

  it("should not render an error message if it's empty", () => {
    const dismiss = jest.fn();
    const wrapper = shallow(
      <ErrorMessage dismiss={dismiss} />
    );
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('should call dismiss prop when clicking the button', () => {
    const dismiss = jest.fn();
    const error = { message: 'Error message' };
    const wrapper = shallow(
      <ErrorMessage error={error} dismiss={dismiss} />
    );
    const button = wrapper.find('button');

    expect(dismiss).not.toHaveBeenCalled();
    button.simulate('click', { button: 0 });
    expect(dismiss).toHaveBeenCalled();
  });
});
