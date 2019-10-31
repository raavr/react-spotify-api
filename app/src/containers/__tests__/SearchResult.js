import React, { cloneElement } from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchResult } from '../SearchResult';

describe('SearchResults component', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      isLoading: false,
      artistName: 'TestName',
      loadArtist: jest.fn(),
      items: [{
        name: 'Test Artists',
        id: '1',
        images: []
      }],
      nexPageUrl: '1',
      repeatRequest: false
    };
  });

  it('should render list if an artist has a name', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SearchResult {...defaultProps} />
      </MemoryRouter>
    );
    expect(wrapper.find('.list-item__desc').text()).toEqual('Test Artists');
  });

  it('should render loading spinner if isLoading equals true and there are items', () => {
    const items = [{ id: '1', album: {} }];
    const isLoading = true;
    const wrapper = mount(
      <MemoryRouter>
        <SearchResult {...defaultProps} items={items} isLoading={isLoading} />
      </MemoryRouter>
    );
    expect(wrapper.find('.loading-spinner').exists()).toBe(true);
  });

  it('should not call loadArtist function if the artistName is empty', () => {
    mount(
      <MemoryRouter>
        <SearchResult {...defaultProps} artistName="" />
      </MemoryRouter>
    );
    expect(defaultProps.loadArtist).not.toHaveBeenCalled();
  });

  it('should reload artists when the repeatRequest and the artistName changes', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SearchResult {...defaultProps} />
      </MemoryRouter>
    );
    wrapper.setProps({
      children: cloneElement(wrapper.props().children, {
        repeatRequest: true,
        artistName: 'NewName',
      })
    });
    expect(defaultProps.loadArtist.mock.calls.length).toBe(2);
    expect(defaultProps.loadArtist.mock.calls[0]).toEqual(['TestName']);
    expect(defaultProps.loadArtist.mock.calls[1]).toEqual(['NewName']);
  });
});
