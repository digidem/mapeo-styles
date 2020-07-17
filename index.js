var fs = require('fs-extra')
var path = require('path')
var mkdirp = require('mkdirp')

module.exports = {}

module.exports.unpack = function (root, cb) {
  // We need this because mapeo-default-settings does not have
  // a subdirectory, but styles in this repo does have a subdirectory for
  // each default style.
  var presetRoot = path.join(root, 'presets', 'MAPEO_DEFAULT_SETTINGS_FALLBACK')
  var styleRoot = path.join(root, 'styles')
  mkdirp(presetRoot, function (err) {
    if (err) return cb(err)
    mkdirp(styleRoot, function (err) {
      if (err) return cb(err)
      fs.copy(path.join(__dirname, 'node_modules', 'mapeo-default-settings', 'dist'), presetRoot, function (err) {
        if (err) return cb(err)
        fs.copy(path.join(__dirname, 'styles'), styleRoot, cb)
      })
    })
  })
}
