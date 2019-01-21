import { FIRST_BLOCK } from 'containers/App/constants';
import { LOAD_BLOCK } from '../constants';
import { loadBlock } from '../actions';

describe('BlockDetail actions', () => {
  describe('Load Block Action', () => {
    it('has a type of LOAD_BLOCK', () => {
      const expected = {
        type: LOAD_BLOCK,
        block: FIRST_BLOCK,
      };
      expect(loadBlock(FIRST_BLOCK)).toEqual(expected);
    });
  });
});
