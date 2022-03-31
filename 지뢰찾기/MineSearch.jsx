import React, {useReducer, createContext, useMemo} from 'react'
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

export const TableContext = createContext({
    tableData: [],
    halted: true,
    /* 함수 */
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: false
}
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
    for(let i = 0; i < row; i++){
        const rowData =[];
        data.push(rowData);
        for(let j =0; j < cell; j++){
            rowData.push(CODE.NORMAL)
        }
    }
    
        for(let k = 0; k <shuffle.length; k ++){
            const ver = Math.floor(shuffle[k]/ cell);
            const hor = shuffle[k] % cell;
            data[ver][hor] = CODE.MINE;
        }
        console.log(data)
        return data;
    }

/* 액션 이름을 FORM에 전달 */
export const START_GAME = "START_GAME"
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_CELL'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL'



const reducer = (state,action) =>{
    switch(action.type){
        case START_GAME:
            return{
                ...state,
                tableData: plantMine(action.row, action.cell ,action.mine),
                halted: false
            }
        case OPEN_CELL:
            const tableData = [...state.tableData]
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            let around = [];
            if(tableData[action.row -1]){
               
              around =  around.concat(
                      
                tableData[action.row -1][action.cell -1] ,
                 tableData[action.row][action.cell],
                 tableData[action.row][action.cell + 1]
                );
            }
            around = around.concat(
                tableData[action.row -1][action.cell -1] , 
                tableData[action.row][action.cell + 1]
            );
            if(tableData[action.row +1]){
                around =   around.concat(     
               tableData[action.row -1][action.cell -1] ,
                tableData[action.row][action.cell],
                tableData[action.row][action.cell + 1]
               );
           }
           const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;;
           tableData[action.row][action.cell]= count;
              return{
                ...state,
                tableData,
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
                    tableData[action.row][action.cell] = CODE.NORMALIZE_MINE
                }else{
                    tableData[action.row][action.cell] = CODE.NORMAL
                }
                return{
                    ...state,
                    tableData,
                
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
const value = useMemo(() => ({tableData:tableData, halted: halted, dispatch}), [tableData])

    return (
        <TableContext.Provider value={value}>
        <Form/>
        <div>{timer}</div>
        <Table/>
        <div>{result}</div>
       </TableContext.Provider>
    )
}

export default MineSearch;