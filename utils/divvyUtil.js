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

module.exports = {
  divvyUtil,
  membersToKeys,
  sumKeys,
  toPercentage
}