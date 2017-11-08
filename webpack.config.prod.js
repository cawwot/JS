import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	debug: true,
	devtools: 'source-map',
	noInfo: false,
	entry: {
		main: path.resolve(__dirname, 'src/index'),
		vendor:path.resolve(__dirname, 'src/vendor')
	},
	target :'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	plugins: [
		//keep css seperate
		new ExtractTextPlugin('[name].[contenthash].css'),

		//hashing for cache-busting
		new WebpackMd5Hash(),

		//use bundling
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),

		//Minify
		new webpack.optimize.UglifyJsPlugin(),

		//Remove duplicate packages
		new webpack.optimize.DedupePlugin(),

		//create html file dynamically
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			trackJSToken: '4f2decae9af04ea8a28139ba6fb9d3a6'
		})
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}

		]
	}
}
