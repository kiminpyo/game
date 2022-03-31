import React, {memo}from 'react';


/* 함수 컴포넌트 => state를 안쓸 때 함수로 만들어주면 좋다 */
const Ball = memo(({number}) => {
    let background;
    if(number <= 10){
        background ='red'
    }else if(number <= 20){
        background ='orange'
    }else if(number <= 20){
        background ='blue'
    }else if(number <= 20){
        background ='black'
    }else {
        background ='green'
    }
    return(
        <div className="ball" style={{background}}>{number}</div>
        )

});

export default Ball;