import getBlockchainFirstBlock from 'utils/getBlockchainFirstBlock';
import { LOAD_BLOCKS } from '../constants';
import { loadBlocks } from '../actions';

describe('Blocks actions', () => {
  describe('Load Blocks Action', () => {
    it('has a type of LOAD_BLOCK', () => {
      const expected = {
        type: LOAD_BLOCKS,
        block: getBlockchainFirstBlock(),
      };
      expect(loadBlocks(getBlockchainFirstBlock())).toEqual(expected);
    });
  });
});
