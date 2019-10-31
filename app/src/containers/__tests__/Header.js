/* eslint-disable react/destructuring-assignment */
import React, { cloneElement } from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Link } from 'react-router-dom';
import { Header } from '../Header';

describe('Header component', () => {
  let props;
  beforeEach(() => {
    props = {
      onLogin: jest.fn(),
      onLogout: jest.fn(),
      isAuthenticated: false
    };
  });

  it('should render login link if a user is not authenticated', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );
    expect(wrapper.find(Link).text()).toBe('Login');
    expect(wrapper.find(Link).text()).not.toBe('Logout');
    wrapper.setProps({
      children: cloneElement(wrapper.props().children, {
        isAuthenticated: true
      })
    });
    expect(wrapper.find(Link).text()).not.toBe('Login');
    expect(wrapper.find(Link).text()).toBe('Logout');
  });

  it('should call onLogin prop when clicking Login button', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );
    const loginButton = wrapper.find(Link);
    loginButton.simulate('click', { button: 0 });
    expect(props.onLogin).toHaveBeenCalled();
  });

  it('should call onLogout prop when clicking Logout button', () => {
    props = {
      ...props,
      isAuthenticated: true
    };

    const wrapper = mount(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );
    const logoutButton = wrapper.find(Link);
    logoutButton.simulate('click', { button: 0 });
    expect(props.onLogout).toHaveBeenCalled();
  });
});
