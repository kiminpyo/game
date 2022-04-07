import React, {useCallback, useReducer, useState} from 'react'
import Table from './Table'

const initialState = {
  winner: '',
  turn: 'o',
  tableData : [['','',''],['','',''],['','','']]
}
const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const SET_TURN = 'SET_TURN'
const reducer = (state, action) => {
  switch(action.type){
    case SET_WINNER :
      /* 객체로 반환. 리액트 공통 */
      return {
        ...state, /* 객체를 새롭게 복사하는 spread문법 => 얕은복사 (불변성) */
        winner: action.winner,
      };
    case CLICK_CELL:
      /* 불변성 지키는 약속 ==> 기존의 테이블데이터 선언-> 클릭한 row값 을 기존의 테이블 데이터의 row값에 넣어줌. */
      const tableData = [...state.tableData];
      /* row까지만 다시 선언한 이유=> 이차원 배열이라 객체의 껍데기를 새로운 객체로 바꿔주었다. 
      내 생각엔 [[..],[..],[..]]라 첫번째 껍데이 새로 선언
      -> 2번째 껍데기 새로 선언 이라 cell이아닌 row까지만 선언한듯 */
      tableData[action.row] = [...tableData[action.row]] //immer라는 라이브러리로 가독성 문제 해결
      tableData[action.row][action.cell] = state.turn;
    return{
      /* state와 바뀐 tableData 반환 */
      ...state,
      tableData
      
    };
    case SET_TURN:

      return{
        ...state,
        turn: state.turn === 'o' ? 'x' : 'o',
      }
  }
}



const TicTacToe =() => {
  const [state, dispatch] = useReducer(reducer,initialState);

  const onClickTable = useCallback(() => {
    /* dispatch안에 action개체({type: 'SET_WINNER', winner: '0'}) => dispatch하면 action을 실행한다
  action을 실행할 수 있게 바꿔주는 것 =>reducer*/
  console.log('실행')
    dispatch({type: SET_WINNER, winner: '0'})
  },[])
    return (
  <>
    <Table
    onClick = {onClickTable}
    tableData={state.tableData} 
    dispatch={dispatch}/>
    {state.winner && <div>{state.winner}님의 승리</div>}
  </>
  )
}

export default TicTacToe