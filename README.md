# mapeo-styles
> Default styles & tiles for mapeo backgrounds

Static resources for Mapeo Mobile & Desktop.

## API

```js
var styles = require('mapeo-styles')
```

### styles.unpack(root, cb)

Unpacks the `styles/` and `presets/` directories to the file path `root`, and calls `cb` upon completion or error.

## Notes

- 2018-06-22: For mobile platforms, this module is probably only useful for automatic loading of test data or very small data sets. With enough tile data (100s of megabytes) it may not fit into a reasonably sized app image.

## License

ISC
