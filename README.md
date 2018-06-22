# mapeo-styles
> Default styles & tiles for mapeo backgrounds

Static resources for Mapeo Mobile & Desktop.

## API

```js
var styles = require('mapeo-styles')
```

### styles.unpack(root, cb)

Unpacks the `styles/` and `presets/` directories to the file path `root`, and calls `cb` upon completion or error.

### styles.unpackIfNew(root, cb)

The same as `styles.unpack`, except a `version` file will also be written to track what version of the style/preset data was unpacked. This lets the unpacking step be nearly zero-cost when the version of the data has not been changed.

## License

ISC
