const pullProp = (list, prop) => {
  return list.map(each => each[prop])
}

module.exports = pullProp