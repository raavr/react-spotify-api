import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute';

const mockProps = {
  history: createMemoryHistory(),
  location: {
    hash: '',
    pathname: '',
    search: '',
    state: ''
  },
  match: {
    isExact: false,
    params: {},
    path: '',
    url: ''
  },
  autoLogin: jest.fn()
};

const MockComponent = () => null;

it('should redirect to the /login route if not authenticated', () => {
  const wrapper = shallow(
    <PrivateRoute
      isAuthenticated={false}
      path="/test"
      component={MockComponent}
      {...mockProps}
    />
  );
  const RenderMethod = wrapper.instance().renderIfAuthenticated;
  const wrapper2 = shallow(<RenderMethod {...mockProps} />);
  expect(wrapper2.find(Redirect).exists()).toBe(true);
  expect(wrapper2.find(Redirect).props()).toMatchObject({
    push: false,
    to: {
      pathname: '/login',
      state: {
        from: mockProps.location
      }
    }
  });
});

it('should render the given component when authenticated', () => {
  const wrapper = shallow(
    <PrivateRoute
      isAuthenticated
      path="/test"
      component={MockComponent}
      {...mockProps}
    />
  );
  const RenderMethod = wrapper.instance().renderIfAuthenticated;
  const wrapper2 = shallow(<RenderMethod {...mockProps} />);
  expect(wrapper2.find(MockComponent).exists()).toBe(true);
});
