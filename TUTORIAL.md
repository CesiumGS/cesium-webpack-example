# CesiumJS and Webpack

[Webpack](https://webpack.js.org/) is a popular and powerful tool for bundling JavaScript modules. It allows developers to structure their code and assets in an intuitive way and to load different kinds of files as needed with simple `require` statements. When building, it will trace code dependencies and pack these modules into one or more bundles that are loaded by the web browser.

In this tutorial, we will build a simple web app from the ground up using webpack, and then cover the steps to integrate the [Cesium npm module](https://www.npmjs.com/package/cesium). This is a good place to start if you’d like to use CesiumJS to develop a web application. If you’re new to Cesium and are looking to learn to build your first sample app, take a look at our [Getting Started Tutorial](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/).

## Prerequisites
- A basic understanding of the command line, JavaScript, and web development.
- An IDE or code editor. Developers on the Cesium team members use Visual Studio Code, but a minimal code editor such as Sublime Text will also work.
- Node.js installed. We recommend using the latest LTS version.

## Initialize an app with npm

1. Create a new directory for your app.
2. Open a console window and navigate to the directory.
3. Run `npm init` and enter in the requested details about your application. If you are unsure about any prompts, press `Enter` to use the default value. You can modify these details at any point in the `package.json` file that `npm init` creates.

## Create the app code

1. Create a `src` directory for your app code. When we build the app, webpack will automatically produce distribution files in a directory named `dist`.
2. Create the files `index.html` and `index.js` in the `src` directory added in step 1.
3. Add the following code to `src/index.html`
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
```
This will serve as a boilerplate HTML page to get us started.
4. Add the following code to `src/index.js`
```
console.log('Hello World!');
```
This will serve as our boilerplate JavaScript code.

## Install and configure webpack
1. Install webpack by running `npm install --save-dev webpack`. The files `package-lock.json` and `package.json` should appear in your main directory. You should also see a new folder in your main directory named `node_modules`.
2. Create the file `webpack.config.js` in your main directory. 
3. Define our webpack [configuration](https://webpack.js.org/concepts/configuration/) object by adding the following code to `webpack.config.js`
```
const path = require('path');

const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
```
In this code, `context` specifies the base path for your files. `entry` is used to specify bundles and `src/index.js` is our entry point. Webpack will output the bundle `app.js` to the `dist` folder, which webpack will create at runtime.
4. In order to load CSS and other asset files with webpack, you'll need to install some [loaders](https://webpack.js.org/concepts/#loaders). Install the [style-loader](https://webpack.js.org/loaders/style-loader/#src/components/Sidebar/Sidebar.jsx), [css-loader](https://webpack.js.org/loaders/css-loader/), and [url-loader](https://webpack.js.org/loaders/url-loader/) using `npm install --save-dev style-loader css-loader url-loader`. Feel free to install any other loaders you may need in the future. Loaders can be installed at any point during this process.
5. Update `webpack.config.js` by adding two `module.rules`. The first rule will support CSS files and the second rule will support other static files. For each rule, define `test` for the types of files to load and `use` to specify the list of loaders. Your `webpack.config.js` should resemble the following:
```
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    }
};
```
6. To define `index.html` and inject our bundle into that page, we will be using a webpack [plugin](https://webpack.js.org/concepts/#plugins) called [html-webpack-plugin](https://webpack.js.org/concepts/#plugins). Use the command `npm install --save-dev html-webpack-plugin` to install this plugin.
7. Require html-webpack-plugin in `webpack.config.js` by adding it to the `plugins` section. Next, pass `src/index.html` as our `template`. Finally, specify the mode option for webpack by adding `mode: 'development'` to `webpack.config.js`. Your `webpack.config.js` should now resemble the following:
```
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    mode: 'development'
};
```

## Bundle the app
1. In `package.json`, define the scripts that we can call with `npm`. Add the `build` command.
```
  "scripts": {
    "build": "node_modules/.bin/webpack --config webpack.config.js"
  }
```

If done correctly, `package.json` should now resemble the code below. Note that this json file will vary based on your selections in step 3 of the **Initialize an app with npm** section.
```
{
  "name": "cesiumjs-webpack-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack --config webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "style-loader": "^3.2.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.50.0"
  }
}
```

2. Run the command `npm run build`. Install CLI for webpack if necessary. 
3. Ensure that there are no errors and your output looks something like:
```
$ npm run build

> cesiumjs-webpack-tutorial@1.0.0 build
> node_modules/.bin/webpack --config webpack.config.js

