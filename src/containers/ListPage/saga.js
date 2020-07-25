import { put, select, takeLatest } from 'redux-saga/effects';
import { getObject, KEY_BLOCKED_URL, setObject } from 'helpers/localStorage';
import { LOAD_BLOCKED_SITES, UNBLOCK_BY_INDEX } from 'containers/ListPage/constants';
import { initializeBlockedListAction, loadBlockedListAction } from 'containers/ListPage/actions';
import { makeUnblockSelectedIndexSelector } from 'containers/ListPage/selectors';

export function* loadBlockedSites() {
  let list = getObject(KEY_BLOCKED_URL);
  // if (list && list.blocked_url && list.blocked_url.length > 0) {
    let filteredList = list.blocked_url.filter((domain) => {
      if (domain.blockedAlways) {
        return true;
      }
      let blockedDateTime = new Date(domain.time);
      let addedTime = blockedDateTime.setMinutes(blockedDateTime.getMinutes() + parseInt(domain.blockedInterval));
      domain.expireTime = addedTime;
      return addedTime > new Date();
      
    });
    console.log('filteredList', filteredList)
    return yield put(initializeBlockedListAction(filteredList));
  // }
}

export function* unblockByIndex() {
  const index = yield select(makeUnblockSelectedIndexSelector());
  let blockedList = getObject(KEY_BLOCKED_URL);
  blockedList.blocked_url.splice(index, 1);
  setObject(KEY_BLOCKED_URL, blockedList);
  return yield put(loadBlockedListAction());
}

export default function* homePageSaga() {
  yield takeLatest(LOAD_BLOCKED_SITES, loadBlockedSites);
  yield takeLatest(UNBLOCK_BY_INDEX, unblockByIndex);
}
