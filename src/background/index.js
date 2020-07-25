import {
  checkIfExistsInArray,
  getObject,
  KEY_BLOCKED_URL,
  returnIndexOf,
  returnItemFromArray,
  setObject,
} from '../helpers/localStorage';

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  initializeTask();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: 'hello!',
      url: changeInfo.url,
    });
  }
  if (tab && tab.status === 'loading') {
    let url = new URL(tab.url);
    let domain = url.hostname;
    let redirect = false;
    let blockedList = getObject(KEY_BLOCKED_URL);
    let exists = checkIfExistsInArray(blockedList.blocked_url, 'url', domain);
    if (exists) {
      let element = returnItemFromArray(blockedList.blocked_url, 'url', domain);
      if (!element.blockedAlways) {
        let blockedDateTime = new Date(element.time);
        let addedTime = blockedDateTime.setMinutes(blockedDateTime.getMinutes() + parseInt(element.blockedInterval));
        if (addedTime > new Date()) {
          redirect = true;
        } else {
          let index = returnIndexOf(blockedList.blocked_url, 'url', domain);
          blockedList.blocked_url.splice(index,1);
          setObject(KEY_BLOCKED_URL, blockedList);
        }
      } else {
        redirect = true;
      }
      if (redirect) {
        let redirectUrl = chrome.extension.getURL('blocked.html');
        chrome.tabs.update(tabId, { url: redirectUrl });
      }
    }
  }
});

const initializeTask = () => {

};
