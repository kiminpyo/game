const path  = require('path')

module.exports= {
    name: 'word-relay-setting',
    mode: 'development', //실서비스 : production으로 바꾼다.
    devtool: 'eval', // 빠르게
    /* resolve: ['.js','.jsx'] ==> 뒤의 확장파일을 다 찾아준다, */
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
};