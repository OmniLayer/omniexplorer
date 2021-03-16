/*
 *
 * OmniBOLT Channels constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const LOAD_CHANNELS = 'omniexplorer/OmniBOLT/LOAD_CHANNELS';
export const LOAD_CHANNELS_SUCCESS = 'omniexplorer/OmniBOLT/LOAD_CHANNELS_SUCCESS';
export const FN_API_URL_OMNIBOLT_CHANNELS = (data) => generateTemplate`http://${'apiurl'}/api/common/getChannels?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
