export default query =>
  (q => {
    const docWidth = document.documentElement.offsetWidth;
    [].forEach.call(
      document.querySelectorAll('*'),

      el => {
        if (el.offsetWidth > docWidth) {
          // eslint-disable-next-line no-param-reassign
          el.style.outline = q;
          // eslint-disable-next-line no-console
          console.log(el);
        }
      },
    );
  })(query); // query= '1px solid red'
