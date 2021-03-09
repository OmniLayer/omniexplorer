/*
 *
 * OmniBolt actions
 *
 */
import {
  LOAD_NODES,
  LOAD_USERS,
  LOAD_CHANNELS,
  LOAD_NODES_SUCCESS,
  LOAD_USERS_SUCCESS,
  LOAD_CHANNELS_SUCCESS,
} from 'containers/OmniBolt/constants';

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
 * Load the users, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_NODES
 */
export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

/**
 * Load the channels, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_CHANNELS
 */
export function loadChannels() {
  return {
    type: LOAD_CHANNELS,
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

/**
 * Dispatched when the users are loaded by the request saga
 *
 * @param  {array} The users data
 *
 * @return {object} An action object with a type of LOAD_USERS_SUCCESS passing the users
 */
export function usersLoaded(payload) {
  return {
    type: LOAD_USERS_SUCCESS,
    payload,
  };
}

/**
 * Dispatched when the channels are loaded by the request saga
 *
 * @param  {array} The channels data
 *
 * @return {object} An action object with a type of LOAD_CHANNELS_SUCCESS passing the channels
 */
export function channelsLoaded(payload) {
  return {
    type: LOAD_CHANNELS_SUCCESS,
    payload,
  };
}
