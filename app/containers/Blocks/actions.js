/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_SUCCESS,
  DISABLE_BLOCKS_LOADING,
} from './constants';

/**
 * Load the blocks, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_BLOCKS
 */
export function loadBlocks(block) {
  return {
    type: LOAD_BLOCKS,
    block,
  };
}

/**
 * Dispatched when the blocks are loaded by the request saga
 *
 * @param  {array} Blocks The blocks data
 *
 * @return {object} An action object with a type of LOAD_BLOCKS_SUCCESS passing the blocks
 */
export function blocksLoaded(blocks) {
  return {
    type: LOAD_BLOCKS_SUCCESS,
    blocks,
  };
}

/**
 * Dispatched when loading the blocks fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_BLOCKS_ERROR passing the error
 */
export function disableLoading() {
  return {
    type: DISABLE_BLOCKS_LOADING,
  };
}
