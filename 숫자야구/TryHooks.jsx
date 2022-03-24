import React, {memo} from 'react'
/* purecomponent , memo가 아니면 따로   shouldComponentUpdate를 써서 커스터마이징 */
/* 자식들이 memo적용하면 부모도 적용될 수 있다. */
const Try = memo(({tryInfo}) => {
        //props는 무조건 부모가 바꿔야한다.(리액트의 원칙) --> props받고 state에 넣어준다.
        cosnt [ result, setResult] = useState(tryInfo.result);

        const onClick = () =>{
            setResult('1');
        }
        return(
            
            <li>
            <div>{tryInfo.try}</div>
            <div onClick= {onClick}>{tryInfo.result}</div>
            </li>
        )
});

export default Try;