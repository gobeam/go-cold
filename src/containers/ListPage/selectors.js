import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.listPage || initialState;

const makeBlockedListSelector = () =>
  createSelector(
    selectHome,
    substate => substate.blockedList,
  );



export {
  makeBlockedListSelector,
};
