import React, {Component} from 'react'
import Try from './Try'


function getNumbers() {
    //숫자 네 개를 겹치지 않고 램덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    
      for(let i = 0; i< 4; i += 1){

        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
      }
      return array;
   
   
   /* 내가 한 코드
    for(let i = 0; i < 4; i++){
      
        i = Math.ceil(Math.random() * 9);
        
        let arr = [];
        arr.push(i);
        const set = Array.from(new Set(arr));
            console.log(set)
        } */
}
 

class Baseball extends Component{
/* 만약 arrow가 아닌 일반 함수형으로 선언할 경우 생성자 필요
  onstructor(props){
    super(props);
      this.state={
        result: '',
        value: '',
        strike: '',
        ball: '',
        tries: [],
        answer: getNumbers(),
      }
      
     this.onChangeInput = this.onChangeInput.bind(this);
     this.onSubmitForm = this.onSubmitForm.bind(this);
  }
 */

    state = {
        result: '',
        value: '',
        strike: '',
        ball: '',
        tries: [], 
        answer: getNumbers(), //1,3,5,7
        
    }
        /*  리액트에서 제공하는게 아닌 내가 만드는 함수는 화살표 함수를 꼭 쓴다.
          그렇지 않으면 생성자(constructor)를 다시 써야함
        onSubmitForm(e){  
          e.preventDefault();
        }  */
    onSubmitForm = () => {
        e.preventDefault();

        if(this.state.value === this.state.answer.join('')){
            this.setState({
              result: '홈런',
               //push쓰면 안 돼요 ==>리액트에서 ==> 
     /*    (새로운 배열 생성 -> 기존배열 복사 -> 새로운 거 넣어주기 is 렌더링의 기준(참조가 바뀌어야함)) */
              tries : [...this.state.tries, 
                {try: this.state.value, result: '홈런!'}],

              })
              alert('게임을 다시 시작합니다');
              this.setState({
                value: '',
                answer: getNumbers(),
                tries: []
              })
        }else {  
          const answerArray = this.state.value.split('').map( (v) => parseInt(v) );
          let strike = 0;
          let ball  = 0;
          if(this.state.tries.length >= 9){
            this.setState({
              result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
            
            });
            alert('게임을 다시 시작합니다');
            this.setState({
              value: '',
              answer: getNumbers(),
              tries: []
            })
          }else{
            for(let i = 0; i <4 ; i+=1){
              if (answerArray[i] === this.state.answer[i]){
                strike += 1;

              }else if(answer.includes()){
                ball += 1;
              }
            }
            this.setState({
              tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
              value: ''
            })
          }
        }
    };
    
    //arrow가 아닌 일반 함수는 this 선택자 못쓴다.  (undefined)
    onChangeInput = (e) => {
      this.setState({
        value: e.target.value,

      });
    };
 /*    fruits = [
        {fruit: '사과', taste: '떫다'},
        {fruit: '감', taste: '맛있다'},
        {fruit: '귤', taste: '시다'},
        {fruit: '오렌지', taste: '쓰다'},
        {fruit: '사과', taste: '맛없다'},
        {fruit: '사과', taste: '맛있다'}, 
    ] */
    //렌더는 extends에서 처리해준다.
    render() {
  return (
    <>
      {this.state.result}
       <form onSubmit={this.onSubmitForm}></form>
       <input type="text" maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
    <div>시도: {this.state.tries.length}</div>
    <ul>
      {/* 바뀌는 부분이 두개씩 있을때 => 이차원 배열 */}
      {/*arrow 함수 리턴생략 ==> 중괄호가 없을때 return 생각하고 
      {[],map((v) => <li><b>바나나</b></li> )}  ==> 이렇게 가능하다 */}
      {this.state.tries.map( (v, i) => {
        return(
            //key에다가 i 절대 넣지마라 ==>성능 최적화 시 문제가된다. but case by case - 써도되는 구별법
       /*  <li><b>{v[0]}</b> - {v[1]} - {i}</li> */
       
       /* <li><b>사과</b> -맛있다 - 0</li>
        <li><b>바나나</b> -맛없다 - 1</li> */
          <Try key={`${i+1}차 시도:`} tryInfo={v} index={i}/>
      /* props에 대해 익숙해지자 */
      );
        })}
        </ul>
        </>
        )
      }
    }

        /*     이차원 배열이 아닌 객체로 
           {[
             {fruit: '사과', taste: '떫다'},
             {fruit: '감', taste: '맛있다'},
             {fruit: '귤', taste: '시다'},
             {fruit: '오렌지', taste: '쓰다'},
             {fruit: '사과', taste: '맛없다'},
             {fruit: '사과', taste: '맛있다'},
            ]}.map((v) =>{

            return(
                <li key={v.fruit + v.taste} <b>{v.fruit</b> - {v.taste}</li>

            )
           })  */
      // key를 보고 같은 컴포넌트인지 아닌지 판단 (key={v.fruit + v.taste}) 처럼 고유해야함
      // 중복이 된다면 콘솔에 다시 key 에러가 남 
          
export default Baseball
           // => import Baseball
//module.exports 랑 export default는 원래 다른데 일단 리액트 수준이라면 그냥 비슷하다고 생각.
//엄밀히 따지면 node.js는 import, export가 아닌 module이라 웹팩에서는 require로 불러와야함
//웹팩에 있는 babel이 클라이언트에 require로  변한해준다.

// export const hello = 'hello' => import{hello}

