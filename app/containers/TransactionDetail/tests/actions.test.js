import { loadTransaction } from '../actions';
import { LOAD_TRANSACTION } from '../constants';

describe('TransactionDetail actions', () => {
  describe('loadTransaction Action', () => {
    it('has a type of LOAD_TRANSACTION', () => {
      const expected = {
        type: LOAD_TRANSACTION,
      };
      expect(loadTransaction()).toEqual(expected);
    });
  });
});
