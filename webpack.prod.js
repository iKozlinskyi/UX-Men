const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

//Future functionality
// const walkSync = function(dir, fileList = []) {
//     filesList = fs.readdirSync(dir);
//
//     fileList.forEach(function(file) {
//         if (fs.statSync(dir + '/' + file).isDirectory()) {
//             fileList = walkSync(dir + '/' + file, fileList);
//         }
//         else {
//             fileList.push(path.resolve(__dirname, dir,  file));
//         }
//     });
//
//     return fileList;
// };
//
//
// function generateHtmlPlugins(templateDir) {
//     const templateFiles = walkSync(templateDir).filter(file => file.endsWith('.html'));
//     return templateFiles.map(item => {
//         const parts = item.split('.');
//         const name = parts[0];
//         const extension = parts[1];
//         return new HtmlWebpackPlugin({
//             filename: `${name}.html`,
//             template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
//             minify: {
//                 removeAttributeQuotes: true,
//                 collapseWhitespace: true,
//                 removeComments: true,
//             }
//         })
//     })
// }
//
// const HtmlPlugins = generateHtmlPlugins('./src/static/pages');
//

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
        // ...HtmlPlugins

    ]
});