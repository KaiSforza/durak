const isDev = process.env.NODE_ENV === 'development'

var HtmlWebpackPlugin = require("html-webpack-plugin")
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html'
})

// webpack.config.js
module.exports = [
    {
        mode: isDev ? 'development' : 'production',
        entry: './src/main.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src/,
                use: [{loader: 'ts-loader'}]
            }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'main.js'
        }
    },
    {
        mode: isDev ? 'development' : 'production',
        entry: './src/app.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: { rules: [{
            test: /\.ts(x?)/,
            include: /src/,
            use: [{ loader: 'ts-loader' }]
        }] },
        output: {
            path: __dirname + '/dist',
            filename: 'app.js'
        },
        plugins: [HtmlWebpackPluginConfig]
    },
    {
        mode: isDev ? 'development' : 'production',
        entry: [
            __dirname + '/src/main.scss',
        ],
        output: {
            publicPath: ''
        },
        module: {
            rules: [{
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].css'}
                    },
                    'sass-loader'
                ]
            }]
        },
    }
]