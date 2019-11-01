import { entities as reducer } from '../search';
import { actionTypes } from '../../constants';

describe('search reducer', () => {
  it('should return the default state if a response is not valid', () => {
    const defaultState = {
      searches: {},
      albums: {},
      artists: {},
      albumsByArtist: {}
    };
    expect(reducer(undefined, {})).toEqual(defaultState);
    expect(reducer(undefined, { response: {} })).toEqual(defaultState);
    expect(reducer({}, {})).toEqual({});
    expect(reducer({}, { response: {} })).toEqual({});
  });

  it('should return the passed state if a response is not valid', () => {
    const testState = {
      searches: {
        james: {
          items: ['72ua']
        }
      },
      albums: {},
      artists: {
        '72ua': {}
      }
    };
    expect(reducer(testState, {})).toEqual(testState);
    expect(reducer(testState, { response: {} })).toEqual(testState);
  });

  it('should return the default state if a response is valid and an action is unknown', () => {
    const response = {
      entities: {
        test: {}
      }
    };
    const expectedState = {
      searches: {},
      albums: {},
      artists: {},
      albumsByArtist: {},
      test: {}
    };

    expect(reducer(undefined, { response, type: 'UNKNOWN_TYPE' })).toEqual(
      expectedState
    );
  });

  it('should return merged state if a response is valid and an action is unknown', () => {
    const response = {
      entities: {
        test: {}
      }
    };
    const state = {
      searches: {},
      test: {
        john: {}
      }
    };
    const expectedState = {
      searches: {},
      test: {
        john: {}
      }
    };

    expect(reducer(state, { response, type: 'UNKNOWN_TYPE' })).toEqual(
      expectedState
    );
  });

  it("should handle SEARCH_ARTIST_SUCCESS if the state doesn't have a search key", () => {
    const response = {
      entities: {
        searches: {
          john: {
            items: ['1', '2', '3']
          }
        }
      },
      result: 'john'
    };
    const state = {
      searches: {}
    };
    const expectedState = {
      searches: {
        john: {
          items: ['1', '2', '3']
        }
      }
    };

    expect(
      reducer(state, { type: actionTypes.SEARCH_ARTIST_SUCCESS, response })
    ).toEqual(expectedState);
  });

  it('should handle SEARCH_ARTIST_SUCCESS if the state contains a search key', () => {
    const response = {
      entities: {
        searches: {
          john: {
            items: ['5', '6', '7']
          }
        }
      },
      result: 'john'
    };
    const state = {
      searches: {
        john: {
          items: ['1', '2', '3', '4']
        }
      }
    };
    const expectedState = {
      searches: {
        john: {
          items: ['1', '2', '3', '4', '5', '6', '7']
        }
      }
    };

    expect(
      reducer(state, { type: actionTypes.SEARCH_ARTIST_SUCCESS, response })
    ).toEqual(expectedState);
  });

  it('should handle SEARCH_ARTIST_SUCCESS if the state contains a search key and others keys', () => {
    const response = {
      entities: {
        searches: {
          john: {
            items: ['5', '6', '7']
          }
        }
      },
      result: 'john'
    };
    const state = {
      searches: {
        john: {
          items: ['1', '2', '3', '4']
        },
        joey: {
          items: ['88', '99', '100']
        },
        ross: {
          items: ['44', '123', '222']
        }
      }
    };
    const expectedState = {
      searches: {
        john: {
          items: ['1', '2', '3', '4', '5', '6', '7']
        },
        joey: {
          items: ['88', '99', '100']
        },
        ross: {
          items: ['44', '123', '222']
        }
      }
    };

    expect(
      reducer(state, { type: actionTypes.SEARCH_ARTIST_SUCCESS, response })
    ).toEqual(expectedState);
  });

  it("should handle FETCH_ALBUMS_SUCCESS if the state doesn't have an artist's uuid", () => {
    const response = {
      entities: {
        albumsByArtist: {
          uuid1: {
            items: ['1', '2']
          }
        }
      },
      result: 'uuid1'
    };
    const state = {
      albumsByArtist: {}
    };
    const expectedState = {
      albumsByArtist: {
        uuid1: {
          items: ['1', '2']
        }
      }
    };

    expect(
      reducer(state, { type: actionTypes.FETCH_ALBUMS_SUCCESS, response })
    ).toEqual(expectedState);
  });

  it("should handle FETCH_ALBUMS_SUCCESS if the state contains an artist's uuid", () => {
    const response = {
      entities: {
        albumsByArtist: {
          uuid1: {
            items: ['5', '6', '7']
          }
        }
      },
      result: 'uuid1'
    };
    const state = {
      albumsByArtist: {
        uuid1: {
          items: ['1', '2']
        }
      }
    };
    const expectedState = {
      albumsByArtist: {
        uuid1: {
          items: ['1', '2', '5', '6', '7']
        }
      }
    };

    expect(
      reducer(state, { type: actionTypes.FETCH_ALBUMS_SUCCESS, response })
    ).toEqual(expectedState);
  });

  it("should handle FETCH_ALBUMS_SUCCESS if the state contains an artist's uuid and others uuids", () => {
    const response = {
      entities: {
        albumsByArtist: {
          uuid1: {
            items: ['5', '6', '7']
          }
        }
      },
      result: 'uuid1'
    };
    const state = {
      albumsByArtist: {
        uuid1: {
          items: ['1', '2', '3', '4']
        },
        uuid2: {
          items: ['88']
        },
        uuid3: {
          items: ['44', '123', '222', '111']
        }
      }
    };
    const expectedState = {
      albumsByArtist: {
        uuid1: {
          items: ['1', '2', '3', '4', '5', '6', '7']
        },
        uuid2: {
          items: ['88']
        },
        uuid3: {
          items: ['44', '123', '222', '111']
        }
      }
    };

    expect(
      reducer(state, { type: actionTypes.FETCH_ALBUMS_SUCCESS, response })
    ).toEqual(expectedState);
  });
});
