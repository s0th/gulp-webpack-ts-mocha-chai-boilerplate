/*
 * @title Webpack
 * @description Webpack configuration file
 */


/*********************************************************************************
 1. DEPENDENCIES
 *********************************************************************************/

import sharedPaths from '../shared/paths.js';
import path        from 'path';
import webpack     from 'webpack';


/*********************************************************************************
 2. EXPORTS
 *********************************************************************************/

export default (() => {

    const vendorChunkFilename = 'libs';

    let config = {
        output: {
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts']
        },        
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'tslint-loader',
                            options: {
                                enforce: 'pre',
                                project: 'tsconfig.json',
                                configFile: 'tslint.json',
                                emitErrors: true,
                                failOnHint: false,
                                typeCheck: true                        
                            }
                        },
                        {
                            loader: 'ts-loader'                            
                        }
                    ]
                }
            ]
        },
        plugins: []
    };

    if (process.env.GULP_UGLIFY === 'true') {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            comments: false
        }));
    }

    // Development extras
    if (process.env.GULP_WEBPACK_DEV === 'true') {
        //config.debug = true;
        config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: `${vendorChunkFilename}`,
            minChunks: function (module, count) {
                return module.resource && module.resource.indexOf(path.resolve(sharedPaths.srcDir)) === -1;
            }
        }));
        config.plugins.push(new webpack.SourceMapDevToolPlugin({
            exclude: `${vendorChunkFilename}.js`
        }));
    }

    return config;

})();
