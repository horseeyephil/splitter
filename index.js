const yaml = require('js-yaml');
const fs   = require('fs');
const mergeTotals = require('./utils/mergeUtil')
const { divvyUtil, membersToKeys, sumKeys, toPercentage } = require('./utils/divvyUtil')
const pullProp = require('./utils/propUtil')
const tallyExceptions = require('./utils/exUtils')

const payments = yaml.safeLoad(fs.readFileSync('period.yml', 'utf8'));
const { users, aliases, defaultShare } = yaml.safeLoad(fs.readFileSync('settings.yml', 'utf8'));

const paymentResults = payments.map(payment => {
  const { sum: sumOfExceptions, divided: exceptionTotals } = tallyExceptions(payment.ex) // td - rename keys

  const adjustedTotal = payment.total - sumOfExceptions // remove the exceptions

  const members = payment.members === undefined ? defaultShare 
    : payment.members.replace(/\s/g, "").split(',') // array-ify

  if(!members) throw new Error('No members specified to split payment')
  const mainTotal = divvyUtil(adjustedTotal, members)
  const totalsByUser = mergeTotals(mainTotal, ...exceptionTotals)

  // get totals by tags 
  const tagsDefault = payment.tags || ''
  const tags = tagsDefault.replace(/\s/g, "").split(',')
  const totalsByTag = membersToKeys(tags, payment.total)

  return { totalsByUser, totalsByTag }
})

const totalsByUser = pullProp(paymentResults, 'totalsByUser')
const totalsByTag = pullProp(paymentResults, 'totalsByTag')
const resUser = mergeTotals(...totalsByUser)
const resTag = mergeTotals(...totalsByTag)

const paymentTotal = sumKeys(resUser)

// print

console.log('================== Splitting Payments ==================\n')

for(const key in resUser) {
  const amount = resUser[key]
  console.log(`${key} owes $${amount}`)
}

console.log('\n')

for(const key in resTag) {
  const amount = resTag[key]
  const percent = toPercentage(amount / paymentTotal)
  console.log(`${percent} of your purchases were tagged with: "${key}"`)
}

console.log('\n')

