/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { mount } from 'enzyme';
import withFetchOnScroll from '../withFetchOnScroll';

jest.mock('lodash', () => ({
  debounce: jest.fn(fn => fn)
}));

describe('withFetchOnScroll', () => {
  let FetchComp;
  let eventMap = {};

  beforeEach(() => {
    Object.defineProperty(global.document.body, 'offsetHeight', {
      value: 1120
    });
    Object.defineProperty(global, 'innerHeight', { value: 920 });
    window.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });
  });

  beforeEach(() => {
    const MockComp = () => (
      <div>
        {'Testing'}
      </div>
    );
    FetchComp = withFetchOnScroll(MockComp);
  });

  afterEach(() => {
    eventMap = {};
  });

  it('should call onScroll', () => {
    const props = {
      items: [<div></div>],
      isLoading: false,
      onScroll: jest.fn()
    };

    mount(<FetchComp {...props} />);
    expect(props.onScroll).not.toHaveBeenCalled();
    window.scrollY = 200; // manually set scrollY to mock real scroll event
    eventMap.scroll();
    expect(props.onScroll).toHaveBeenCalled();
  });

  it('should not call onScroll if isLoading equals true', () => {
    const props = {
      items: [<div></div>],
      isLoading: true,
      onScroll: jest.fn()
    };

    mount(<FetchComp {...props} />);
    expect(props.onScroll).not.toHaveBeenCalled();
    window.scrollY = 200;
    eventMap.scroll();
    expect(props.onScroll).not.toHaveBeenCalled();
  });

  it('should not call onScroll if the items are empty', () => {
    const props = {
      items: [],
      isLoading: false,
      onScroll: jest.fn()
    };

    mount(<FetchComp {...props} />);
    expect(props.onScroll).not.toHaveBeenCalled();
    window.scrollY = 200;
    eventMap.scroll();
    expect(props.onScroll).not.toHaveBeenCalled();
  });

  it('should not call onScroll if a scrollY prop is too small', () => {
    const props = {
      items: [<div></div>],
      isLoading: false,
      onScroll: jest.fn()
    };

    mount(<FetchComp {...props} />);
    expect(props.onScroll).not.toHaveBeenCalled();
    window.scrollY = 99;
    eventMap.scroll();
    expect(props.onScroll).not.toHaveBeenCalled();
  });
});
