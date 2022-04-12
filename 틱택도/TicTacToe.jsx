import React, { useState, useReducer, useCallback, useEffect, memo } from 'react';
import Table from './Table'

const initialState = {
    winner: '',
    turn: '0',
    tableData:[
        ['','',''],
        ['','',''],
        ['','','']
    ],

    recentCell: [-1, -1],
};
/* CASE의 변수는 밖으로 빼놔라 ==> 커뮤니티의 규칙 */
const SET_WINNER = 'SET_WINNER';
/* export */
export const CLICK_CELL = 'CLICK_CELL'
export const SET_TURN = 'SET_TURN'
export const RESET_GAME = 'RESET_GAME'
    const reducer = (state, action) => {    
        switch(action.type) {
            case SET_WINNER : 

        /*  state.winner = action.winner ; --> 이렇게 하면아안됨 */
            return {
                /* spread == 얕은 복사 ==> 불변성을 지킬 수 있다 */
                ...state,
                winner: action.winner,
            };
            case CLICK_CELL: { 
                const tableData = [...state.tableData];
                tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
                tableData[action.row][action.cell] = state.turn;
                return{
                    ...state,
                    tableData,
                    recentCell : [action.row,action.cell]
                    };
            }
            case SET_TURN: {
                console.log(state.turn)
                return{
                    ...state,
                    turn: state.turn === '0'? 'X' : 'O',

                }
            }
            case RESET_GAME: {
                    return{
                        ...state,
                        turn: '0',
                        tableData: [
                            ['','',''],
                            ['','',''],
                            ['','','']
                        ],
                        recentCell: [-1, -1]
                    }
            }
        };
    }
const TicTacToe = memo(() =>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, turn, winner, recentCell} = state;
/* component안에 넣는 함수들은 usecallback 사용, props들의 리 렌더링 방지 */
    const onClickTable = useCallback(() =>{
        dispatch({type:'SET_WINNER', winner: '0' })
    }, [])
/*     const [winner, setWinner] = useState('');
    const [turn, setTurn] = useState('0');
    const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]) */

    useEffect(() => {
        const [row, cell] = recentCell;
        if(row < 0){
            return;
        }
        let win = false;
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
                win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
    }
    /* 무승부 검사 */
    console.log(row,cell, winner,tableData, turn)
    if (win){
        dispatch({type: SET_WINNER, winner: turn})
    }else{
        let all = true; /* 무승부라는 뜻  */
        tableData.forEach((row) =>{
            row.forEach((cell) =>{
                if(!cell){
                    all: false;
                }
            });
        });
        if(all)
        {
            dispatch({type: RESET_GAME})
        }else{
            dispatch({type: SET_TURN})
        }
       
    }

    }, [recentCell])
    return(
        <>
        <Table onClick={onClickTable} tableData ={tableData} dispatch={dispatch}/>
        {winner && <div>{winner}님의 승리</div>}
        </>
    )
});

export default TicTacToe;
