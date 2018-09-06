const EpsEnv = require('./src/config');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const express = require('express');
const router = express.Router();
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 初始化eps配置信息
let EPSConfig = EpsEnv.EpsEnvConfig;
console.log('/* ***************************** */');
console.log('EPSConfig Info in webpack.config.js:');
console.log(EPSConfig);
console.log('/* ***************************** */');

module.exports = {
  entry: {
    'scripts/index':[path.resolve(__dirname, 'src/scripts/index.js')],
    'scripts/router':[path.resolve(__dirname, 'src/scripts/router.js')]
  },
  // 查错设置，添加此配置后，开发过程中能定位到错误的具体位置，生产时可关闭
  // devtool: 'source-map', 
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath:'/dist/form/',
    filename: '[name].js',
    chunkFilename: "scripts/[name]?v=[chunkhash:8]"
  },
  module: {
    //加载器配置
    loaders: [
      {
        test: /\.jsx?$/,exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/,loaders: ['style-loader','css-loader?importLoaders=1','postcss-loader']},
      {test: /\.scss$/, loaders: ['style-loader','css-loader?importLoaders=1','sass-loader']},
      {test: /\.less$/, loaders: ['style-loader','css-loader?importLoaders=1','less-loader']},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.json$/,loader: 'json-loader'},
      {test: /\.html$/,loader: 'file?name=/public/[name].[ext]'}, 
      {test: /\.svg$/,loader: 'file-loader',query: {name: 'static/[name].[hash:8].[ext]'}}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
    new ProgressBarPlugin({
      format:'[:bar]:percent (:elapsed s)',
      clear: false
    })
  ],
  externals:{
    'whatwg-fetch':'fetch',
    '_':'Underscore',
    // 'react':'React',
    'moment':'moment',
		'underscore':'_',
    'lodash':'_',
    '_':'lodash'
    // 'react-dom': 'ReactDOM'
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    modules: ['node_modules', path.join(__dirname, 'node_modules')],
    extensions: ['.web.js', '.jsx', '.js', '.json'],
  },
  devServer: {
    contentBase: "./src",
		historyApiFallback:{
			index:'src/index.html'
		},
    disableHostCheck:true,
    hot:true,
    open:true,
    compress:true,
    inline: true,//实时刷新,
    stats: { colors: true },
    setup: function(app) {
      app.use('/node_modules', express.static(__dirname+'/node_modules'));
      // require('./routers/router')(app,'/api');
    },
    proxy: {
    	'/McdEpsApi/*':{
        target: EPSConfig.HostMcdEpsApi,
				// target: "http://jmis.mcd.com.cn/",
				changeOrigin: true,
				// pathRewrite: { "^/api" : "" },
				secure: false     
			},
      '/jmis/*':{
        target: EPSConfig.Hostjmis,
        // target: "http://42.159.250.248/",
        changeOrigin: true,
        // pathRewrite: { "^/api" : "" },
        secure: false     
      }
    }
  }
};