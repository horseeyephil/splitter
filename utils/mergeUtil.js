// merge util takes a list of objects with key-number value pairs and returns one object with its keys as the sums of those keyed values

const mergeIndividual = (a,b) => {
  const keys= Object.keys(b)
  for(key of keys) {
    a[key] = a[key] || 0
    a[key] += b[key]
  }
  return a
}

const mergeTotals = (...totalObjs) => totalObjs.reduce(mergeIndividual)

// experimental  
// const mergeTotals = (mapCB) => 
//   (...totalObjs) => totalObjs.reduce(mapCB(mergeIndividual), {})

module.exports = mergeTotals