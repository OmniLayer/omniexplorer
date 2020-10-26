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
  LOAD_CLASSAB_TXS,
  LOAD_CLASSAB_TXS_BLOCKCHAIN_INFO_SUCCESS,
  LOAD_CLASSAB_TXS_SUCCESS,
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
  classABTxs: false,
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
        draft.classABTxs = false;
        break;
      case LOAD_CLASSAB_TXS:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.txCount = 0;
        draft.currentPage = 1;
        draft.unconfirmed = false;
        draft.classABTxs = true;
        break;
      case LOAD_UNCONFIRMED:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.txCount = 0;
        draft.currentPage = 1;
        draft.unconfirmed = true;
        draft.classABTxs = false;
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

      case LOAD_CLASSAB_TXS_SUCCESS: {
        const maxPagesByMedia = getMaxPagesByMedia();

        draft.transactions = transactions;
        draft.pageCount = Math.ceil(transactions.length / maxPagesByMedia);
        draft.txCount = transactions.length;
        draft.loading = false;
        draft.stamp = Date.now();

        break;
      }

      case LOAD_CLASSAB_TXS_BLOCKCHAIN_INFO_SUCCESS: {
        draft.transactions = transactions.map(tx => ({
          txid: tx.hash,
          sendingaddress: tx.inputs[0].prev_out.addr,
          referenceaddresses: tx.out.map(out => ({
            addr: out.addr,
            value: out.value,
            spent: out.spent,
          })),
          amount: parseInt(tx.inputs[0].prev_out.value, 10) / 100000000,
          blocktime: tx.time,
          block: tx.block_height,
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
