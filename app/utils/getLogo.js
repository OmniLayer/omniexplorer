/* eslint-disable global-require,camelcase */

export default (id, propertyinfo = {}) => {
  let logo;
  const { flags, type_int } = propertyinfo;

  try {
    if (type_int === 4) {
      logo = require('images/sendall.png');
    } else if (flags && (flags.duplicate || flags.scam)) {
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
