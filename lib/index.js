const consolere = require('./connector.browsers').default

if (!window.console) {
  window.console = {}
}

console.re = consolere
window.re = consolere
window.relog = consolere.log

module.exports = consolere
