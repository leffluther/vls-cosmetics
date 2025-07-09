const path = require('path');

let paths = {
	src: './src',
	js: 'assets/js'
};

module.exports = {
	mode: 'development',
	performance: { hints: false },
	entry: {
		main: `${paths.src}/${paths.js}/main`
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					}
				}
			}
		]
	},
	optimization: {
		minimize: true,
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /(node_modules)/,
					name: 'vendors',
					chunks: 'all',
					enforce: true,
				},
			},
		}
	},
	resolve: {
		alias: {
			'~': paths.src,
			'%app%': path.resolve(__dirname, `${paths.src}/${paths.js}`),
		},
	},
};