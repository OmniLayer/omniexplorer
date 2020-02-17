export default () => window.matchMedia('(max-width: 500px)').matches
  ? 5
  : 10;
