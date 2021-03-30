/*
 *
 * OmniBOLT Users constants
 *
 */
import generateTemplate from 'utils/generateTemplate';

export const LOAD_USERS = 'omniexplorer/OmniBOLT/LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'omniexplorer/OmniBOLT/LOAD_USERS_SUCCESS';
export const SET_PAGE = 'omniexplorer/OmniBOLT/SET_USERS_PAGE';
export const FN_API_URL_OMNIBOLT_USERS = (data) => generateTemplate`http://${'apiurl'}/api/common/getUsers?pageNum=${'pagenum'}&pageSize=${'pagesize'}`(data);
