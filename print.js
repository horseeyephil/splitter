const { toPercentage } = require('./utils/divvyUtil')

module.exports = (resUser, resTag, resOwed, paymentTotal) => {
  console.log('================== Splitting Payments ==================\n')

  for(const member in resOwed) {
    const owedBy = resOwed[member]
    for(const name in owedBy) {
      const amount = owedBy[name]
      amount > 0 && console.log(
        `${name} owes ${member} $${amount}`
      )
    }
  }
  console.log('\n')

  for(const key in resUser) {
    const amount = resUser[key]
    console.log(`${key} accounted for $${amount} spent over this period.`)
  }

  console.log('\n')

  for(const key in resTag) {
    const amount = resTag[key]
    const percent = toPercentage(amount / paymentTotal)
    console.log(`${percent} of your purchases were tagged with: "${key}"`)
  }

  console.log('\n')
}