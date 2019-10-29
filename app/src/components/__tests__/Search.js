import React from 'react';
import { shallow, mount } from 'enzyme';
import { Search } from '../Search';

describe('Search component', () => {
  it('should set a default value', () => {
    const searchValue = 'Search text';
    const onChange = jest.fn();
    const wrapper = shallow(
      <Search searchValue={searchValue} onChange={onChange} />
    );
    expect(wrapper.find('.search-input').prop('defaultValue')).toEqual(searchValue);
  });

  it('should call onChange prop after keyup', () => {
    const searchValue = 'Search text';
    const onChange = jest.fn();
    const wrapper = mount(
      <Search searchValue={searchValue} onChange={onChange} />
    );
    const input = wrapper.find('input');
    input.simulate('keyUp', {
      which: 13,
      keyCode: 13,
    });
    expect(onChange).toHaveBeenCalledWith(searchValue);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
