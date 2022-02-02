import { useEffect } from 'react';

const garbage = [];

export default (cbk) => {
  const doTimer = () => garbage.push(setTimeout(cbk, 1500));

  useEffect(() => () => {
    garbage.forEach(t => clearTimeout(t));
    garbage.length = 0;
  }, []);

  return { doTimer };
};
