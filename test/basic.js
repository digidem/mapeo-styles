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

test('versioned unpack (only 1 copy occurs)', function (t) {
  var dir = mktmp()
  styles.unpackIfNew(dir, function (err, didWrite) {
    t.error(err)
    t.ok(didWrite, 'new data written')
    t.equals(fs.readdirSync(dir).length, 3, '3 files in output dir')
    t.ok(fs.existsSync(path.join(dir, 'styles')), 'styles exists')
    t.ok(fs.existsSync(path.join(dir, 'presets')), 'presets exists')
    t.ok(fs.existsSync(path.join(dir, 'version')), 'version file exists')
    styles.unpackIfNew(dir, function (err, didWrite) {
      t.error(err)
      t.notOk(didWrite, 'new data NOT written')

      // HACK: fudge the package version in memory
      require('mapeo-default-settings/package.json').version = '10000.0.0'

      styles.unpackIfNew(dir, function (err, didWrite) {
        t.error(err)
        t.ok(didWrite, 'new data written')
        t.equals(fs.readFileSync(path.join(dir, 'version'), 'utf8'), '10000.0.0')
        t.end()
      })
    })
  })
})
