var fs = require('fs-extra')
var path = require('path')
var mkdirp = require('mkdirp')

module.exports = {}

module.exports.FALLBACK_DIR_NAME = 'MAPEO_PRESETS_FALLBACK_DIR'

module.exports.unpack = function (root, cb) {
  // We need this because mapeo-default-settings does not have
  // a subdirectory, but styles in this repo does have a subdirectory for
  // each default style.
  var presetRoot = path.join(root, 'presets', module.exports.FALLBACK_DIR_NAME)
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

module.exports.unpackIfNew = function (root, cb) {
  //  The default settings should be unpacked if they are new, regardless if
  //  this mapeo-styles module has bumped versions or has not changed.
  var moduleVersion = require(path.join('mapeo-default-settings', 'package.json')).version

  // Bail immediately if version file exists and is set to the current module version.
  var versionPath = path.join(root, 'version')
  if (fs.existsSync(versionPath)) {
    var fsVersion = fs.readFileSync(versionPath, 'utf8')
    if (fsVersion === moduleVersion) return process.nextTick(cb, null, false)
  }

  // Unpack presets & styles
  module.exports.unpack(root, function (err) {
    if (err) return cb(err)

    // Write version file
    fs.writeFile(path.join(root, 'version'), moduleVersion, 'utf8', function (err) {
      cb(err, true)
    })
  })
}
