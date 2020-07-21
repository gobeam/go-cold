/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_CURRENT_BASE_URL,
  ADD_VALIDATION_ERROR,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FIELD,
  CURRENT_URL_ALREADY_ADDED,
  MANUAL_ADD_TOGGLE,
  EMPTY_FORM, ADDED_URL_DETAIL,
} from 'containers/HomePage/constants';

export const initialState = {
  url: '',
  blockInterval: 30,
  manualAdd: false,
  blockAlways: false,
  currentUrlAdded: false,
  currentBaseUrl: '',
  errors: {},
  isLoading: false,
  addedUrlDetail: {}
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = produce((draft, action) => {
  switch (action.type) {
    case ADDED_URL_DETAIL:
      draft.addedUrlDetail = action.detail;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case CURRENT_URL_ALREADY_ADDED:
      draft.currentUrlAdded = true;
      break;
    case MANUAL_ADD_TOGGLE:
      draft.manualAdd = action.manualAdd;
      break;
    case ADD_CURRENT_BASE_URL:
      draft.currentBaseUrl = action.currentBaseUrl;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      draft.isLoading = false;
      break;
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors = {};
      draft.isLoading = false;
      break;
    case EMPTY_FORM:
      draft.url = '';
      draft.errors = {};
      draft.isLoading = false;
      break;
    case LOCATION_CHANGE:
      draft.url = '';
      draft.errors = {};
      draft.isLoading = false;
      break;
  }
}, initialState);

export default homePageReducer;
