/*
 *
 * OmniBOLT Nodes constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const LOAD_NODES = 'omniexplorer/OmniBOLT/LOAD_NODES';
export const LOAD_NODES_SUCCESS = 'omniexplorer/OmniBOLT/LOAD_NODES_SUCCESS';
export const FN_API_URL_OMNIBOLT_NODES = (data) => generateTemplate`http://${'apiurl'}/api/common/getObdNodes?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
