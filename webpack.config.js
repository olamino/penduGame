const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname,'src');
const distPath = path.join(__dirname,'dist');

module.exports = {
    entry: {
        app: ['./src/js/app.js','./src/scss/style.scss']
    },
    output: {
        path: distPath,
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader:'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader:'sass-loader',
                            options: {
                                indentedSyntax: 'sass',
                                includePaths: [srcPath]
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new UglifyJSPlugin({
            uglifyOptions:{
                ecma:6,
                mangle:false
            }
        })
    ]
};
