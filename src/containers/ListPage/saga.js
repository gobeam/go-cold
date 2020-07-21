import { put, takeLatest } from 'redux-saga/effects';
import { getObject, KEY_BLOCKED_URL } from 'helpers/localStorage';
import { LOAD_BLOCKED_SITES } from 'containers/ListPage/constants';
import { initializeBlockedListAction } from 'containers/ListPage/actions';

export function* loadBlockedSites() {
  let list = getObject(KEY_BLOCKED_URL);
  if (list && list.blocked_url && list.blocked_url.length > 0) {
    return yield put(initializeBlockedListAction(list.blocked_url));
  }
}

export default function* homePageSaga() {
  yield takeLatest(LOAD_BLOCKED_SITES, loadBlockedSites);
}
