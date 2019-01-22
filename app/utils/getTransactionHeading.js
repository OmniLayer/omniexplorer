const headings = {
  51: 'Create Property - Crowdsale',
  54: 'Create Property - Managed',
};

export default tx => headings[tx.type_int] || tx.type;
