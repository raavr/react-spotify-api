import React from 'react';
import { shallow, mount } from 'enzyme';
import { Albums } from '../Albums';


describe('Albums component', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      isLoading: false,
      items: [],
      loadAlbums: jest.fn(),
      id: '1',
      repeatRequest: false,
      artist: {
        name: 'Test',
        id: '1'
      }
    };
  });

  it('should render the proper title if an artist has a name', () => {
    const wrapper = shallow(<Albums {...defaultProps} />);
    expect(wrapper.find('.page-title').text()).toEqual("Test's albums");
  });

  it("should render the default title if an artist doesn't have a name", () => {
    const wrapper = shallow(<Albums {...defaultProps} artist={{}} />);
    expect(wrapper.find('.page-title').text()).toEqual('Albums');
  });

  it('should render loading spinner if isLoading equals true and there are items', () => {
    const items = [{ id: '1', album: {} }];
    const isLoading = true;
    const wrapper = mount(
      <Albums {...defaultProps} items={items} isLoading={isLoading} />
    );

    expect(wrapper.find('.loading-spinner')).toExist();
  });

  it('should reload albums when the repeatRequest prop changes', () => {
    const wrapper = mount(<Albums {...defaultProps} />);
    wrapper.setProps({ ...defaultProps, repeatRequest: true });
    expect(defaultProps.loadAlbums.mock.calls.length).toBe(2);
    expect(defaultProps.loadAlbums.mock.calls[0]).toEqual(['1']);
    expect(defaultProps.loadAlbums.mock.calls[1]).toEqual(['1']);
  });
});
