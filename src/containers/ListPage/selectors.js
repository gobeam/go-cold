import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.listPage || initialState;

const makeBlockedListSelector = () =>
  createSelector(
    selectHome,
    substate => substate.blockedList,
  );

const makeUnblockSelectedIndexSelector = () =>
  createSelector(
    selectHome,
    substate => substate.deleteIndex,
  );

export {
  makeBlockedListSelector,
  makeUnblockSelectedIndexSelector
};
