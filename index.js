const yaml = require('js-yaml');
const fs   = require('fs');
const mergeTotals = require('./utils/mergeUtil')
const { divvyUtil, membersToKeys, sumKeys, toPercentage, omitOneUtil, owedMerge, processDebts } = require('./utils/divvyUtil')
const pullProp = require('./utils/propUtil')
const tallyExceptions = require('./utils/exUtils')
const printResults = require('./print')

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

  const owedTotals = omitOneUtil(payment.paidBy, totalsByUser)

  // get totals by tags 
  const tagsDefault = payment.tags || ''
  const tags = tagsDefault.replace(/\s/g, "").split(',')
  const totalsByTag = membersToKeys(tags, payment.total)

  return { totalsByUser, totalsByTag, owedTotals }
})

const totalsByUser = pullProp(paymentResults, 'totalsByUser')
const totalsByTag = pullProp(paymentResults, 'totalsByTag')
const owedTotals = pullProp(paymentResults, 'owedTotals')
const resUser = mergeTotals(...totalsByUser)
const resTag = mergeTotals(...totalsByTag)

const paymentTotal = sumKeys(resUser)

const resOwed = owedMerge(...owedTotals)
processDebts(resOwed) // mutating calculation

printResults(resUser, resTag, resOwed, paymentTotal)