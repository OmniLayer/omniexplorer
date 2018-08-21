/* eslint-disable global-require */

export default (id, flags) => {
  let logo;
  try {
    if (flags && (flags.duplicate || flags.scam)) {
      logo = require('images/tokenwarn.png');
    } else {
      logo = require(`images/token${id}.png`);
    }
  } catch (e) {
    if (id > 2147483650) {
      logo = require('images/test-dev-icon.png');
    } else {
      logo = require('images/tokendefault.png');
    }
  }
  return logo;
};
