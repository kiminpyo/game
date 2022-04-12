import React, {useCallback, useState, useContext} from 'react'
import {TableContext, START_GAME} from './MineSearch'
function Form() {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(10);
  /* 구조분해 */
 const {dispatch} = useContext(TableContext)
  const onChangeRow= useCallback((e)=>{
    console.log(e.target.value)
    setRow(e.target.value)
  },[])
  const onChangeCell= useCallback((e)=>{
    setCell(e.target.value)
  },[])
  const onChangeMine = useCallback((e) =>{
    setMine(e.target.value)
  },[])

  const onClickBtn = useCallback(() =>{
    /*  입력한 값을 action에 전해준다 */
    dispatch({type: START_GAME, row, cell, mine });
  },[row,cell,mine])
  return (
    <>
    <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
    <input type="number" placeholder="가로" value={cell} onChange={onChangeCell}/>
    <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
    <button onClick={onClickBtn}>시작</button>
    </>
  )
}

export default Form