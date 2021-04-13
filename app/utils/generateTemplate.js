export default (strings, ...keys) => data => {
  const temp = strings.slice();
  keys.forEach((key, i) => {
    // eslint-disable-next-line operator-assignment
    temp[i] = temp[i] + data[key];
  });
  return temp.join('');
};
