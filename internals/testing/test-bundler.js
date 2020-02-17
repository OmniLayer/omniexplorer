// eslint-disable import/no-unresolved

// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import '@babel/polyfill';

require('./shim');
require('fetch-reply-with');

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
