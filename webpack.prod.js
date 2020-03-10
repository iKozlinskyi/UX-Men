const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {generateHtmlPlugins} = require("./utils/generateHtmlPlugins");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /(\.css|\.scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    }
                },
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {filename: "[name].[contentHash].css"}
        ),
        new HtmlWebpackPlugin({
            filename: `about.html`,
            template: `src/static/pages/about/about.html`,
            chunks: ['about', 'styles'],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            }
        }),
        new HtmlWebpackPlugin({
            filename: `heroes.html`,
            template: `src/static/pages/heroes/heroes.ejs`,
            chunks: ['heroes', 'styles'],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            }
        }),
        new HtmlWebpackPlugin({
            filename: `landing.html`,
            template: `src/static/pages/landing/landing.html`,
            chunks: ['landing', 'styles'],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            }
        }),

        // ...generateHtmlPlugins(path.resolve('./src/static/pages'), true)
    ]
});
