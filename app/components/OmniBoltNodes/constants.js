/*
 *
 * OmniBolt constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const LOAD_NODES = 'omniexplorer/OmniBolt/LOAD_NODES';
export const LOAD_NODES_SUCCESS = 'omniexplorer/OmniBolt/LOAD_NODES_SUCCESS';
export const FN_API_URL_OMNIBOLT_NODES = (data) => generateTemplate`https://${'apiurl'}/api/common/getObdNodes?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
