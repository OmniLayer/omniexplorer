import getBlockchainFirstBlock from 'utils/getBlockchainFirstBlock';
import { LOAD_BLOCK } from '../constants';
import { loadBlock } from '../actions';

describe('BlockDetail actions', () => {
  describe('Load Block Action', () => {
    it('has a type of LOAD_BLOCK', () => {
      const expected = {
        type: LOAD_BLOCK,
        block: getBlockchainFirstBlock(),
      };
      expect(loadBlock(getBlockchainFirstBlock())).toEqual(expected);
    });
  });
});
