var path = require("path");

module.exports = {
	entry: "./main.jsx",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},]
	}
};