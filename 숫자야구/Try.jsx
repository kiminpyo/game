import React, {Component} from 'react';

//이렇게 뺀 이유: 성능 + 가독성 + 재사용성

class Try extends Component {
    //고조 <-> 손자 => redux, context ,,etc props issue  
    render() { 
        return(
           <li>

               <div>{this.props.tryInfo.try}</div>
               <div>{this.props.tryInfo.result}</div>
           </li>
    
       
        )
    }
}
export default Try;