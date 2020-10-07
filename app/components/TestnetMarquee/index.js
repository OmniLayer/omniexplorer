/**
 *
 * TestnetMarquee
 *
 */

import React from 'react';
import './testnetmarquee.scss';

function TestnetMarquee() {
  return (
    <div className="marquee fixed-bottom">
      <span>{'TESTNET---------------'.repeat(20)}</span>
    </div>
  );
}

TestnetMarquee.propTypes = {};

export default TestnetMarquee;
