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

import { LOAD_BLOCK, LOAD_BLOCK_SUCCESS } from './constants';

/**
 * Load the block, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_BLOCK
 */
export function loadBlock(block) {
  return {
    type: LOAD_BLOCK,
    block,
  };
}

/**
 * Dispatched when the block are loaded by the request saga
 *
 * @param  {array} Block The block data
 *
 * @return {object} An action object with a type of LOAD_BLOCK_SUCCESS passing the block
 */
export function blockLoaded(block) {
  return {
    type: LOAD_BLOCK_SUCCESS,
    block,
  };
}
