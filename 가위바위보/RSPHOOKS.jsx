import React, {useState, useRef, useEffect} from 'react'

/* 클래스의 경우 렌더링 되는 순간 ==> constructor -> render -> ref -> componentDidMount -> 
(setState/props 바뀔 때 -> shouldComponentUpdate(true)) -> re-render -> componentDidUpdate)
부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸 */
 const rspCoords = {
    가위: '-142px', 
    바위: '0',
    보: '-284px'
 };
 const scores = {
    가위: 0, 
    바위: 1,
    보: -1
 }

            /* 라이프 사이클 
            result, imgCoord, score
            componentDidmount
            componentDidupdate
            componentWillUnmount */
 const RSPHOOKS = () => {
     const [result, setResult] = useState('')
     const [imgCoord, setImgCoord] =useState(rspCoords.바위)
     const [score, setScore] = useState(0)
     const interval = useRef();
    /* memo를 써야 child가 리렌더링되는 것을 방지 */
    useEffect(() =>{ /* 클래스랑의 차이 확인  componentDidMount,componentDidupdate 역할(1대1 대응은 아님*/ 
    
    interval.current = setInterval(changeHand(), 100);
    return() =>{//componentWillUnmound 역할
        clearInterval(interval.current)
    }      
    }, [imgCoord]);
    /* 빈배열을 넣어라 왜? */
     const changeHand = () => {
    
          
            if(imgCoord === rspCoords.바위){
             setImgCoord('가위')
            }else if(imgCoord === rspCoords.가위){
                setImgCoord('보')
    
            }else if(imgCoord === rspCoords.보){
                setImgCoord('바위')
            }
            
     }
     const onClickBtn = (choice) => () => {

        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
           setResult('비겼습니다');

        }else if([-1,2].includes(diff)){
            setResult('이겼습니다')
            setScore((prevScore) => {
                prevScore + 1
            })
        }else {
          setResult('졌습니다')
          setScore((prevScore) => {
              prevScore -1 
          })
        };
        setTimeout(() =>{
            interval.current =  setInterval(changeHand, 1000)
        },2000);
     }
     
        return(
            <>
            <div id="computer" style={{background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg)${imgCoord}`}}></div>
            <div>
                <button id="rock" className="btn"  onClick={onClickBtn('바위')} >바위</button>
                {/* 함수안에 메서드를 호출하는 부분  ()=> {} 위쪽에 선언 =고차함수관련 */}
                <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        )
    
}
export default RSPHOOKS;