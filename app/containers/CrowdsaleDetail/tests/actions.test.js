import { startCrowdsaleTransactionsFetch } from '../actions';
import { LOAD_CROWDSALE_TRANSACTIONS } from '../constants';

const crowdsaleId = 31;

describe('Crowdsales actions', () => {
  describe('Default Action', () => {
    it('has a type of LOAD_CROWDSALE_TRANSACTIONS', () => {
      const expected = {
        type: LOAD_CROWDSALE_TRANSACTIONS,
        id: crowdsaleId,
      };
      expect(startCrowdsaleTransactionsFetch(crowdsaleId)).toEqual(expected);
    });
  });
});