asset app.js 1.22 KiB [emitted] (name: app)
asset index.html 376 bytes [emitted]
./src/index.js 28 bytes [built] [code generated]
webpack 5.50.0 compiled successfully in 86 ms
```
Please note that the `app.js` bundle and `index.html` file should be added to the `dist` folder.

## Run the development server
1. We will be using a [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) to serve a development build and see our application in action. Run `npm install --save-dev webpack-dev-server`.
2. Add a `start` script to `package.json`. This script will run the development server. Be sure to set the config file via the `--config` flag, and use the `--open` flag to open the application in a a browser upon execution of the command. `package.json` should look something like:
```
{
  "name": "cesiumjs-webpack-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack --config webpack.config.js",
    "start": "node_modules/.bin/webpack serve --config webpack.config.js --open"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "style-loader": "^3.2.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.50.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  }
}
```
3. Run `npm start` and open [http://localhost:8080/](http://localhost:8080/) in a web browser.
4. You should now see the text "Hello World!" on the page.

![South San Francisco](./screenshots/hw.png)

## Add CesiumJS to a webpack app

CesiumJS is a large and complex library. In additional to JavaScript modules, it includes static assets such as CSS, image, and json files. It also includes web worker files to perform intensive calculations in separate threads. Unlike traditional npm modules, CesiumJS does not define an entry point because of the diverse ways in which the library is used. We’ll need to configure some additional options to use it with webpack.

First, define where CesiumJS is. This tutorial uses the source code, so webpack can include individual models and trace the dependencies. Alternatively, you can use the built (minified or unminified) version of CesiumJS. However, the modules are already combined and optimized, which gives us less flexibility.

## Install CesiumJS
1. Install the [Cesium](https://www.npmjs.com/package/cesium) module from npm using the command `npm install --save-dev cesium`. Install the [CopyWebpackPluigin](https://webpack.js.org/plugins/copy-webpack-plugin/) module from npm using the command `npm install copy-webpack-plugin --save-dev`.
2. Update `sourcePrefix` to tell CesiumJS that the version of AMD webpack uses to evaluate `require` statements is not compliant with the standard `toUrl` function. In addition, add a `cesium` alias so we can reference it in our app code. After adding these changes, `webpack.config.js` should look like
```
// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopywebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    resolve: {
        alias: {
            // CesiumJS module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    mode: 'development',
};
```

## Manage CesiumJS static files
1. Now, we must make sure the static CesiumJS asset, widget, and web worker files are served and loaded correctly. You will use `copy-webpack-plugin` to copy static files to the `dist` directory as part of the build process. To do this, run the command `npm install --save-dev copy-webpack-plugin` and update the plugins array in `webpack.config.js`. Your `webpack.config.js` should now look like:
```
// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopywebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    resolve: {
        alias: {
            // CesiumJS module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopywebpackPlugin({ 
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
            ]
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ],
    mode: 'development',
};
```

## Incorporate CesiumJS
1. Updated `index.js` with CesiumJS starter code:
```
import { Ion, Viewer, createWorldTerrain, createOsmBuildings, Cartesian3, Math } from "../node_modules/cesium"
import "../node_modules/cesium/Build/Cesium/Widgets/widgets.css";

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer('cesiumContainer', {
  terrainProvider: createWorldTerrain()
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
viewer.scene.primitives.add(createOsmBuildings());   

// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
  destination : Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  orientation : {
    heading : Math.toRadians(0.0),
    pitch : Math.toRadians(-15.0),
  }
});
```
This code initializes the Cesium Viewer, adds Cesium OSM Buildings to the terrain, and moves the `Camera` to San Francisco. 
2. Update `index.html` with the CesiumContainer
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
  <div id="cesiumContainer"></div>
</body>
</html>
```
3. Run the command `npm run build`. Ensure that the project is built correctly.
4. Run `npm start` and open http://localhost:8080/ in a web browser to see the CesiumJS viewer.

![South San Francisco](./screenshots/ssf2.png)

Copy and paste your favorite Sandcastle example. Need inspiration? Try the [Particle System Fireworks](https://sandcastle.cesium.com/?src=Particle%20System%20Fireworks.html) demo.

![South San Francisco](./screenshots/fw.png)

# Advanced webpack configurations and Resources

Webpack can be leveraged in many more ways to increase performance, decrease your bundle size, and perform additional or complex build steps. Here we’ll discuss a few configuration options relevant to using the CesiumJS library.

## Enable source maps

Source maps allow webpack to trace errors back to the original content. They offer more or less detailed debugging information in exchange for compiling speed. We recommend setting `devtool` to the 'eval' option in `webpack.config.js`

` devtool: 'eval' `

Please note that source maps are not recommended for production code.

## Additional Resources

The official [cesium-webpack-example repository](https://github.com/CesiumGS/cesium-webpack-example) contains the minimal webpack configuration, the hello world code covered in this tutorial, and instructions for optional code configurations.

For a tour of CesiumJS feature to include in your new app, see the Cesium Workshop Tutorial.

Explore demos in Sandcastle and see the CesiumJS Documentation.

Want to learn more about webpack? Take a look at webpack [Concepts](https://webpack.js.org/concepts/), or dive into the [webpack documentation](https://webpack.js.org/configuration/).
