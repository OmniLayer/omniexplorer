/*
 *
 * OmniBolt constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const LOAD_CHANNELS = 'omniexplorer/OmniBolt/LOAD_CHANNELS';
export const LOAD_CHANNELS_SUCCESS = 'omniexplorer/OmniBolt/LOAD_CHANNELS_SUCCESS';
export const FN_API_URL_OMNIBOLT_CHANNELS = (data) => generateTemplate`https://${'apiurl'}/api/common/getChannels?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
