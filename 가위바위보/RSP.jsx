import React, {Component} from 'react'

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
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;

    })[0];

}
class RSP extends Component {
    state  ={
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    };

    interval;/* 메모리 누수랑 관련된 setinerval==> unmount에서 정리해줘야한다. */
    /* jsx가 dom에 딱 붙어줄 때, 렌더가 성공적으로 실행되면 실행해주는 함수 
    처음 이 함수가 실행되면 리 렌더링때는 실행되지 않는다.*/
    componentDidMount() { //컴포넌트 첫 렌더링된 후 , 여기에 비동기 요청을 많이 한다.
    // -142px;     /* 클로저 문제 발생 ==> 비동기  */
    this.interval =  setInterval(this.changeHand, 1000)
    }
     componentDidUpdate(){ //리렌더링 (setstate나 동작후 리렌더링 될 때)
         
    }
    componentWillUnmount() { // 컴포넌트 제거되기 직전 , 비동기 요청 정리를 많이 한다.
        clearInterval(this.interval)
    }
    /* 라이프 사이클에 관련된 함수*/


    changeHand =() =>{
        this.interval =  setInterval((e) =>{
            const {imgCoord} = this.state; 
            if(imgCoord === rspCoords.바위){
                console.log(rspCoords)
                console.log(imgCoord)
                this.setState( {
                    imgCoord: rspCoords.가위,
    
                });
            }else if(imgCoord === rspCoords.가위){
                console.log(rspCoords)
                console.log(imgCoord)
                this.setState({
                    imgCoord: rspCoords.보,
                })
    
            }else if(imgCoord === rspCoords.보){
                console.log(rspCoords)
                console.log(imgCoord)
                this.setState({
                    imgCoord: rspCoords.바위
                })
            }
            }, 1000)
    }/* 리액트에서 많이 쓰는 패턴 ==> 함수안에 메서드 넣을때 */
    onClickBtn = (choice) => () => {
        const {imgCoord} =this.state
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result: '비겼습니다',
            });

        }else if([-1,2].includes(diff)){
            this.setState((prevScore)=>{
                return{

               
                result: '이겼습니다.',
                score: prevScore.score + 1,
            };
            })
        }else {
            this.setState((prevScore) =>{
                return{
                    result: '졌습니다.',
                    score: prevScore.score -1
                }
            });
        };
        setTimeout(() =>
        { this.interval =  setInterval(this.changeHand, 1000)}
        ,2000)
       
    };
    
    render(){
        const {result, score, imgCoord} = this.state;
        return(
            <>
            <div id="computer" style={{background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg)${imgCoord}`}}></div>
            <div>
                <button id="rock" className="btn"  onClick={this.onClickBtn('바위')} >바위</button>
                {/* 함수안에 메서드를 호출하는 부분  ()=> {} 위쪽에 선언 =고차함수관련 */}
                <button id="scissor" className="btn" onClick={() =>this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={() =>this.onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        )
    }
}
export default RSP;