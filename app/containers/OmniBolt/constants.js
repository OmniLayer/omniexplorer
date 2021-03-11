/*
 *
 * OmniBOLT constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const DEFAULT_ACTION = 'app/OmniBOLT/DEFAULT_ACTION';
export const OMNIBOLT_TESTNET_TRACKER_HOST = '62.234.216.108';
export const OMNIBOLT_TESTNET_TRACKER_PORT = '60060';
export const OMNIBOLT_TESTNET_API_URL = `${OMNIBOLT_TESTNET_TRACKER_HOST}:${OMNIBOLT_TESTNET_TRACKER_PORT}`;

export const LOAD_NODES = 'omniexplorer/OmniBOLT/LOAD_NODES';
export const LOAD_USERS = 'omniexplorer/OmniBOLT/LOAD_USERS';
export const LOAD_CHANNELS = 'omniexplorer/OmniBOLT/LOAD_CHANNELS';

export const LOAD_NODES_SUCCESS = 'omniexplorer/OmniBOLT/LOAD_NODES_SUCCESS';
export const LOAD_USERS_SUCCESS = 'omniexplorer/OmniBOLT/LOAD_USERS_SUCCESS';
export const LOAD_CHANNELS_SUCCESS = 'omniexplorer/OmniBOLT/LOAD_CHANNELS_SUCCESS';

export const FN_API_URL_OMNIBOLT_NODES = (data) => generateTemplate`http://${'apiurl'}/api/common/getObdNodes?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
export const FN_API_URL_OMNIBOLT_USERS = (data) => generateTemplate`http://${'apiurl'}/api/common/getUsers?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
export const FN_API_URL_OMNIBOLT_CHANNELS = (data) => generateTemplate`http://${'apiurl'}/api/common/getChannels?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);

export const OMNIBOLT_NODES_TAB = 'omniexplorer/OmniBOLT/OMNIBOLT_NODES_TAB';
export const OMNIBOLT_CHANNELS_TAB = 'omniexplorer/OmniBOLT/OMNIBOLT_CHANNELS_TAB';
export const OMNIBOLT_USERS_TAB = 'omniexplorer/OmniBOLT/OMNIBOLT_USERS_TAB';
