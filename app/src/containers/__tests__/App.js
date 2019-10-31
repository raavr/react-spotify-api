import React from 'react';
import { shallow, mount } from 'enzyme';
import { App } from '../App';
import { Search } from '../../components/Search';
import Loading from '../../components/Loading';

jest.mock('../SearchResult', () => (
  jest.fn(({ searchValue }) => (
    <div>
      {searchValue}
    </div>
  ))
));

describe('App component', () => {
  it('should render loading spinner', () => {
    const isLoading = true;
    const searchValue = '';
    const wrapper = shallow(
      <App isLoading={isLoading} searchValue={searchValue} />
    );

    expect(wrapper.find(Loading)).toExist();
    expect(wrapper.find(Search)).not.toExist();
  });

  it('should not render loading spinner', () => {
    const isLoading = false;
    const searchValue = '';
    const wrapper = shallow(
      <App isLoading={isLoading} searchValue={searchValue} />
    );

    expect(wrapper.find(Loading)).not.toExist();
    expect(wrapper.find(Search)).toExist();
  });

  it('should update history when a user searches for artists', () => {
    const isLoading = false;
    const searchValue = 'test_value';
    const history = [];
    const wrapper = mount(
      <App isLoading={isLoading} searchValue={searchValue} history={history} />
    );
    const input = wrapper.find('input');
    input.instance().value = 'new_artist';
    expect(history.length).toBe(0);
    input.simulate('keyUp', {
      key: 'Enter',
      keyCode: 13,
      code: 13,
    });
    expect(history.length).toBe(1);
    expect(history[0]).toEqual('/search/new_artist');
  });
});
