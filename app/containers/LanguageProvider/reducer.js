/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';
import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../App/constants'; // eslint-disable-line

export const initialState = {
  locale: DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, { type } = action) =>
  produce(state, draft => {
    switch (type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
