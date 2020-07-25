class Validator {
  
  validate = (value, rules) => {
    let self = this;
    let msg = null;
    let endMessage = '';
    rules.forEach(function(rule) {
      msg = self[rule](value);
      if (msg) {
        endMessage = msg;
      }
    });
    return endMessage;
  };
  
  /**
   * check if value is string
   * @param value
   * @returns {string}
   */
  isString = (value) => {
    if (typeof value === 'string') {
      return '';
    }
    return 'value must be string';
  };
  
  /**
   * Check if value is empty
   * @param value
   * @returns {string}
   */
  isNotEmpty = (value) => {
    if (value !== '' && value !== null && typeof value !== 'undefined') {
      return '';
    }
    return 'value cannot be empty';
  };
  
  /**
   * Check if valid domain
   * @param value
   * @returns {string}
   */
  isValidDomain = (value) => {
    value = value.replace("http://", "");
    value = value.replace("www.", "");
  
    let reg = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if(reg.test(value)) {
      return '';
    }
    return 'invalid domain';
  };
  
  /**
   * Check if value i integer
   * @param value
   * @returns {string}
   */
  isInt = (value) => {
    if (!isNaN(value)) {
      return '';
    }
    return 'value must be integer';
  };
  
  /**
   * Check if value i integer in select box
   * @param value
   * @returns {string}
   */
  isIntSelect = (value) => {
    if (!isNaN(value)) {
      return '';
    }
    return 'value not selected';
  };
  
  /**
   *
   * @param value
   * @returns {string}
   */
  isPositive = (value) => {
    if (value > 0) {
      return '';
    }
    return 'value must be positive';
  };
  
  /** check if value is in email format
   * @param value
   * @returns {string}
   */
  isEmail = (value) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).toLowerCase())) {
      return '';
    } else {
      return 'value must be email';
    }
  };
  
  
  /**
   * check if value is true
   * @param value
   * @returns {string}
   */
  isTrue = (value) => {
    if (value) {
      return '';
    } else {
      return 'value must be true';
    }
  };
  
  
  /**
   * check if value is valid ethereum address
   * @param value
   * @returns {string}
   */
  isAddress = (value) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(value)) {
      // check if it has the basic requirements of an address
      return 'value must be valid ethereum address!';
    } else if (/^(0x)?[0-9a-f]{40}$/.test(value) || /^(0x)?[0-9A-F]{40}$/.test(value)) {
      // If it's all small caps or all all caps, return true
      return '';
    } else {
      return '';
    }
    
  };
}

export default Validator;
