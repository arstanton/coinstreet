const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './js/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/js')
	},
	watch: true,
	module: {
		loaders: [
	    	{ 
	    		test: /\.js$/,
	    		loader: 'babel-loader', 
	    		exclude: path.resolve(__dirname, "./node_modules"), 
	    		query: { 
	    			presets: ['es2015', 'react'] 
	    		}
	    	},
	    	{
    	      test: /\.css$/,  
    	      include: /node_modules/,  
    	      loaders: ['style-loader', 'css-loader'],
	    	}
	 	]
	},
	stats: {
		colors: true
    },
};