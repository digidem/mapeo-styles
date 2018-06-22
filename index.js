var fs = require('fs')
var ncp = require('ncp')
var path = require('path')

module.exports = {}

module.exports.unpack = function (root, cb) {
  ncp(path.join(__dirname, 'presets'), path.join(root, 'presets'), function (err) {
    if (err) return cb(err)
    ncp(path.join(__dirname, 'styles'), path.join(root, 'styles'), cb)
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
