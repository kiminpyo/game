import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react'
import Ball from './Ball'
/* useeffect, usememo,usecallback의 2번째 인자가 중요하다. (상황에 따라서 평생 기억하니까) */
/* 함수안에 콘솔로 넣고 내가 필요할때만 실행되는게 맞는지 체크 필수 */
function getWinNumbers(){
    /* 나중에 뜯어보기 */
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v ,i) => i + 1)
    const shuffle  = [];
    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate. length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1 ];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber]
    /* hooks's tip ==> 조건문안에 x , 함수나 반복문 안에도 되도록 x */
}
const LottoHooks = () => {
    /* usememo :복잡한 함수 결괏값(리턴값)을 기억 
        usecallback: 함수 자체를 기억
        useRef: 일반 값을 기억 
        hooks는 선언 순서가 중요하다.  usememo에 2번째인자 winballs라 winballs 먼저 위에 선언*/
    /* 캐시처럼 넣어준다. usememo를 안쓰면 getwinnumbers 메서드가 계속 호출 */
    const [winBalls, setWinBalls] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);
    /* 훅스에서 getwinnumbers가 계속 렌더되는지? ==> 문제가 심각하다 */
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [bonus, setBonus ] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    /* mount만하고싶다 ( update x) 
    useEffect(() => {
      //ajax.~  
    },[])
     만약 didupdatae에서 쓰고싶다 
    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current){
            mounted.current = true;
        }else{
            //ajax  패턴이니까 기억하자 (꼼수)
        }
    }, [바뀌는 값]);/* update만 하고싶다 (mount x) */


    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
          timeouts.current[i] = setTimeout(() => {
            setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
          }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
          setBonus(winNumbers[6]);
          setRedo(true);
        }, 7000);
        return () => {
          timeouts.current.forEach((v) => {
            clearTimeout(v);
          });
        };
      }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
      // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
    
    /* usecallback으로 감싸면 함수 생성자체를 기억해놓는다  */
    const onClickRedo = useCallback(() =>{
        console.log(winNumbers)
        setWinNumbers(getWinNumbers())
        setWinBalls([])
        setBonus(null)
        setRedo(false)
        timeouts.current= [];
        }, [winNumbers])
     /* 2번째 인자가 usestate안에서 기억을 너무 잘한다 --> 값이 3번바뀌어도 첫번째 값을 기억 */   

    
    
    
   
    return (
            <>
            <div>당첨숫자</div>
            <div id="결과창">
            {/* 반복문을 기점으로 컴포넌트를 분리하기 좋은 기점이 된다. */}
                {winBalls.map((v) => <Ball key={v} number ={v}/>)}
            </div>
            <div>보너스!</div>
            {/* 자식컴포넌트에 함수를 넘길 때는 usecallback을 무조건 실행해준다. (리렌더링 이슈)
            그렇지 않으면 어? 부모로부터 받은 props가 바뀌었네? 자꾸 바뀌나? 해서 렌더링을 해버린다. */}
            {bonus && <Ball number={bonus}  onClick={onClickRedo}/>}
            {redo && <button onClick={onClickRedo}>한 번 더 </button>}
            </>
    );
    }

   

export default LottoHooks;