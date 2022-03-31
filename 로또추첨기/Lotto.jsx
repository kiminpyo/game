import React, {Component} from 'react'
import Ball from './Ball'
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
}

class Lotto extends Component {
    state ={
        winNumbers : getWinNumbers(), //당첨 숫자들
        winBalls: [], 
        
        bonus: null,//보너스 공
        redo: false,
    };

    timeouts = [];

    componentDidMount() {
        const {winNumbers} =this.state
        for(let i = 0; i < this.state.winNumbers.length -1 ; i ++){
            this.timeouts[i] = setTimeout(() =>{
                this.setState((prevState) => {
                    return{
                    winBalls: [...prevState.winBalls, winNumbers[i]],
                    }
                })
            }, ( i +1) * 1000)
        }
       this.timeouts[6] =  setTimeout(() => {
           this.setState({
               bonus: winNumbers[6],
               redo: true,
           }) 
        }, 7000);
         
    }
        componentWillUmount() {
            this.timeouts.forEach( (v) => {
                    clearTimeout(v);
            });      
        }
        componentDidUpdate(prevProps,prevState){
            if(this.state.winBalls.length === 0){
                this.runTimeouts();
            }
        }
        onClickRedo = () =>{
            this.setState({
                winNumbers : getWinNumbers(), //당첨 숫자들
                winBalls: [], 
                
                bonus: null,//보너스 공
                redo: false,
            });
            this.timeouts= [];
           
        }

        runTimeouts = () =>{

            const{winNumbers} = this.state;
            for(let i = 0; i < this.state.winNumbers.length -1 ; i ++){
                this.timeouts[i] = setTimeout(() =>{
                    this.setState((prevState) => {
                        return{
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                        }
                    })
                }, ( i +1) * 1000)
            }
           this.timeouts[6] =  setTimeout(() => {
               this.setState({
                   bonus: winNumbers[6],
                   redo: true,
               }) 
            }, 7000);
        }

      
    render(){
        const {winBalls, bonus, redo} = this.state;
        return (
            <>
            <div>당첨숫자</div>
            <div id="결과창">
            {/* 반복문을 기점으로 컴포넌트를 분리하기 좋은 기점이 된다. */}
                {winBalls.map((v) => <Ball key={v} number ={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={this.onClickRedo}>한 번 더 </button>}
            </>
            );


    }
}

export default Lotto;