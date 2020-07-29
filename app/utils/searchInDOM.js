export default (query) => (function (query) {
  const docWidth = document.documentElement.offsetWidth;
  [].forEach.call(
    document.querySelectorAll('*'),

    function (el) {
      if (el.offsetWidth > docWidth) {
        el.style.outline = query;
        console.log(el);
      }
    },
  );
})(query); // query= '1px solid red'
