const mergeTotals = require('./mergeUtil')

// return an object with keys representing members pointing to their share
const membersToKeys = (members, initial=0) => {
  const obj = {}
  for(const member of members) {
    obj[member] = initial
  }
  return obj
}

const divvyUtil = (total, users = []) => {
  const portion = total / users.length
  return membersToKeys(users, portion)
}

const sumKeys = obj => Object.values(obj).reduce(
  (a, b) => a + b
)

const toPercentage = val => Math.floor(val * 100) + '%'

const omitOneUtil = (name, obj) => {
  const { [name] : omit, ...rest } = obj
  return { name, owedBy: rest }
}

const owedMerge = (...debtObjects) => {
  return debtObjects.reduce((accum, b) => {
    const { name, owedBy } = b
    const target = accum[name]

    const nextObject = !target ? owedBy
      : mergeTotals(target, owedBy)

    return { ...accum, [name] : nextObject }
  }, {})
}

const mutatingProcess = (topName, topObj, childName, childObj) => {
  
  const difference = topObj[childName] - childObj[topName]

  if(difference > 0) {
    childObj[topName] = 0
    topObj[childName] = difference
  } else {
    topObj[childName] = 0
    childObj[topName] = Math.abs(difference)
  }
}

const processDebts = obj => {
  const members = Object.keys(obj)
  members.forEach(member => {
    const owedBy = obj[member]
    for(const name in owedBy){
      const crossRef = obj[name]
      crossRef && crossRef[member] && crossRef[member] > 0 &&
        mutatingProcess(member, owedBy, name, crossRef)
    }
  })
  return obj
}

module.exports = {
  divvyUtil,
  membersToKeys,
  sumKeys,
  toPercentage,
  omitOneUtil,
  owedMerge,
  processDebts
}