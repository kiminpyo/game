const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'minesearch',
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            
            targets: {browsers:
                 ['>1% in KR','last 2 chrome versions']},
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel'],
      },
      exclude: path.join(__dirname, 'node_modules'),
    }],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist',
  },
  devServer: {
    //웹팩이 빌드한 파일들이 위치한 경로
    //node.js 와 webpack.js 공부
    devMiddleware: { publicPath: '/dist' },
    //현재폴더, 실제로 존재하는 정적파일의 경로(index.html)
    static: { directory: path.resolve(__dirname) },
    hot: true
    //핫 리로딩과 리로딩 탐지==> 새로고침은 기존 데이터가 날라간다. 핫은 기존 데이터 유지하면서 화면을 바꿔준다.
  }
};