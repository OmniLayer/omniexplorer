/*
 *
 * OmniBolt constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const DEFAULT_ACTION = 'app/OmniBolt/DEFAULT_ACTION';
export const OMNIBOLT_TESTNET_TRACKER_HOST = '62.234.216.108';
export const OMNIBOLT_TESTNET_TRACKER_PORT = '60060';
export const OMNIBOLT_TESTNET_API_URL = `${OMNIBOLT_TESTNET_TRACKER_HOST}:${OMNIBOLT_TESTNET_TRACKER_PORT}`;

export const LOAD_NODES = 'omniexplorer/OmniBolt/LOAD_NODES';
export const LOAD_USERS = 'omniexplorer/OmniBolt/LOAD_USERS';
export const LOAD_CHANNELS = 'omniexplorer/OmniBolt/LOAD_CHANNELS';

export const LOAD_NODES_SUCCESS = 'omniexplorer/OmniBolt/LOAD_NODES_SUCCESS';
export const LOAD_USERS_SUCCESS = 'omniexplorer/OmniBolt/LOAD_USERS_SUCCESS';
export const LOAD_CHANNELS_SUCCESS = 'omniexplorer/OmniBolt/LOAD_CHANNELS_SUCCESS';

export const FN_API_URL_OMNIBOLT_NODES = (data) => generateTemplate`https://${'apiurl'}/api/common/getObdNodes?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
export const FN_API_URL_OMNIBOLT_USERS = (data) => generateTemplate`https://${'apiurl'}/api/common/getUsers?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
export const FN_API_URL_OMNIBOLT_CHANNELS = (data) => generateTemplate`https://${'apiurl'}/api/common/getChannels?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
