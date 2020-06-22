/*
 *
 * App actions
 *
 */

import {
	GET_PROFILE_ERROR,
	GET_PROFILE_REQUEST,
	GET_PROFILE_SUCCESS,
	GET_REFRESH_TOKEN_ERROR,
	IS_LOGGED,
	IS_LOGGED_ERROR,
	IS_LOGGED_SUCCESS,
	LOGGED_IN,
	LOGOUT,
	LOGOUT_ERROR,
	LOGOUT_SUCCESS
} from 'containers/App/constants';

/**
 *
 * @param user
 * @returns {{type: string, user: *}}
 */
export function getProfileSuccessAction(user) {
	return {
		type: GET_PROFILE_SUCCESS,
		user
	};
}

/**
 *
 * @param error
 * @returns {{type: string, error: *}}
 */
export function getProfileErrorAction(error) {
	return {
		type: GET_PROFILE_ERROR,
		error
	};
}

/**
 *
 * @returns {{type: string}}
 */
export function getProfileAction() {
	return {
		type: GET_PROFILE_REQUEST,
	};
}


/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedAction() {
	return {
		type: IS_LOGGED,
	};
}

/**
 * TODO
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedSuccessAction() {
	return {
		type: IS_LOGGED_SUCCESS,
	};
}

/**
 * TODO
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedErrorAction() {
	return {
		type: IS_LOGGED_ERROR,
	};
}

/**
 
 * User login to the application, this is the global action
 *
 * @return {object} An action object with a type of LOGGED_IN
 */
export function loggedInAction() {
	return {
		type: LOGGED_IN,
	};
}

/**
 * Start the logout process, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGOUT
 */
export function logoutAction() {
	return {
		type: LOGOUT,
	};
}

/**
 * Dispatched when the logout process are loaded by the request saga
 *
 * @return {object} An action object with a type of LOGOUT_SUCCESS
 */
export function logoutSuccessAction() {
	return {
		type: LOGOUT_SUCCESS,
	};
}

/**
 * Dispatched when loading the new notifications fails
 *
 * @param  {object} error The error
 *
 * @return {object}      An action object with a type of LOGOUT_ERROR passing the repos
 */
export function logoutErrorAction(error) {
	return {
		type: LOGOUT_ERROR,
		error,
	};
}

export function refreshTokenErrorAction(error) {
	return {
		type: GET_REFRESH_TOKEN_ERROR,
		error,
	};
}
