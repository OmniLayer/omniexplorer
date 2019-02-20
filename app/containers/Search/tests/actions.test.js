import { loadSearch } from '../actions';
import { LOAD_SEARCH } from '../constants';

describe('Search actions', () => {
  describe('loadSearch Action', () => {
    it('has a type of LOAD_SEARCH', () => {
      const expected = {
        type: LOAD_SEARCH,
      };
      expect(loadSearch()).toEqual(expected);
    });
  });
});
