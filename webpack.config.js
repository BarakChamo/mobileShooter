var webpack           = require('webpack'),
    path              = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        // Compiler ID
        name: 'desktop',
        
        // Makes sure errors in console map to the correct file and line number
        devtool: 'eval',

        // Define entry points
        entry: {
            // App entry point
            app: [
                // For hot style updates
                'webpack/hot/dev-server', 

                // The script refreshing the browser on none hot updates
                'webpack-dev-server/client?http://localhost:8080', 

                // Main app
                path.resolve(__dirname, 'app', 'desktop.js')
            ],

            // Common vendor packages
            vendor: [
                'jquery', 
                'underscore'
            ]
        },
        
        // Set modules output
        output: {
            path: path.resolve(__dirname, 'public', 'dist'),
            publicPath: '/dist/',
            filename: 'desktop.js'
        },
        
        // Define module loaders
        module: {
            loaders: [
                {   // Worker Loader
                    test: /\.w\.jsx?$/, 
                    exclude: /(node_modules|bower_components)/, 
                    loader: 'webworker!babel?optional[]=runtime&stage=0'
                },
                
                {   // ES6 Loader
                    test: /\.jsx?$/, 
                    exclude: /(node_modules|bower_components)/, 
                    loader: 'babel?optional[]=runtime&stage=0'
                },

                {   // JADE Loader
                    test: /\.jade$/, 
                    loader: 'jade'
                },

                {   // JSON Loader
                    test: /\.json$/, 
                    loader: 'json'
                },

                {   // CSS Loader
                    test: /\.css$/,  
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
                },
                
                {   // LESS Loader
                    test: /\.less$/, 
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                },

                {   // SASS Loader
                    test: /\.scss$/, 
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                }
            ]
        },

        // Setting up resolution
        resolve: {
            modulesDirectories: [
                'node_modules',
                'resources',
                'app'
            ]
        },

        // Set up plugins
        plugins: [
            // Environment globals
            new webpack.DefinePlugin({
                ENV: JSON.stringify('desktop')
            }),
            
            // Define module globals
            new webpack.ProvidePlugin({
                '_': 'underscore',
                '$': 'jquery'
            }),

            // Deduplication
            new webpack.optimize.DedupePlugin(),


            // Chunk out vendor code
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.desktop.js'),

            // Extract CSS files
            new ExtractTextPlugin("desktop.css"),

            // Hot module replacement
            new webpack.HotModuleReplacementPlugin()
        ]
    },
    {
        // Compiler ID
        name: 'mobile',
        
        // Makes sure errors in console map to the correct file and line number
        devtool: 'eval',

        // Define entry points
        entry: {
            // App entry point
            app: [
                // For hot style updates
                'webpack/hot/dev-server', 

                // The script refreshing the browser on none hot updates
                'webpack-dev-server/client?http://localhost:8080', 

                // Main app
                path.resolve(__dirname, 'app', 'mobile.js')
            ],

            // Common vendor packages
            vendor: [
                'jquery', 
                'underscore'
            ]
        },
        
        // Set modules output
        output: {
            path: path.resolve(__dirname, 'public', 'dist'),
            publicPath: '/dist/',
            filename: 'mobile.js'
        },
        
        // Define module loaders
        module: {
            loaders: [
                {   // Worker Loader
                    test: /\.w\.jsx?$/, 
                    exclude: /(node_modules|bower_components)/, 
                    loader: 'webworker!babel?optional[]=runtime&stage=0'
                },
                
                {   // ES6 Loader
                    test: /\.jsx?$/, 
                    exclude: /(node_modules|bower_components)/, 
                    loader: 'babel?optional[]=runtime&stage=0'
                },

                {   // JADE Loader
                    test: /\.jade$/, 
                    loader: 'jade'
                },

                {   // JSON Loader
                    test: /\.json$/, 
                    loader: 'json'
                },

                {   // CSS Loader
                    test: /\.css$/,  
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
                },
                
                {   // LESS Loader
                    test: /\.less$/, 
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                },

                {   // SASS Loader
                    test: /\.scss$/, 
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                }
            ]
        },

        // Setting up resolution
        resolve: {
            modulesDirectories: [
                'node_modules',
                'resources',
                'app'
            ]
        },

        // Set up plugins
        plugins: [
            // Environment globals
            new webpack.DefinePlugin({
                ENV: JSON.stringify('mobile')
            }),
            
            // Define module globals
            new webpack.ProvidePlugin({
                '_': 'underscore',
                '$': 'jquery'
            }),

            // Deduplication
            new webpack.optimize.DedupePlugin(),


            // Chunk out vendor code
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.mobile.js'),

            // Extract CSS files
            new ExtractTextPlugin("mobile.css"),

            // Hot module replacement
            new webpack.HotModuleReplacementPlugin()
        ]
    }
];