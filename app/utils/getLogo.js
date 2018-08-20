/* eslint-disable global-require */

export const getLogoPath = (id, flags) => {
  let logo;
  try {
    if (flags && (flags.duplicate || flags.scam)) {
      logo = 'images/tokenwarn.png';
    } else {
      logo = `images/token${id}.png`;
    }
  } catch (e) {
    if (id > 2147483650) {
      logo = 'images/test-dev-icon.png';
    } else {
      logo = 'images/tokendefault.png';
    }
  }
  return logo;
};

export default (id, flags) => require(getLogoPath(id, flags));
