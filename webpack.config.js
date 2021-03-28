const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const resolve = dir => path.resolve(dir);

module.exports = {

  // 本地开发服务
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3000
  },

  devtool: "inline-source-map",

  entry: './src/index.js',

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/, // 匹配 css 文件
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js?$/, // 匹配 js 或 jsx 文件
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          loader: 'babel-loader',
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              [require.resolve('@babel/preset-env'), {modules: false}]
            ],
            cacheDirectory: true
          }
        }
      }
    ]
  },

  // 配置插件
  plugins: [
    new htmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: true
    })
  ]
}