import React, {PureComponent, memo} from 'react';

//이렇게 뺀 이유: 성능 + 가독성 + 재사용성

class Try extends PureComponent {
    constructor(props){
        super(props);
        //다른동작
        const filtered = this.props.filter(() => {

        })
        //원래 동작
        this.state = {
            result :  
            try: this.props.try
        }
    }
   
    //고조 <-> 손자 => redux, context ,,etc props issue  
  
   
    render() { 
        /* 구조분해 ==> this.props를 생략하고 싶으면 구조분해 문법이용해 선언해준다 */
        const {tryInfo} = this.props;
        return(
           <li>

               <div>{tryInfo.try}</div>
               <div >{tryInfo.result}{this.state.result}</div>
           </li>
    
       
        )
    }
}
export default Try;