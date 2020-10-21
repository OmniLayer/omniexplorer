/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import {
  LOAD_EXODUS_TXS,
  LOAD_EXODUS_TXS_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_UNCONFIRMED,
  SET_PAGE,
  SET_TRANSACTION_TYPE,
} from './constants';

export const initialState = {
  loading: false,
  transactions: [],
  pageCount: 0,
  currentPage: 1,
  txType: null,
  txCount: 0,
  unconfirmed: false,
  exodus: false,
  stamp: null,
};

/* eslint-disable default-case, no-param-reassign */
const transactionsReducer = (
  state = initialState,
  { type, addr, transactions, pages, page, txType, txcount } = action,
) =>
  produce(state, draft => {
    switch (type) {
      case LOAD_TRANSACTIONS:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.txCount = 0;
        draft.unconfirmed = false;
        draft.exodus = false;
        break;
      case LOAD_EXODUS_TXS:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.txCount = 0;
        draft.unconfirmed = false;
        draft.exodus = true;
        break;
      case LOAD_UNCONFIRMED:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.txCount = 0;
        draft.currentPage = 1;
        draft.unconfirmed = true;
        draft.exodus = false;
        break;

      case LOAD_TRANSACTIONS_SUCCESS: {
        const maxPagesByMedia = getMaxPagesByMedia();

        draft.transactions = addr
          ? transactions.filter(tx => !!tx.confirmations)
          : transactions;
        draft.pageCount = state.unconfirmed
          ? Math.ceil(transactions.length / maxPagesByMedia)
          : pages;
        draft.txCount = txcount;
        draft.loading = false;
        draft.stamp = Date.now();
        break;
      }

      case LOAD_EXODUS_TXS_SUCCESS: {
        debugger;

        // amount: "9000.00000000"
        // block: 653434
        // blockhash: "0000000000000000000bc96a38b2679d8ce2ffb180e8ab73a614ef1613b9f18e"
        // blocktime: 1603122118
        // confirmations: 1
        // divisible: true
        // fee: "0.00008663"
        // flags: null
        // ismine: false
        // positioninblock: 886
        // propertyid: 31
        // propertyname: "TetherUS"
        // referenceaddress: "14tATbE55rrQDSVao3r4DxXr4dbcGLad8W"
        // sendingaddress: "1BDoFWqaDKsnTZmKqccJQF3e3snsiQqQQX"
        // txid: "60ca649792c5f5ff19f5f1f08a396efa35d21930289e61988e7cb75faea18d8d"
        // type: "Simple Send"
        // type_int: 0
        // valid: true
        // version: 0

        draft.transactions = transactions.map(tx => ({
          // ...tx,
          txid: tx.hash,
          sendingaddress: tx.inputs[0].prev_out.addr,
          referenceaddress: tx.inputs[0].prev_out.addr,
          amount: parseInt(tx.inputs[0].prev_out.value, 10) / 100000000,
          blocktime: tx.time,

        }));
        draft.pageCount = pages;
        draft.txCount = txcount;
        draft.loading = false;
        draft.stamp = Date.now();
        break;
      }

      case SET_PAGE:
        draft.currentPage = Number(page);
        break;
      case SET_TRANSACTION_TYPE:
        draft.txType = txType;
        break;
    }
  });

export default transactionsReducer;
