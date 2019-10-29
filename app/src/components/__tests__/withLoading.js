import React from 'react';
import { mount } from 'enzyme';
import withLoading from '../withLoading';

jest.mock('../Loading', () => (
  jest.fn(() => (
    <div data-testid="test-loading"></div>
  ))
));

describe('withFetchOnScroll', () => {
  let LoadingComp;

  beforeEach(() => {
    const MockComp = () => (
      <div>
        {'Testing'}
      </div>
    );
    LoadingComp = withLoading(MockComp);
  });

  it('should render the Loading component', () => {
    const isLoading = true;
    const wrapper = mount(<LoadingComp isLoading={isLoading} />);

    expect(wrapper.find('[data-testid]')).toExist();
  });

  it('should render wrapped component', () => {
    const isLoading = false;
    const wrapper = mount(<LoadingComp isLoading={isLoading} />);

    expect(wrapper.find('[data-testid]')).not.toExist();
  });
});
