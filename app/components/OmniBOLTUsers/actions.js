/*
 *
 * OmniBOLT Users actions
 *
 */
import {
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  SET_PAGE,
} from './constants';

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
 * Dispatched when the page change
 *
 * @param  {number} page The page number
 *
 * @return {object} An action object with the page
 */
export function setPage(payload) {
  return {
    type: SET_PAGE,
    payload,
  };
}
