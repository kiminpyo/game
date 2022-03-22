const React = require('react')
const {useState, useRef} = React; 

const  GuGuDan= () => {
    const [first, setFirst ] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond ] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue ] = useState('');
    const [result, setResult ] = useState('');
    const inputRef = useRef(null);
    //구조분해 할당(destructuring), dom??(기존에는 input 선언 후 this로 dom에 접근=> hooks는 useref 로 dom접근(current를 붙여준다))
const onSubmit= (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second){              
            setResult((prevResult)=>{
                return '정답' + value
            });
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
           inputRef.current.focus();           
        }else{
        setResult('땡');
        setValue('');
        inputRef.current.focus();     
         
        }
    };
    const onChange= (e) => {
       setValue(e.target.value);
    }
    console.log('렌더링')
    
    return (<>
            <div>{first} 곱하기 {second}는?</div>
            <form
            onSubmit={onSubmit}>
                <input 
                type="number"
                onChange={onChange}
                value={value}
                ref={inputRef}
                />
                <button>입력</button>    
            </form>
             <div id="result">{result}</div>
        </>
    );
}    

module.exports = GuGuDan;