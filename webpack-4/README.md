# cesium-webpack-example

A minimal recommended setup for an applications using [Cesium](https://cesium.com) with [Webpack 4](https://v4.webpack.js.org/concepts/).

## Running this application

```sh
npm install
npm start
# for the built version
npm run build
npm run start:built
```

Navigate to `localhost:8080`.

### Available scripts

- `npm start` - Runs a webpack build with `webpack.config.js` and starts a development server at `localhost:8080`
- `npm run build` - Runs a webpack build with `webpack.config.js`
- `npm run start:built` - Start a small static server using `http-server` to demonstrate hosting the built version

## Requiring Cesium in your application

We recommend [importing named exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) from the Cesium ES module, via the `import` keyword. This allows webpack to [tree shake](https://webpack.js.org/guides/tree-shaking/) your application automatically.

### Import named modules from Cesium

```js
import { Color } from "cesium";
var c = Color.fromRandom();
```

### Import Cesium static asset files

```js
import "cesium/Build/Cesium/Widgets/widgets.css";
```

## Cesium sub-packages

CesiumJS requires a few static files to be hosted on your server, like web workers and SVG icons. This example is set up to copy these directories already if you install the whole `cesium` package.

```js
new CopyWebpackPlugin({
  patterns: [
    { from: path.join(cesiumSource, "Workers"), to: `${cesiumBaseUrl}/Workers`, },
    { from: path.join(cesiumSource, "ThirdParty"), to: `${cesiumBaseUrl}/ThirdParty`, },
    { from: path.join(cesiumSource, "Assets"), to: `${cesiumBaseUrl}/Assets`, },
    { from: path.join(cesiumSource, "Widgets"), to: `${cesiumBaseUrl}/Widgets`, },
  ],
}),
```

However if you only install `@cesium/engine` then you should change the paths in `webpack.config.js` to the ones below:

```js
new CopyWebpackPlugin({
  patterns: [
    { from: 'node_modules/@cesium/engine/Build/Workers', to: `${cesiumBaseUrl}/Workers` },
    { from: 'node_modules/@cesium/engine/Build/ThirdParty', to: `${cesiumBaseUrl}/ThirdParty` },
    { from: 'node_modules/@cesium/engine/Source/Assets', to: `${cesiumBaseUrl}/Assets` },
  ],
}),
```

## Removing pragmas

To remove pragmas such as a traditional Cesium release build, use the [`strip-pragma-loader`](https://www.npmjs.com/package/strip-pragma-loader).

Install the plugin with npm,

```sh
npm install strip-pragma-loader --save-dev
```

and include the loader in `module.rules` with `debug` set to `false`.

```js
rules: [
  {
    test: /\.js$/,
    enforce: "pre",
    include: path.resolve(__dirname, cesiumSource),
    use: [
      {
        loader: "strip-pragma-loader",
        options: {
          pragmas: {
            debug: false,
          },
        },
      },
    ],
  },
];
```

## Contributions

Pull requests are appreciated. Please use the same [Contributor License Agreement (CLA)](https://github.com/CesiumGS/cesium/blob/master/CONTRIBUTING.md) used for [Cesium](https://cesium.com/).

---

Developed by the Cesium team.
