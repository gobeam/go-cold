export default class Common {
  
  getParameterByName = (name, url) => {
    let defaultUri = '/dashboard';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    let uri = decodeURIComponent(results[2].replace(/\+/g, " "));
    let exceptUri = ['/', '/login'];
    if (exceptUri.includes(uri)) {
      return defaultUri;
    }
    return uri;
  };
  
  
}
