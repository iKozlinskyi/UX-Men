const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { generateHtmlPlugins } = require('./utils/generateHtmlPlugins');

const htmlPlugins = generateHtmlPlugins(path.resolve(__dirname, './src/static/pages'));

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [
            {
                test: /(\.css|\.scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        ...htmlPlugins
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        compress: true,
        hot: true,
        port: 3000,
        publicPath: "/",
        historyApiFallback: {
            rewrites: [
                { from: /\//, to: '/landing.html'},
                { from: /\/about/, to: '/about.html'},
                { from: /\/heroes/, to: '/heroes.html'}
            ]
        }
    }
});
