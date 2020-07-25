/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ASSIGN_DELETE_INDEX, INITIALIZE_LIST } from 'containers/ListPage/constants';

export const initialState = {
  blockedList: [],
  deleteIndex: 0,
};

/* eslint-disable default-case, no-param-reassign */
const listPageReducer = produce((draft, action) => {
  switch (action.type) {
    case INITIALIZE_LIST:
      draft.blockedList = action.data;
      break;
    case LOCATION_CHANGE:
      draft.blockedList = [];
      break;
    case ASSIGN_DELETE_INDEX:
      draft.deleteIndex = action.index;
      break;
  }
}, initialState);

export default listPageReducer;
