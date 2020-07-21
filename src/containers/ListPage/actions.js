/*
 *
 * ListPage actions
 *
 */

import { INITIALIZE_LIST, LOAD_BLOCKED_SITES } from 'containers/ListPage/constants';

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
