import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
// Import Utils
import request from 'utils/request';
import ApiEndpoint from 'utils/api';
// Import Services
import AuthService from 'services/auth.service';
// Import Actions
import {
  getProfileAction,
  getProfileErrorAction,
  getProfileSuccessAction,
  isLoggedErrorAction,
  isLoggedSuccessAction,
  logoutErrorAction,
  logoutSuccessAction,
  refreshTokenErrorAction,
} from 'containers/App/actions';
// Import Constants
import { GET_PROFILE_REQUEST, IS_LOGGED, LOGOUT } from 'containers/App/constants';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import Common from 'utils/common';

/**
 *
 * @returns {IterableIterator<SimpleEffect<"PUT", PutEffectDescriptor<{type: *, error: *}>>|SimpleEffect<"CALL", CallEffectDescriptor>|SimpleEffect<"PUT", PutEffectDescriptor<CallHistoryMethodAction<[, ]>>>|SimpleEffect<"PUT", PutEffectDescriptor<{type: *}>>>}
 */
export function* handleLogout() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const requestURL = api.getLogoutPath();
  const payload = api.makeApiPayload('GET', token);
  try {
    yield call(request, requestURL, payload);
    yield put(logoutSuccessAction());
    auth.unSetTokenPayload();
    yield put(push('/login'));
  } catch (error) {
    yield put(logoutErrorAction(error));
    yield put(push('/login'));
  }
}

/**
 * Handle if user logged in
 * @returns {IterableIterator<PutEffect<CallHistoryMethodAction<[, ]>>|PutEffect<{type}>|*>}
 */
export function* handleLogged() {
  const auth = new AuthService();
  const isTokenAvailable = auth.checkToken();
  if (isTokenAvailable) {
    return yield put(getProfileAction());
  }
  auth.unSetTokenPayload();
  yield put(push(`/?path=${window.location.pathname}`));
}


/**
 * Handle user's profile request
 * @returns {IterableIterator<PutEffect<{type, error}>|CallEffect|PutEffect<{type, user}>|PutEffect<{type}>|*>}
 */
export function* handleProfile() {
  yield call(checkRefreshTokenExpiry);
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getProfilePath();
  const payload = api.makeApiPayload('GET', token);
  
  try {
    const response = yield call(request, requestURL, payload);
    if (response.error) {
      auth.unSetTokenPayload();
      yield put(isLoggedErrorAction());
      return yield put(push(`/?path=${window.location.pathname}`));
    }
    yield put(getProfileSuccessAction(response.data));
    yield put(isLoggedSuccessAction());
    let common = new Common();
    let redirectUrl = common.getParameterByName('path');
    if (redirectUrl) {
      yield put(push(redirectUrl));
    }
  } catch (error) {
    yield put(getProfileErrorAction('ee'));
  }
}

/**
 *
 * @returns {IterableIterator<*>}
 */
export function* checkRefreshTokenExpiry() {
  const auth = new AuthService();
  const refreshToken = auth.getRefreshToken();
  const expiryTime = auth.getExpiry();
// 10 seconds from now
  const refreshThreshold = (Date.now() / 1000) + 10;
  if (refreshToken && refreshThreshold > expiryTime) {
    return yield call(handleRefreshToken);
  }
}

/**
 *
 * @returns {IterableIterator<SimpleEffect<"PUT", PutEffectDescriptor<{type: *, error: *}>>|SimpleEffect<"CALL", CallEffectDescriptor>|SimpleEffect<"PUT", PutEffectDescriptor<CallHistoryMethodAction<[, ]>>>|boolean|*>}
 */
export function* handleRefreshToken() {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const requestURL = api.getLoginPath();
  const refresh_token = auth.getRefreshToken();
  const payload = api.getLoginPayload('', '', true, refresh_token);
  const requestPayload = api.makeApiPayload('POST', null, payload);
  
  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response.error) {
      auth.unSetTokenPayload();
      yield put(
        refreshTokenErrorAction('ee'),
      );
      return yield put(push(`/?path=${window.location.pathname}`));
    }
    
    return auth.setTokenPayload(response.data);
  } catch (error) {
    yield put(refreshTokenErrorAction('ee'));
  }
}

/**
 * app page root saga
 * @returns {IterableIterator<ForkEffect>}
 */
export default function* appPageSaga() {
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(IS_LOGGED, handleLogged);
  yield takeLatest(GET_PROFILE_REQUEST, handleProfile);
}
