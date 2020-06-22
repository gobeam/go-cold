import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeLoggedInUserSelector = () =>
	createSelector(
		selectGlobal,
		globalState => globalState.user,
	);

const makeIsLoggedSelector = () =>
	createSelector(
		selectGlobal,
		globalState => globalState.isLogged,
	);

const makeSelectLocation = () =>
	createSelector(
		selectRouter,
		routerState => routerState.location,
	);

export {
	makeLoggedInUserSelector,
	makeIsLoggedSelector,
	makeSelectLocation
};
