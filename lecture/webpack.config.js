/* const path  = require('path')

module.exports= {
    name: 'word-relay-setting',
    mode: 'development', //실서비스 : production으로 바꾼다.
    devtool: 'eval', // 빠르게
     resolve: ['.js','.jsx'] ==> 뒤의 확장파일을 다 찾아준다, 
    entry: {
        app: ['./client.jsx'],
    }, //입력

    module : {
        rules: [{
            //정규표현식 따로 공부 ==> js와 jsx파일에 rule 적용하겠다. ==> 최신문법을 옛날로도 돌아가게끔
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets:['@babel/env', '@babel/react' ],
                plugins:['@babel/plugin-proposal-class-properties']
            }
        }],
    },
    output:{
        path: path.join(__dirname, 'dist'),  // C:\users\zerocho\~~~~\dist를 자동으로 만들어준다.
        filename: 'app.js'
    }, //출력
}; */

/* const path = require('path');
const webpack = require('webpack');
//entry, mode, module, plugin, output 이 5개만 알아도 웹팩은 알수있다.
module.exports = {
    
    mode: 'development',
    devtool : 'eval', //배포 때는 hidden-source-map
     resolve: {
        extensions: ['.jsx','.js']
    }, 
        //메인이 ENTRY MODULE OUTPUT
        
    entry:{
        app: './client',
    },
    module:{
        rules:[{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets:[
                     //원하는 브라우저에만 버전을 호환되게 등록시켜주는 것
                     //브라우저리스트가 정리되어있다. github.com/browserlist~~~
                    ['@babel/preset-env', 
                    {
                   //한국에서 브라우저 점유율이 5퍼센트 이상인 브라우저는 다 지원 
                    target: {
                        browsers: ['>5% in KR','last 2 chrome versions'],
                    },
                    debug: true
                }],
                '@babel/preset-react',
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }

        }]
    },
    //플러그인도 어렵다. 현업에서는 여러개 사용==> 플러그인 빼보고 rules 빼보면서 에러코드 보고 이유를 찾아라
    plugins: [
        //위 loader의 option에 debug를 true로
        new webpack.LoaderOptionsPlugin({ debug: true})
    ],
    output:{
        path: path.join(__dirname, 'dist'),  // C:\users\zerocho\~~~~\dist를 자동으로 만들어준다.
        filename: 'app.js'
    }, //출력
}; */

const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'word-relay-dev',
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