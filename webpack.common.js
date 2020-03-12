module.exports = {
    entry: {
        landing: "./src/static/pages/landing/landing.js",
        about: "./src/static/pages/about/about.js",
        blackWindow: "./src/static/pages/blackWindow/blackWindow.js",
        notFound: "./src/static/pages/notFound/notFound.js",
        styles: "./src/static/main.scss",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif|ico)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets",
                        esModule: false
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ejs$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: [':src', ':data-src', 'source:srcset', 'source:data-srcset'],
                        interpolate: true
                    }
                }, {
                    loader: 'ejs-plain-loader'
                }]
            }
        ]
    }
};
