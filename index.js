var fs = require('fs')
var ncp = require('ncp')
var path = require('path')
var mkdirp = require('mkdirp')

module.exports = {}

module.exports.unpack = function (root, cb) {
  var presetRoot = path.join(root, 'presets')
  var styleRoot = path.join(root, 'styles')
  mkdirp(presetRoot, function (err) {
    if (err) return cb(err)
    mkdirp(styleRoot, function (err) {
      if (err) return cb(err)
      ncp(path.join(__dirname, 'presets'), presetRoot, function (err) {
        if (err) return cb(err)
        ncp(path.join(__dirname, 'styles'), styleRoot, cb)
      })
    })
  })
}

module.exports.unpackIfNew = function (root, cb) {
  var moduleVersion = require(path.join(__dirname, 'package.json')).version

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
