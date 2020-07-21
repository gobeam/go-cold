import {createSelector} from 'reselect';
import {initialState} from 'containers/SnackBar/reducer';

const selectSnackBarMessage = state => state.snackMessage || initialState;

const makeSnackBarMessageSelector = () =>
  createSelector(
    selectSnackBarMessage,
    substate => substate.message,
  );

const makeSnackBarMessageShowSelector = () =>
  createSelector(
    selectSnackBarMessage,
    substate => substate.show,
  );

const makeSnackBarMessageTypeSelector = () =>
  createSelector(
    selectSnackBarMessage,
    substate => substate.type,
  );

export {
  makeSnackBarMessageSelector,
  makeSnackBarMessageShowSelector,
  makeSnackBarMessageTypeSelector
};
