var webpack             = require("webpack");
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin   = require("html-webpack-plugin");

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin 参数的方法
var getHtmlConfig = function (name,title) {
  return {
    template : './src/view/' + name + '.html',
    filename : 'view/' + name + '.html',
    favicon  : './favicon.ico',
    title : title,
    inject : true,
    hash : true,
    chunks : ['common' , name]
  }
}

//webpack config
var config = {
  entry:{
    'common' : ['./src/page/common/index.js'],
    'index' : ['./src/page/index/index.js'],
    'list' : ['./src/page/list/index.js'],
    'detail' : ['./src/page/detail/index.js'],
    'cart' : ['./src/page/cart/index.js'],
    'payment' : ['./src/page/payment/index.js'],
    'order-confirm' : ['./src/page/order-confirm/index.js'],
    'order-detail' : ['./src/page/order-detail/index.js'],
    'order-list' : ['./src/page/order-list/index.js'],
    'user-login' : ['./src/page/user-login/index.js'],
    'user-register' : ['./src/page/user-register/index.js'],
    'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
    'user-center' : ['./src/page/user-center/index.js'],
    'user-center-update' : ['./src/page/user-center-update/index.js'],
    'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
    'result' : ['./src/page/result/index.js'],
    'about' : ['./src/page/about/index.js'],
  },
  output:{
		path :__dirname + '/dist/',
		publicPath : 'dev' === WEBPACK_ENV ? '/dist/':'//s.happyrmmall.com/rmmall-fe/dist/',
    filename:'js/[name].js'
  }, 
  externals: {
    'jquery':'window.jQuery'
  }, 
  // devServer: {
  //   port: 8088,
  //   inline: true,
  //   proxy: {
  //     '/user': {
  //       target : 'http://www.happymmall.com',
  //       changeOrigin: true
  //     },
  //     '/product': {
  //       target : 'http://www.happymmall.com',
  //       changeOrigin: true
  //     },
  //     '/cart': {
  //       target : 'http://www.happymmall.com',
  //       changeOrigin: true
  //     },
  //     '/order': {
  //       target : 'http://www.happymmall.com',
  //       changeOrigin: true
  //     },
  //     '/shipping': {
  //       target : 'http://www.happymmall.com',
  //       changeOrigin: true
  //     }
  //   }
  // },
  module: {
    loaders:[
      {test: /\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
      {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
      { test: /\.string$/, loader:  'html-loader',query : {
        minimize : true,
        removeAttributeQuotes : false
      }}
    ]
  },
  resolve: {
    alias: {
      util : __dirname + '/src/util',
      page : __dirname + '/src/page',
      service : __dirname + '/src/service',
      image : __dirname + '/src/image'
    }
  },
  plugins:[
    //独立通用模块到 js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    }),
    //把 css 单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    //html 模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('payment', '支付页面')),
    new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认页')),
    new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
    new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('about','关于RMMall')),
  ],
};
if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports  = config;