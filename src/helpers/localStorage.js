export const KEY_BLOCKED_URL = 'blocked_url';

export const getObject = (key) => {
  let val = localStorage.getItem(key);
  if (val && Object.keys(val).length > 0) {
    return JSON.parse(localStorage.getItem(key));
  }
  return { blocked_url: [] };
};

export const setObject = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getBaseUrl = (value) => {
  let pathArray = value.split('/');
  // let protocol = pathArray[0];
  let host = pathArray[2];
  return host;
};

export const checkIfExistsInArray = (list, key, checkValue) => {
  return list.some(function(el) {
    return el[key] === checkValue;
  });
};

export const returnItemFromArray = (list, key, checkValue) => {
  let item = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === checkValue) {
      item = list[i];
      break;
    }
  }
  return item;
};


export const returnIndexOf = (list, key, checkValue) => {
  let index = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === checkValue) {
      index = i;
      break;
    }
  }
  return index;
};
