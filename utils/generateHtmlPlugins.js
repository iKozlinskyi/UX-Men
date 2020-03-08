const { fileTraversal } = require('./fileTraversal');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fileTraversal(templateDir).filter(file => file.endsWith('.html') || file.endsWith('.ejs'));
    return templateFiles.map(item => {
        const parts = item.split(/[\.\\]/);
        const extension = parts[parts.length - 1];
        const fileName = parts[parts.length - 2];
        const chunkName = parts[parts.length - 3];
        const templateRelativePath = parts.slice(parts.indexOf('src'), parts.length - 1).join('\\');
        return new HtmlWebpackPlugin({
            filename: `${fileName}.html`,
            template: `./${templateRelativePath}.${extension}`,
            chunks: [chunkName, 'styles']
        })
    })
}

module.exports = {
    generateHtmlPlugins
};
