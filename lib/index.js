const consolere = require('./connector.browsers').default

if (!window.console) {
  window.console = {}
}

console.re = consolere
console.relog = consolere

module.exports = consolere
