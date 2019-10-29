import React from 'react';
import { mount } from 'enzyme';
import List from '../List';

jest.mock('../withFetchOnScroll', () => ({
  __esModule: true,
  default: Comp => props => <Comp {...props} />
}));

jest.mock('../withLoading', () => ({
  __esModule: true,
  default: Comp => props => <Comp {...props} />
}));

describe('List component', () => {
  it('should display "Nothing here..." if there is no list items', () => {
    const renderItemSpy = jest.fn(() => {});
    const items = [];
    const wrapper = mount(<List items={items} renderItem={renderItemSpy} />);
    renderItemSpy.mockClear();
    expect(wrapper.find('.no-items').text()).toEqual('Nothing here...');
  });

  it('should render children from outside of the component', () => {
    const renderItemSpy = jest.fn((val, idx) => (
      <li key={`key1-${idx}`}>
        {val}
      </li>
    ));
    const items = ['test value', 'test next'];
    const wrapper = mount(<List items={items} renderItem={renderItemSpy} />);
    renderItemSpy.mockClear();
    const nodes = wrapper.find('ul > li');
    expect(nodes.first().text()).toEqual('test value');
    expect(nodes.last().text()).toEqual('test next');
  });
});
