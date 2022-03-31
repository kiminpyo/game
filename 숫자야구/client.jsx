/* import 와 require ==
const React = require('react');
const ReactDOM = require('react-dom');
//{} ==>구조분해 문법 ==> exports되는게 객체나 배열이면 구조 분해 할 수 있다.
/*  const { hot } =require('react-hot-loader/root');  */

/* const Baseball = require('./Baseball'); */

//require ==> node의 모듈 시스템, 

/*  const Hot = hot(Baseball)  */
/* ReactDOM.render(<Baseball/>,document.querySelector('#root')) */ 

import React from 'react';
import ReactDOM from 'react-dom';

import Baseball from './Baseball';

ReactDOM.render(<Baseball/>, document.querySelector('#root'));

