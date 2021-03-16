/*
 *
 * OmniBOLT Nodes actions
 *
 */
import {
  LOAD_NODES,
  LOAD_NODES_SUCCESS,
} from './constants';

/**
 * Load the nodes, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_NODES
 */
export function loadNodes() {
  return {
    type: LOAD_NODES,
  };
}

/**
 * Dispatched when the nodes are loaded by the request saga
 *
 * @param  {array} The nodes data
 *
 * @return {object} An action object with a type of FN_API_URL_OMNIBOLT_NODES passing the nodes
 */
export function nodesLoaded(payload) {
  return {
    type: LOAD_NODES_SUCCESS,
    payload,
  };
}
