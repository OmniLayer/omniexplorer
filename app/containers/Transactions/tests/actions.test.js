import { loadTransactions } from '../actions';
import { LOAD_TRANSACTIONS } from '../constants';

describe('Transactions actions', () => {
  describe('loadTransactions Action', () => {
    it('has a type of LOAD_TRANSACTIONS', () => {
      const expected = {
        type: LOAD_TRANSACTIONS,
        addr: null,
      };
      expect(loadTransactions()).toEqual(expected);
    });
  });
});
