# cesium-webpack-example

A minimal recommended setup for an applications using [Cesium](https://cesium.com) with [Webpack](https://webpack.js.org/).

Jump to the [Webpack 5](./webpack-5/) directory for the most up to date example. We also provide a [Webpack 4](./webpack-4/) example if you are still on the older version.

## Running this application

Please switch to the corresponding sub-directory for the version of Webpack you're using to see how to run this example application

- [Webpack 4 commands](./webpack-4/README.md#running-this-application)
- [Webpack 5 commands](./webpack-5/README.md#running-this-application)

## Requiring Cesium in your application

Regardless which version of Webpack you're using you should be able to use CesiumJS in the same way.

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

CesiumJS requires a few static files to be hosted on your server, like web workers and SVG icons. These examples are set up to copy these directories already if you install the whole `cesium` package.

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

Even though this project has nested package.json projects we are not using `npm` workspaces to preserve a more "stand-alone" nature for each example. This allows other developers to copy the sub-directory and use it as-is for a new project.

Make sure you run `npm install` in the root directory to set up linting and git commit hooks

### Available scripts

The top level scripts in the root directory are mostly for development of this repo itself:

- `npm run eslint`, `npm run prettier`, `npm run prettier-check` - Lint this project to maintain code style

There are also some shortcuts to run the code for each Webpack version. These are just for convenience and behave the same as changing to the sub-directories and running the commands there

- `npm run start-4` - Run the Webpack 4 example
- `npm run build-4` - Build the Webpack 4 example
- `npm run start-5` - Run the Webpack 5 example
- `npm run build-5` - Build the Webpack 5 example

---

Developed by the Cesium team.
