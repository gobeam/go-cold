import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.homePage || initialState;

const makeErrorSelector = () =>
  createSelector(
    selectHome,
    substate => substate.errors,
  );

const makeUrlSelector = () =>
  createSelector(
    selectHome,
    substate => substate.url,
  );

const makeCurrentBaseUrlSelector = () =>
  createSelector(
    selectHome,
    substate => substate.currentBaseUrl,
  );

const makeCurrentUrlAddedSelector = () =>
  createSelector(
    selectHome,
    substate => substate.currentUrlAdded,
  );

const makeBlockAlwaysSelector = () =>
  createSelector(
    selectHome,
    substate => substate.blockAlways,
  );

const makeBlockIntervalSelector = () =>
  createSelector(
    selectHome,
    substate => substate.blockInterval,
  );

const makeManualAddSelector = () =>
  createSelector(
    selectHome,
    substate => substate.manualAdd,
  );

const makeAddedUrlDetailSelector = () =>
  createSelector(
    selectHome,
    substate => substate.addedUrlDetail,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectHome,
    substate => substate.isLoading,
  );

export {
  makeErrorSelector,
  makeIsLoadingSelector,
  makeUrlSelector,
  makeBlockAlwaysSelector,
  makeCurrentUrlAddedSelector,
  makeCurrentBaseUrlSelector,
  makeBlockIntervalSelector,
  makeManualAddSelector,
  makeAddedUrlDetailSelector,
};
