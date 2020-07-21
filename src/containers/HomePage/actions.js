/*
 *
 * HomePage actions
 *
 */

import {
  ADD_CURRENT_BASE_URL,
  ASYNC_END,
  CHECK_IF_CURRENT_URL_ADDED,
  CURRENT_URL_ALREADY_ADDED,
  GET_BASE_URL_CURRENT_TAB,
  EMPTY_FORM,
  IS_LOGGED,
  ADD_URL_TO_BLOCKED_LIST,
  ADD_VALIDATION_ERROR,
  ASYNC_START,
  CHANGE_FIELD,
  VALIDATE_FORM, MANUAL_ADD_TOGGLE, ADDED_URL_DETAIL,
} from 'containers/HomePage/constants';

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

export function onFormValidation() {
  return {
    type: VALIDATE_FORM,
  };
}

export function asyncStart() {
  return {
    type: ASYNC_START,
  };
}

export function addBlockedUrlAction() {
  return {
    type: ADD_URL_TO_BLOCKED_LIST,
  };
}

export function toggleManualAddAction(manualAdd) {
  return {
    type: MANUAL_ADD_TOGGLE,
    manualAdd
  };
}

export function asyncEnd() {
  return {
    type: ASYNC_END,
  };
}

export function addAlreadyAddedUrlDetail(detail) {
  return {
    type: ADDED_URL_DETAIL,
    detail
  };
}

export function emptyForm() {
  return {
    type: EMPTY_FORM,
  };
}

export function checkIfCurrentUrlAddedAction() {
  return {
    type: CHECK_IF_CURRENT_URL_ADDED,
  };
}


export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function currentUrlAlreadyAddedAction() {
  return {
    type: CURRENT_URL_ALREADY_ADDED,
  };
}

export function addCurrentBaseUrlAction(currentBaseUrl) {
  return {
    type: ADD_CURRENT_BASE_URL,
    currentBaseUrl,
  };
}

export function getCurrentTabBaseUrlAction() {
  return {
    type: GET_BASE_URL_CURRENT_TAB,
  };
}

export function changeField(key, val) {
  return {
    type: CHANGE_FIELD,
    key,
    val,
  };
}
