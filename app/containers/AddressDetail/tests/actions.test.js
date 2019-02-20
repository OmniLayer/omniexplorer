import { loadAddress } from '../actions';
import { LOAD_ADDRESS } from '../constants';

describe('AddressDetail actions', () => {
  describe('loadAddress Action', () => {
    it('has a type of LOAD_ADDRESS', () => {
      const expected = {
        type: LOAD_ADDRESS,
      };
      expect(loadAddress()).toEqual(expected);
    });
  });
});
