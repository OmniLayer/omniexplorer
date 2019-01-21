import { FIRST_BLOCK } from 'containers/App/constants';
import { LOAD_BLOCKS } from '../constants';
import { loadBlocks } from '../actions';

describe('Blocks actions', () => {
  describe('Load Blocks Action', () => {
    it('has a type of LOAD_BLOCK', () => {
      const expected = {
        type: LOAD_BLOCKS,
        block: FIRST_BLOCK,
      };
      expect(loadBlocks(FIRST_BLOCK)).toEqual(expected);
    });
  });
});
