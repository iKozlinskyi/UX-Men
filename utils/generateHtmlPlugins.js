const { fileTraversal } = require('./fileTraversal');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateHtmlPlugins(templateDir, shouldMinify) {
    const delimiter = process.platform !== 'win32' ? '/' : '\\';

    const templateFiles = fileTraversal(templateDir).filter(file => file.endsWith('.html') || file.endsWith('.ejs'));
    return templateFiles.map(item => {
        const parts = item.split(/[\/\.\\]/);
        const extension = parts[parts.length - 1];
        const fileName = parts[parts.length - 2];
        const chunkName = parts[parts.length - 3];
        const templateRelativePath = parts.slice(parts.indexOf('src'), parts.length - 1).join(delimiter);
        return new HtmlWebpackPlugin({
            filename: `${fileName}.html`,
            favicon: 'favicon.ico',
            template: `./${templateRelativePath}.${extension}`,
            chunks: [chunkName, 'styles'],
            minify: shouldMinify && {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            }
        })
    })
}

module.exports = {
    generateHtmlPlugins
};
