const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json')

module.exports = {
	entry: './src/js/index.js',
  	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, './build')
  	},
	stats: {
		modules: true,
		entrypoints: false
	},
  	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: pkg.name,
			template: './src/index.html',
			filename: 'index.html'
		})
	],
  	module: {
		rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },
        {
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components)/,
			use: {
		  		loader: 'babel-loader',
			}
	  	},
		 {
			test: /\.(ico)$/,
			use: {
		  		loader: 'file-loader'
			}
		}]
	},
	devtool: 'eval-source-map'
}
