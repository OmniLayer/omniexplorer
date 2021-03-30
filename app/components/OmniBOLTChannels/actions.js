/*
 *
 * OmniBOLT Channels actions
 *
 */
import {
  LOAD_CHANNELS,
  LOAD_CHANNELS_SUCCESS,
  SET_PAGE,
} from './constants';

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
