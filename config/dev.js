let config = {}
try {
  config = require('./projectConfig').dev
} catch (_) {}

module.exports = {
  env: {
    NODE_ENV: '"development"',
    ...config
  },
  defineConstants: {},
  mini: {},
  h5: {}
}
