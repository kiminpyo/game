import React, {useCallback, useReducer, useState, useEffect} from 'react'
import Table from './Table'

const initialState = {
  winner: '',
  turn: 'o',
  tableData : [['','',''],['','',''],['','','']],
  recentCell : [-1,-1],
  draw: ''
}
const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const SET_TURN = 'SET_TURN'
export const RESET_GAME = 'RESET_GAME'
export const RESET_GAME_DRAW = "RESET_GAME_DRAW"
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
      tableData,
      recentCell : [action.row, action.cell]
      
    };
    case SET_TURN:

      return{
        ...state,
        turn: state.turn === 'o' ? 'x' : 'o',
      };
    case RESET_GAME:

    return{
      ...state,
      tableData: [['','',''],['','',''],['','','']],
      recentCell: [-1,-1]
    };
    case RESET_GAME_DRAW:
      return{
        ...state,
        tableData:  [['','',''],['','',''],['','','']],
        recentCell: [-1,-1],
        draw: action.draw
      }
    default:
      return state;
 
    }
}



const TicTacToe =() => {
  const [state, dispatch] = useReducer(reducer,initialState);
  const {tableData, turn, winner, recentCell} = state;

  const onClickTable = useCallback(() => {
    /* dispatch안에 action개체({type: 'SET_WINNER', winner: '0'}) => dispatch하면 action을 실행한다
  action을 실행할 수 있게 바꿔주는 것 =>reducer*/
  console.log('실행')
    dispatch({type: SET_WINNER, winner: '0'})
  },[]);

  useEffect(() =>{
    const [ row, cell] = recentCell;
    if( row < 0){
      return;
    }
      let win = false;
      if(tableData[row][0] === turn && tableData[row][1] && tableData[row][2] === turn){
        win = true;
        console.log('hi')
      }if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] ===turn ){
        win = true;
        console.log('hi')
      }if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn ){
        win = true;
        console.log('hi')
      }if(tableData[0][2] ===turn && tableData[1][1] === turn && tableData[2][0] ===turn){
        win = true;
        console.log('hi')
      }
      console.log(win,row,cell, tableData)
      if(win){
        dispatch({type: SET_WINNER, winner: turn})
        dispatch({type: RESET_GAME})
      }else{
        let all = true; //all이 true면 무승부
        tableData.forEach((row) => { //무승부 검사
          row.forEach((cell) =>{
            if(!cell){
              all = false;
            }
          })
        })
        if(all){
          dispatch({type: RESET_GAME_DRAW, draw: '비겼습니다.'})
        }else{
          dispatch({type: SET_TURN})
        }
   
      }
  }, [recentCell])

    return (
  <>
    <Table
    onClick = {onClickTable}
    tableData={state.tableData} 
    dispatch={dispatch}/>
    {state.winner && <div>{state.winner}님의 승리</div>}
    {state.draw     && <div>{state.draw}</div>}
  </>
  )
}

export default TicTacToe