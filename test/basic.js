var test = require('tape')
var styles = require('..')
var tmpdir = require('os').tmpdir()
var mkdirp = require('mkdirp')
var path = require('path')
var fs = require('fs')

function mktmp () {
  var dir = path.join(tmpdir, 'tape-' + String(Math.random()).substring(2, 9))
  mkdirp.sync(dir)
  return dir
}

test('fresh unpack', function (t) {
  var dir = mktmp()
  styles.unpack(dir, function (err) {
    t.error(err)
    t.equals(fs.readdirSync(dir).length, 2, '2 files in output dir')
    t.ok(fs.existsSync(path.join(dir, 'styles')), 'styles exists')
    t.ok(fs.existsSync(path.join(dir, 'presets')), 'presets exists')
    t.end()
  })
})
