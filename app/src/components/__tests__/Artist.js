import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { Link, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Artist from '../Artist';

describe('Artist component', () => {
  it('should render artist name', () => {
    const artist = { name: 'Test Artist' };
    const wrapper = shallow(<Artist artist={artist} />);
    expect(wrapper.find('.list-item__desc').text()).toEqual(artist.name);
  });

  it('should have specific backgroundImage', () => {
    const artist = {
      images: [{ url: 'http://localhost' }]
    };
    const wrapper = shallow(<Artist artist={artist} />);
    expect(wrapper.find('.artist-item__img').prop('style')).toHaveProperty(
      'backgroundImage',
      `url(${artist.images[0].url})`
    );
  });

  it('should render router link that points to the artist route', () => {
    const artist = { id: '1', name: 'Test Artist' };
    const wrapper = shallow(<Artist artist={artist} />);
    expect(wrapper.find(Link).props().to).toBe('/artist/1');
  });

  it('should navigate to artist route when the artist link was clicked', () => {
    const artist = { id: '1', name: 'Test Artist' };
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const wrapper = mount(
      <Router history={history}>
        <Artist artist={artist} />
      </Router>
    );
    const link = wrapper.find(Link);
    link.simulate('click', { button: 0 });
    expect(history.location.pathname).toBe('/artist/1');
  });
});
