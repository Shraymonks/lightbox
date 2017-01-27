import path from 'path';

export default {
	entry: ['babel-polyfill', './src/js/index.js'],
	output: {
		filename: 'bundle.js',
		path: './dist'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [path.resolve(__dirname, "src/js")]
			}
		]
	}
};
