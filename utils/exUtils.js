const { divvyUtil } = require('./divvyUtil')

const tally = exceptions => {
  if (exceptions === undefined) return { sum: 0, divided: [] } // these are default values if no exceptions are declared

  const divided = exceptions.map(({ desc, total }) => {
    const [tag, members] = desc.replace(/\s/g, "").split('/')  // strip all whitespace
    return divvyUtil(total, members.split(','))
  })
  
  const sum = sumTotals(exceptions)

  return { sum, divided }
}

function sumTotals(arr) {
  return arr.reduce(function (a, b) {
     return a + b.total;
  }, 0);
}

module.exports = tally
