/* eslint-disable global-require */
export default id => {
  let logo;
  try {
    logo = require(`images/token${id}.png`);
  } catch (e) {
    if (id > 2147483650) {
      logo = require('images/test-dev-icon.png');
    } else {
      logo = require('images/tokendefault.png');
    }
  }
  return logo;
};
