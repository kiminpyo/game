import React, {useState, useRef } from 'react'

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작');
  const [result, setResult] = useState([]);
  
  /* ref의 추가적 기능 + current를 넣는다.
   state에 값넣으면 return 다시실행 <-> useref의 값 바꿀때는 return이 다시 실행되지 않는=>불필요한 렌더링은 막는다.
   화면은 바꾸고 싶은데 값이 바꾸길 원하지 않을때 쓴다.*/
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();
  
  const onClickScreen = () => {
    if (state === 'waiting'){
      timeOut.current = setTimeout(()=>{
        setMessage('지금 클릭')
        setState('now')
        
        /* 
        지금 클릭이 뜰때는 클릭하기 전이다. 색이 바뀜과 동시에 
        시작하는 것 */
        startTime.current = new Date();
        console.log(startTime.current)
      }, Math.floor(Math.random() * 1000) + 2000); //2~3초랜덤
      /* 2초에서 3초까지는 대기시간이 있고, 그사이에 ready를 넣어준다.
      비동기 */
      setState('ready')
     setMessage('초록색이 된 후에 클릭하세요.')
    }
    
    else if (state ==='ready'){ //성급하게 클릭
      clearTimeout(timeOut.current);
      setState('intro');
      setMessage('초록색이 된 후에 클릭하세요')   
    }
    else if(state ==='intro'){
      setState('waiting')
      setMessage('준비되셨으면 클릭하세요')
      
    }
    
    else if (state === 'now'){// 반응속도 체크
      endTime.current = new Date();
      console.log(endTime.current)
      setState('waiting'),
      setMessage('클릭해서 시작');
      setResult((prevResult) => {
        return[...prevResult, endTime.current - startTime.current]
      });
    };
  };

  
  const onReset = () =>{
    setResult([])

  };

  const renderAverage = () =>{
    return result.length === 0
    ? null 
    : <>
      <div>평균시간 : {result.reduce( (a,c ) => a + c)/ result.length}ms</div>
      <button onClick={onReset}>리셋</button>
    </>
  }
  return (
    <>
    <div id="screen"
    className={state}
    onClick={onClickScreen}
    >
      {message}
    </div>
    {renderAverage()}
    </>
  );
}


export default ResponseCheck