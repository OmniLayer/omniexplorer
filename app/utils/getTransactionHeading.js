const headings = {
  51: 'Create Property - Crowdsale',
  54: 'Create Property - Managed',
};

const getAction = action => (action ? ` - ${action}` : '');
export default tx => headings[tx.type_int] || tx.type + getAction(tx.action);
