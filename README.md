# cesium-webpack-example

The minimal recommended setup for an application using [Cesium](https://cesiumjs.org/) with [Webpack](https://webpack.js.org/concepts/).

### Running this application

	npm install
	npm start

##### Available Scripts

* `npm start` - Runs a webpack build with `webpack.config.js` and starts a development server
* `npm run build` - Runs a webpack build with `webpack.config.js`
* `npm run release` - Runs an optimized webpack build with `release.webpack.congif.js`

### Requiring Cesium in your application
 
##### CommonJS Require

 	var Cesium = require('cesium/Cesium');
 	var viewer = new Cesium.Viewer('cesiumContainer');

##### ES6 Style Import

 	import Cesium from 'cesium/Cesium';
 
##### Require Cesium static asset files

 	require('cesium/Widgets/widgets.css');

 	require('cesium/Assets/Textures/pin.svg');

##### Require specific modules from Cesium

	var Color = require('cesium/Core/Color');
	var white = new Color.WHITE;

### Using another Cesium location

We've set the cesium Source location to be what's included with the cesium npm module.

	var cesiumSource = path.resolve(__dirname, 'node_modules/cesium/Source');

However, you may want to use a different version of cesium, like if you've cloned the cesium source code directly. Just set the cesium location to the appropriate path.

	var cesiumSource = path.resolve(__dirname, '../path/to/cesium/Source');

You could even point the cesium to a branch in GitHub or another url in your `package.json` file.

### Source Maps

Enable source maps in development for easier debugging. They are only available when using the development server. There are many [options](https://webpack.js.org/configuration/devtool/). Suggested would be `eval` for fast build and rebuilt time and allowing evaluation of the webpack generated code.

Source maps can be enabled with the following config object:

	devTool: `eval`

### Performance Configurations 

The following optimizations are recommended for building for production and will increase performance and result in smaller bundle sizes.

For best performance, make sure you are requiring individual modules from Cesium instead of the global Cesium object. Additionally, only copy the static assets that your app requires with the `CopyWebpackPlugin` by taking advantage of the [pattern options](https://github.com/webpack-contrib/copy-webpack-plugin#pattern-properties).

##### Removing pragmas

To remove pragmas like a traditional cesium release build, use the [`strip-pragma-loader`](https://www.npmjs.com/package/strip-pragma-loader).

Install the plugin with npm,

```
npm install strip-pragma-loader --save-dev
```

and include the loader in `module.rules` with `debug` set to `false`.

```
rules: [{
	test: /\.js$/,
	enforce: 'pre',
	include: path.resolve(__dirname, cesiumSource),
	use: [{
		loader: 'strip-pragma-loader',
		options: {
		    pragmas: {
				debug: false
			}
		}
	}]
}]
```

##### Uglify and Minify

Compress the final size of the bundle by minifying included JavaScript using UglifyJS with the [`uglifyjs-webpack-plugin`](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/).

Install the plugin,

```
npm install uglifyjs-webpack-plugin --save-dev
```

require it,

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
```

and include it in the list of plugins.

```
plugins: [
	new UglifyJsPlugin()
]
```

Additionally, minify the CSS files when loaded with the `css-loader`

```
module: {
	rules: [
	{
		test: /\.css$/,
		use: [ 
			'style-loader', 
			{
				loader: 'css-loader',
				options: {
					minimize: true
				}
			}
		]
	},
}
```