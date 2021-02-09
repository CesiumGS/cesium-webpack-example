const path = require('path');

// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
    mode: 'production',
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        // Resolve node module use of fs
        global: false,
        __filename: false,
        __dirname: false
    },
    resolve: {
        mainFields: ['module', 'main']
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', { loader: 'css-loader' }],
            sideEffects: true
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            type:'asset/inline'
        }, {
            // Remove pragmas
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'node_modules/cesium/Source'),
            sideEffects: false,
            use: [{
                loader: 'strip-pragma-loader',
                options: {
                    pragmas: {
                        debug: false
                    }
                }
            }]
        }]
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
            ],
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ]
}];