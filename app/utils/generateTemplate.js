export default (strings, ...keys) => {
  return function(data) {
    let temp = strings.slice();
    keys.forEach((key, i) => {
      temp[i] = temp[i] + data[key];
    });
    return temp.join('');
  }
}
