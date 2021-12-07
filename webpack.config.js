const path = require('path');
const del = require('del');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = (env, argv) => {

    const app = {
        mode: argv?.mode ||
            argv?.nodeEnv ||
            process.env?.NODE_ENV ||
            'production',

        isProduction: argv?.nodeEnv === 'production' || this.mode === 'production',

        baseDir: {
            public: path.resolve('./public'),
            scripts: path.resolve('./src', 'build', 'scripts'),
            styles: path.resolve('./src', 'build', 'styles'),
            templates: path.resolve('./src', 'build', 'templates'),
        }

    };

    (async () => {
        const deletedPaths = await del.sync([
            './public/*',
        ], { dryRun: false });

        if (deletedPaths.length > 0) {
            console.info('Files and directories that would be deleted:');
            console.info(deletedPaths.join('\n'));
        }
    })();

    console.log(app);

    return {
        context: __dirname,
        entry: {
            app: path.join(app.baseDir.scripts, 'index.js')
        },
        output: {
            // filename: 'app.js',
            // path: path.resolve(__dirname, 'public'),
            // sourcePrefix: ''

            path: app.baseDir.public,

            filename: (pathData) => {
                return pathData.chunk.name === 'app'
                    ? `js/[name].bundle.${app.isProduction ? 'min.js?[chunkhash]' : 'js'}`
                    : `js/[name]/app.[name].bundle.${app.isProduction ? 'min.js?[chunkhash]' : 'js'}`;
            },

            chunkFilename: `js/[id].js?${app.isProduction ? '[chunkhash]' : ''}`,
            assetModuleFilename: `img/[name].[ext]?${app.isProduction ? '[hash]' : ''}[query]`,
            pathinfo: true,
        },
        amd: {
            // Enable webpack-friendly use of require in Cesium
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                cesium: path.resolve(__dirname, cesiumSource)
            },
            mainFiles: ['index', 'Cesium']
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                use: ['url-loader']
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(app.baseDir.templates, 'app', 'index.html')
            }),
            // Copy Cesium Assets, Widgets, and Workers to a static directory
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.join(cesiumSource, cesiumWorkers), to: 'js/Workers' },
                    { from: path.join(cesiumSource, 'Assets'), to: 'js/Assets' },
                    { from: path.join(cesiumSource, 'Widgets'), to: 'js/Widgets' }
                ]
            }),
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify('')
            })
        ],
        mode: app.mode,
        devtool: app.isProduction ? false : 'source-map',
    };
};
