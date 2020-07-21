export function* getCurrentTabDomain() {
  yield new Promise(resolve => {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tab = tabs[0];
      let url = new URL(tab.url);
      let domain = url.hostname;
      resolve(domain);
    });
    /* eslint-enable no-undef */
  });
  
}

export const checkIfValidDomain = (domain) => {
  if (!domain) return false;
  let re = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi;
  return re.test(domain);
  
};
