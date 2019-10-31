/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { Login } from '../Login';

jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(() => null)
}));

describe('Login component', () => {
  it('should render "Login with Spotify" button if a user is not authenticated', () => {
    const props = {
      isAuthenticated: false,
      onLogin: jest.fn(),
      location: {
        state: {
          from: {
            pathname: '/'
          }
        }
      }
    };
    const wrapper = shallow(<Login {...props} />);
    const spotifyBtn = wrapper.find('button');
    expect(spotifyBtn.exists()).toBe(true);
    spotifyBtn.simulate('click', { button: 0 });
    expect(props.onLogin).toHaveBeenCalled();
  });

  it('should redirect to default path if a user is authenticated', async () => {
    const props = {
      isAuthenticated: true,
      onLogin: jest.fn(),
      location: {}
    };
    mount(<Login {...props} />);
    expect(Redirect).toHaveBeenCalledTimes(1);
    expect(Redirect).toHaveBeenCalledWith({ to: { pathname: '/search' } }, {});
  });

  it('should redirect to custom path if a user is authenticated', () => {
    const props = {
      isAuthenticated: true,
      onLogin: jest.fn(),
      location: {
        state: {
          from: {
            pathname: '/custom'
          }
        }
      }
    };
    mount(<Login {...props} />);
    expect(Redirect).toHaveBeenCalledWith({ to: { pathname: '/custom' } }, {});
  });
});
