# cesium-webpack-example

A minimal recommended setup for an applications using [Cesium](https://cesium.com) with [Webpack](https://webpack.js.org/concepts/).

[![Build Status](https://travis-ci.org/AnalyticalGraphicsInc/cesium-webpack-example.svg?branch=using-custom-loader)](https://travis-ci.org/AnalyticalGraphicsInc/cesium-webpack-example)

### Running this application

	npm install
	npm start

Navigate to `localhost:8080`.

##### Available scripts

* `npm start` - Runs a webpack build with `webpack.config.js` and starts a development server
* `npm run build` - Runs a webpack build with `webpack.config.js`
* `npm run release` - Runs an optimized webpack build with `webpack.release.config.js`
* `npm run serve-release` - Runs an optimized webpack build with `webpack.release.config.js` and starts a development server

##### Configurations

We've included two webpack configuration files in this repository. `webpack.config.js` contains configuration for development while `webpack.release.config.js` contains an optimized configuration for production use.

### Requiring Cesium in your application

We recommend using Cesium as an [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) module, via the `import` keyword.

#### Import named modules from Cesium

	import { Color } from 'cesium';
	var c = Color.fromRandom();

#### Import Cesium static asset files
	
	import "cesium/Build/Cesium/Widgets/widgets.css";

### Treeshaking

`webpack.release.config.js` enables tree-shaking of CesiumJS modules so that unused modules are not included in the production bundle. See Webpack's [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) documentation for more details.

##### Removing pragmas

To remove pragmas such as a traditional Cesium release build, use the [`strip-pragma-loader`](https://www.npmjs.com/package/strip-pragma-loader).

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

## Contributions

Pull requests are appreciated. Please use the same [Contributor License Agreement (CLA)](https://github.com/AnalyticalGraphicsInc/cesium/blob/master/CONTRIBUTING.md) used for [Cesium](https://cesiumjs.org/).

---

Developed by the Cesium team.

<a href="https://cesium.com/"><img alt="Cesium" src="doc/cesium.png" /></a>
