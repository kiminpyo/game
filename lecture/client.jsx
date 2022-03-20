const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay.jsx');

ReactDom.render(<WordRelay />, document.querySelector('#root'));
//js,jsx의 차이 ==> react전용 파일인 것을 알 수 있다.