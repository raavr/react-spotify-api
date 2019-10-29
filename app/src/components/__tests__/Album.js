import { shallow } from 'enzyme';
import * as React from 'react';
import Album from '../Album';

describe('Album component', () => {
  it('should render album name', () => {
    const album = {
      name: 'Some album',
      images: []
    };
    const artist = {};
    const wrapper = shallow(<Album album={album} artist={artist} />);
    expect(wrapper.find('.album-title').text()).toEqual(album.name);
  });

  it('should render artist name', () => {
    const album = {
      name: 'Some album',
      images: []
    };
    const artist = {
      name: 'Test artist'
    };
    const wrapper = shallow(<Album album={album} artist={artist} />);
    expect(wrapper.find('.album-artist').text()).toEqual(artist.name);
  });

  it('should have specific backgroundImage', () => {
    const album = {
      images: [{ url: 'http://localhost' }]
    };
    const artist = {};
    const wrapper = shallow(<Album album={album} artist={artist} />);
    expect(wrapper.find('.list-item__img').prop('style')).toHaveProperty(
      'backgroundImage',
      `url(${album.images[0].url})`
    );
  });
});
