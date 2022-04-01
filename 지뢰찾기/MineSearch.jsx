import React, {useReducer, createContext, useMemo, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
/* 기본값을 넣어줄 수 있다. */

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, /* 0이상이면 다 OPEN */

}
/* 자식으로 보낼 애들 */
export const TableContext = createContext({
    tableData: [],
    halted: true,
    /* 함수 */
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
      },
    timer: 0,
    result: '',
    halted: false,
    openedCount: 0
    
}
/* 마인을 심는 코드 */
const plantMine= (row, cell, mine) =>{
    console.log(row,cell,mine)
    const candidate = Array( row * cell).fill().map((arr, i)=>{
        return i;
    })
    /* 0부터 99까지 칸 중에서 지뢰의 갯수를 랜덤으로 뽑은 것 => shuffle에 저장 후 지뢰가 몇 개 뽑혀있는지 확인 */
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        shuffle.push(chosen);
    } 
    
    const data = [];
    /* 빈배열에 -1을 다 넣어준다 */
    for(let i = 0; i < row; i++){
        const rowData =[];
        data.push(rowData);
        for(let j =0; j < cell; j++){
            rowData.push(CODE.NORMAL)
        }
    }
    /* 각 행과 열에 지뢰를 심는다. */
        console.log(data)
         for(let k = 0; k <shuffle.length; k ++){
            const ver = Math.floor(shuffle[k]/ cell);
            const hor = shuffle[k] % cell;
            data[ver][hor] = CODE.MINE;
        }
        console.log(data ) 
        /* 빈 배열에 다시 data반환 */
        return data;
    }

/* 액션 이름을 FORM에 전달 */
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';



const reducer = (state,action) =>{
    switch(action.type){
        case START_GAME:
            
            console.log( action.cell)
            return{
                ...state,
                data:{
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                openedCount: 0,
                timer: 0,
                tableData: plantMine(action.row, action.cell ,action.mine),
                halted: false
                
            };
        case OPEN_CELL:
            console.log(action.row, action.cell)
            /* 다시 tabledata를 받아온다. */
            const tableData = [...state.tableData]
            tableData[action.row] = [...state.tableData[action.row]];
            tableData.forEach(   (row,i) =>{
                tableData[i] = [...state.tableData[i]]
            })
            const checked = [];
            let openedCount =[]
            const checkAround = (row, cell) => {
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                    return;
                }/* 상하좌우 없는 칸은 안 열기 */
                if(row< 0  || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                    return;
                }/* 닫힌 칸만 열기 */
                if (checked.includes( row + ',' + cell)){
                    return;
                }else{
                    checked.push( row + ',' + cell)
                }
               
                let around = [];
                if(tableData[row -1]){
                   
                  around =  around.concat(
                          
                    tableData[row -1][cell -1] ,
                     tableData[row -1][cell],
                     tableData[row -1][cell + 1]
                    );
                }
                around = around.concat(
                    tableData[row][cell -1] , 
                    tableData[row][cell + 1]
                );
                if(tableData[row +1]){
                    around =   around.concat(     
                   tableData[row +1][cell -1] ,
                    tableData[row +1][cell],
                    tableData[row +1][cell + 1]
                   );
               }
               const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
               tableData[row][cell]= count;
               console.log(row, cell)
                    /* 주변 빈칸 찾는 코드 */
               if(count=== 0){
                const near =[];
                if(row - 1 > -1){
                    near.push([row -1, cell -1]);
                    near.push([row -1, cell]);
                    near.push([row -1, cell +1]);
                }
                near.push([row , cell -1]);
                near.push([row , cell +1]);
                if(row + 1 > -1){
                    near.push([row +1, cell -1]);
                    near.push([row +1, cell]);
                    near.push([row +1, cell +1]);
                }
                near.forEach((n) =>{
                    if(tableData[n[0][n[1]] !== CODE.OPENED]){
                    checkAround(n[0], n[1])
                    }   
                } )
               }
               if(tableData[row][cell] === CODE.NORMAL){ /* 내 칸이 닫힌 칸이면 카운트 증가 */
                    openedCount += 1;
               }
               tableData[row][cell] = count;
               
            }
            console.log(action.row, action.cell)
            
            checkAround(action.row, action.cell)
            let halted = false;
            let result = '';
            if( state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){ 
                halted = true;
                result = `${state.timer}승리하셨습니다`
            }else{

            }
              return{
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result
            }
            case CLICK_MINE: {
                const tableData = [...state.tableData]
                tableData[action.row] = [...state.tableData[action.row]];
                tableData[action.row][action.cell] = CODE.CLICKED_MINE;
                return{
                    ...state,
                    tableData,
                    halted: true
                }
            }
            case FLAG_CELL: {
                const tableData = [...state.tableData]
                tableData[action.row] = [...state.tableData[action.row]];
                if(tableData[action.row][action.cell] === CODE.MINE){
                    tableData[action.row][action.cell] = CODE.FLAG_MINE
                }else{
                    tableData[action.row][action.cell] = CODE.FLAG
                }
                return{
                    ...state,
                    tableData,
                
                }
            }
            case QUESTION_CELL: {
                const tableData = [...state.tableData]
                tableData[action.row] = [...state.tableData[action.row]];
                if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                    tableData[action.row][action.cell] = CODE.QUESTION_MINE
                }else{
                    tableData[action.row][action.cell] = CODE.QUESTION
                }


                return{
                    ...state,
                    tableData,
                  
                }
            }
            case NORMALIZE_CELL:{
                const tableData = [...state.tableData]
                tableData[action.row] = [...state.tableData[action.row]];
                if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                    tableData[action.row][action.cell] = CODE.MINE
                }else{
                    tableData[action.row][action.cell] = CODE.NORMAL
                }
                return{
                    ...state,
                    tableData,
                
                }

            }
            case INCREMENT_TIMER: {
                return{
                    ...state,
                    timer: state.timer + 1
                }
            }
            

        default:
        return state;
    }
}


const MineSearch = () => {
    const [state,dispatch] = useReducer(reducer, initialState)
    const {tableData, halted, timer, result} = state;
    /* 캐싱  => return에 value ={{tableData: state.tableData, dispatch}}를 바로 넣으면 
    성능최적화에 많은 문제가 생긴다. 따라서 따로 value를 배주고 useMemo로 덮어준다. */
const value = useMemo(() => ({tableData:tableData, halted: halted, dispatch: dispatch}), [tableData, halted])

    useEffect(() => {
        if (halted === false){
            const timer = setInterval(() =>{
                dispatch({type: INCREMENT_TIMER});
            }, 1000)
            return() =>{
                clearInterval(timer);
            }
        }
       
    }, [halted])

    return useMemo(() => (
        <TableContext.Provider value={value}>
        <Form/>
        <div>{timer}</div>
        <Table/>
        <div>{result}</div>
       </TableContext.Provider>
    ))
}

export default MineSearch;