import { put, select, takeLatest } from 'redux-saga/effects';
import {
  ADD_URL_TO_BLOCKED_LIST,
  CHECK_IF_CURRENT_URL_ADDED,
  GET_BASE_URL_CURRENT_TAB,
  VALIDATE_FORM,
} from 'containers/HomePage/constants';
import {
  addAlreadyAddedUrlDetail,
  addBlockedUrlAction,
  addCurrentBaseUrlAction,
  asyncStart,
  checkIfCurrentUrlAddedAction,
  currentUrlAlreadyAddedAction,
  emptyForm,
  enterValidationErrorAction,
  toggleManualAddAction,
} from 'containers/HomePage/actions';
import { checkError } from 'helpers/Validation';
import {
  makeBlockAlwaysSelector,
  makeBlockIntervalSelector,
  makeCurrentBaseUrlSelector,
  makeUrlSelector,
} from 'containers/HomePage/selectors';
import {
  checkIfExistsInArray,
  getObject,
  KEY_BLOCKED_URL,
  returnItemFromArray,
  setObject,
} from 'helpers/localStorage';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { ADDED, DUPLICATE } from 'containers/SnackBar/constants';
import { checkIfValidDomain, getCurrentTabDomain } from 'helpers/chrome';

export function* validateForm() {
  yield put(asyncStart());
  const url = yield select(makeUrlSelector());
  const blockedAlways = yield select(makeBlockAlwaysSelector());
  const blockedInterval = yield select(makeBlockIntervalSelector());
  let model = {
    url: {
      value: url,
      validator: ['isValidDomain', 'isNotEmpty'],
    },
  };
  
  let err = checkError(model);
  if (Object.keys(err).length > 0) {
    return yield put(enterValidationErrorAction(err));
  }
  if (!blockedAlways && blockedInterval <= 0) {
    return yield put(
      enqueueSnackbarAction({
        message: 'You must add block interval or select to block always.',
        type: 'warning',
      }),
    );
  }
  yield put(addBlockedUrlAction());
}

export function* checkIfCurrentUrlAdded() {
  const currentBaseUrl = yield select(makeCurrentBaseUrlSelector());
  let list = getObject(KEY_BLOCKED_URL);
  let exists = checkIfExistsInArray(list.blocked_url, 'url', currentBaseUrl);
  if (exists) {
    let detail = returnItemFromArray(list.blocked_url, 'url', currentBaseUrl);
    yield put(addAlreadyAddedUrlDetail(detail));
    return yield put(currentUrlAlreadyAddedAction());
  }
}

export function* getCurrentTabUrl() {
  let current_tab_url = yield getCurrentTabDomain().next().value;
  let validDomainCheck = checkIfValidDomain(current_tab_url);
  if (current_tab_url && current_tab_url.length > 0 && validDomainCheck) {
    yield put(addCurrentBaseUrlAction(current_tab_url));
    yield put(checkIfCurrentUrlAddedAction());
  }
}

export function* addUrlToBlockedList() {
  const url = yield select(makeUrlSelector());
  let current_tab_url = yield getCurrentTabDomain().next().value;
  const blockedAlways = yield select(makeBlockAlwaysSelector());
  const blockedInterval = yield select(makeBlockIntervalSelector());
  let list = getObject(KEY_BLOCKED_URL);
  let exists = checkIfExistsInArray(list.blocked_url, 'url', url);
  if (exists) {
    return yield put(
      enqueueSnackbarAction({
        message: DUPLICATE,
        type: 'error',
      }),
    );
  }
  let payload = {
    url, blockedAlways, blockedInterval,
    time: new Date(),
  };
  list.blocked_url.push(payload);
  setObject(KEY_BLOCKED_URL, list);
  yield put(emptyForm());
  yield put(toggleManualAddAction(false));
  yield put(
    enqueueSnackbarAction({
      message: ADDED,
      type: 'success',
    }),
  );
  if (current_tab_url.includes(url)) {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, function(arrayOfTabs) {
      chrome.tabs.reload(arrayOfTabs[0].id);
    });
    /* eslint-enable no-undef */
  }
}

export default function* homePageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(ADD_URL_TO_BLOCKED_LIST, addUrlToBlockedList);
  yield takeLatest(CHECK_IF_CURRENT_URL_ADDED, checkIfCurrentUrlAdded);
  yield takeLatest(GET_BASE_URL_CURRENT_TAB, getCurrentTabUrl);
}
