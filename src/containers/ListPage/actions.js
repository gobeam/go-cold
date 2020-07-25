/*
 *
 * ListPage actions
 *
 */

import {
  ASSIGN_DELETE_INDEX,
  INITIALIZE_LIST,
  LOAD_BLOCKED_SITES,
  UNBLOCK_BY_INDEX,
} from 'containers/ListPage/constants';

export function initializeBlockedListAction(data) {
  return {
    type: INITIALIZE_LIST,
    data
  };
}

export function loadBlockedListAction() {
  return {
    type: LOAD_BLOCKED_SITES
  };
}

export function assignDeleteIndexAction(index) {
  return {
    type: ASSIGN_DELETE_INDEX,
    index
  };
}

export function processUnblockAction() {
  return {
    type: UNBLOCK_BY_INDEX
  }
}
