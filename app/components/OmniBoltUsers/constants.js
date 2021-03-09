/*
 *
 * OmniBolt constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const LOAD_USERS = 'omniexplorer/OmniBolt/LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'omniexplorer/OmniBolt/LOAD_USERS_SUCCESS';
export const FN_API_URL_OMNIBOLT_USERS = (data) => generateTemplate`https://${'apiurl'}/api/common/getUsers?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
