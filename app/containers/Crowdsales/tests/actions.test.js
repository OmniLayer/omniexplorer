import { loadCrowdsales } from '../actions';
import { LOAD_CROWDSALES } from '../constants';

describe('Crowdsales actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: LOAD_CROWDSALES,
      };
      expect(loadCrowdsales()).toEqual(expected);
    });
  });
});
