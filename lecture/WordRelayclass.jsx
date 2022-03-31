const React = require('react');
const {Component} = React; // React.Component => Component로 쓸 수 있다.

class WordRelay extends Component{
    state = {
         word: '김인표',
         value : '',
         result: ''
          
    };

    onSubmitForm = (e) =>{
        e.preventDefault();
        //단어의 마지막
       console.log(this.state.word.charAt(this.state.word.length-1),this.state.value.charAt(this.state.value.length-1))
       //입력한 값의 마지막과, 단어의 마지막 값이 같다면
       if(this.state.word.charAt(this.state.word.length-1) === this.state.value.charAt(0) ){
        //if(this.state.word[this.state.word.length -1] === this.state.value[0])
        this.setState(() =>{

           return{
            word: this.state.value,
            value: '',
            result: '정답'
           }        
        })
       }else{
         this.setState(() => {
            return{
               /* 생략가능 word: this.state.word, */
                value: '',
                result: '틀림'
            }
         })
           
       }
    }
    onChange = (e) => {
        //current or target 둘다 가능
        this.setState({value:e.currentTarget.value})

    }
        input;
    onRefInput = (c) =>{
        this.input = c;
    };

    
    render() {
        return (
            <div>
            <div>{this.state.word}</div>
            <form  onSubmit={this.onSubmitForm}>
                <label htmlFor=""></label>
                <input 
                    ref={this.onRefInput} 
                    type="text" 
                    value={this.state.value}
                    onChange={this.onChange} />
                <button >확인</button>
                <br />
                {this.state.result}
            </form>
            </div>
            
        )
    }
}

module.exports = WordRelay;
//다른 곳에서 쓸 수 있게 export