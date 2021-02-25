const consolere = require('./connector.browsers').default

if (!window.console) {
  window.console = {}
}

if (!window.relog) {
  window.relog = {}
}

console.re = consolere
console.relog = consolere

module.exports = consolere
