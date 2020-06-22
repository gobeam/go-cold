/*
 *
 * App reducer
 *
 */
import produce, {setAutoFreeze} from 'immer';

import {
	GET_PROFILE_SUCCESS,
	IS_LOGGED_ERROR,
	IS_LOGGED_SUCCESS,
	LOGGED_IN,
	LOGOUT,
	LOGOUT_ERROR,
	LOGOUT_SUCCESS,
} from './constants';
import {GET_PROFILE_ERROR} from "containers/App/constants";

export const initialState = {
	isLogged: false,
	errors: {},
	user: {},
	error: ''
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
	switch (action.type) {
		case LOGGED_IN:
		case IS_LOGGED_SUCCESS:
			draft.isLogged = true;
			break;
		case IS_LOGGED_ERROR:
			draft.isLogged = false;
			break;
		case GET_PROFILE_SUCCESS:
			draft.user = action.user;
			break;
		case GET_PROFILE_ERROR:
			draft.error = action.error;
			break;
		case LOGOUT:
			draft.error = '';
			draft.isLogged = false;
			break;
		case LOGOUT_SUCCESS:
		case LOGOUT_ERROR:
			draft.error = '';
			draft.user = {};
			draft.isLogged = false;
			break;
		default:
	}
}, initialState);

export default appPageReducer;
