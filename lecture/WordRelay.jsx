const React = require('react');;
const {useState, useRef} = require('react')

const WordRelay = () =>{

    const [word, setWord] = useState('김인표');
    const [value, setValue] = useState('');
    const [result, setResult] =useState('');
    const inputRef = useRef(null)
    const onSubmit = (e) =>{
        e.preventDefault();

        console.log(word[word.length-1])
        if(word[word.length-1] === value[0]){

         /*    setResult(() =>{

                return '정답';
            }); */
            setResult('딩동댕')
           /*  setWord(() => {
                return value;
                
            }) */
            setWord(value)
            setValue('')
            inputRef.current.focus();
        }else{
            setWord(value)
           setResult('땡')
            setValue('')
            inputRef.current.focus();
        }
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }
    


    return(
        <>
        <div>{word}</div>
        <form onSubmit={onSubmit}>

        <input
        ref={inputRef}       
        type="text"
         onChange={onChange}
         value={value}
         />
        <button>확인</button>
        </form>
        <div>{result}</div>
        </>
        )
}
module.exports = WordRelay;