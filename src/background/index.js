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
  // console.log('schedule watchdog alarm to 5 minutes...');
  // chrome.alarms.create('watchdog', { periodInMinutes: 5 });
  // startRequest();
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
        
        // let addedTime = blockedDateTime + (parseInt(element.blockedInterval) * 60)
        // console.log(addedTime,'addedTime', addedTime > Date.now())
        if (addedTime > new Date()) {
          redirect = true;
        } else {
          let index = returnIndexOf(blockedList.blocked_url, 'url', domain);
          blockedList.blocked_url.splice(index,1);
          // let filtered = blockedList.blocked_url.filter(function(el) { return el.url != domain; });
          // blockedList.blocked_url = []
          // blockedList.blocked_url.push(filtered)
          setObject(KEY_BLOCKED_URL, blockedList);
        }
      } else {
        redirect = true;
      }
      if (redirect) {
        let redirectUrl = chrome.extension.getURL('blocked.html') + '?url=' + encodeURIComponent(tab.url);
        chrome.tabs.update(tabId, { url: redirectUrl });
      }
    }
  }
});


// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     return { cancel: details.url.indexOf('://www.facebook.com/') != -1 };
//   },
//   { urls: ['<all_urls>'] },
//   ['blocking'],
// );

const initializeTask = () => {

};
