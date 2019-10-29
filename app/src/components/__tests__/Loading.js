import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

describe('Loading component', () => {
  it('should render loading spinner', () => {
    const wrapper = shallow(<Loading isLoading />);
    expect(wrapper.find('.loading-spinner')).toExist();
  });

  it('should not render loading spinner', () => {
    const wrapper = shallow(<Loading isLoading={false} />);
    expect(wrapper.find('.loading-spinner')).not.toExist();
  });
});
