import React from 'react';
import { shallow } from 'enzyme';
import Callback from '../Callback';

global.URLSearchParams = jest.fn(() => ({
  get: jest.fn(() => '')
}));

global.opener = {
  postMessage: jest.fn(),
  location: {}
};

describe('Callback component', () => {
  it('should render component', () => {
    const wrapper = shallow(<Callback />);
    expect(wrapper.find('div').text()).toEqual(
      'This page should close soon!'
    );
  });
});
