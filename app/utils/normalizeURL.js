export default (url) => url.indexOf('//') > -1 ? url : `//${url}`;
