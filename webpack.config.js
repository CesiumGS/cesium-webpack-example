const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// The path to the ceisum source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = [{
	context: __dirname,
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),

		// Needed by Cesium for multiline strings
		sourcePrefix: '' 
	},
	amd: {
		// Enable webpack-friendly use of require in cesium
		toUrlUndefined: true
	},
	node: {
		// Resolve node module use of fs
		fs: "empty"
    },
	resolve: {
		alias: {
			// Cesium module name
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
    	new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
    	new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
    	new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ]),
    	new webpack.DefinePlugin({
    		// Define relative base path in cesium for loading assets
  			CESIUM_BASE_URL: JSON.stringify('')
		})
    ],

	// development server options
	devServer: {
		contentBase: './dist'
	}
}];