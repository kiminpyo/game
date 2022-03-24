import React, {PureComponent} from 'react'

class RenderTest extends PureComponent {

    state = {
        counter : 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {a: 'b', c:'d'},
        array: [5,3,6],
        array1: []
    };
    //성능최적화와 관련된 코드 -->최적화와 관련된 것들 꼭 신경쓰고 공부해야한다.
  /*   shouldComponentUpdate(nextProps, nextState,nextContext){
      nextContext ==> a-> b-> c -> d -> e -> f -> g 까지 props가 이어질 경우 사용.
      props의 진화형이 context라고 생각
        if(this.state.counter !== nextState.counter){
            console.log(nextState.counter)
            return true;

        }else{
            console.log(nextState.counter)
            return false;
        }
    } */




        /* state에 객체구조를 안쓰는 게 좋다. */

    onClick = () => {
        let counter = parseInt(this.state.counter);
       const obj = this.state.array[0].inside;
       /*       array.push(1) */ 
        /* let int = parseInt(this.setState.couneter) */
        this.setState({
                //불변성에 관련한 내용(변수명이 같아 알아차리지 못함)
            /* array: array를  */
             counter: [...this.state.array1, 1, counter++ ], 
             arrayInside: [obj],
             object: {...this.state.object}
            
        })
        this.counter()
    }
    
    counter(){
        if(this.state.counter === 10){
            alert('초기화')
            return this.state.counter = 0;
        }
    }
    
            
        
    
    render() {
        
        console.log('렌더링', this.state);
        return (
        <div>
        <button onClick={this.onClick}>{this.state.counter}</button>
        </div>
        )
    }
}
export default RenderTest;