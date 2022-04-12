import React,{useReducer, createContext, useMemo} from 'react'
import Table from './Table'
import Form from './Form'
/* 지뢰의 상태를 따로 코드로 만듦 */

export const CODE = {
  MINE: -7, //마인이 심겨진 칸
  NORMAL: -1, // 마인이 심겨지지 않은 칸
  QUESTION: -2, // 오른쪽 마우스 한번 클릭
  FLAG: -3, // 오른쪽 마우스 2번 클릭
  QUESTION_MINE: -4, // 오른쪽 마우스 한번 클릭했는데 마인일때,
  FLAG_MINE: -5,// 오른쪽 마우스 두번 클릭했는데 마인일때
  CLICKED_MINE: -6, // 마인 크릭했을때 펑
  OPENED: 0 // 클릭했을때 그냥 빈칸일 때 (0이상이면 다 OPENED)

}

export const TableContext = createContext({
  tableData: [],
 /* dispatch타입을 맞추기 위해 함수로 표현 */
  dispatch: () => { }
});

const initialState = {
  tableData: [],
  result: '',
  timer: 0
}

const plantMine = (row, cell, mine) => {
 
 /* 전체 선택지 => 가로 x세로해서 index를 반환해서 가져옴 (칸이 총 100개면 index갯수도 100) */
 const candidate = Array(row * cell).fill().map((arr, i)=>{
   return i;
 })
 /* 끝나면 셔플에 몇번째 칸에 지뢰가 몇개있는지 알 수 있다. */
 const shuffle = [];
 /* 100- 10 총 90번을 하겠다. */
 while(candidate.length > row * cell - mine){
   console.log("candidate.length =->"+candidate.length)
   /* array.splice(start[, deleteCount[, item1[, item2[, ...]]]]) 
   start: 시작할 인덱스 번호, delete: 몇개를 지울지 , item: 추가할 항목
   난수 0~9까지 뽑고 *총 칸의 갯수= 100,
   Math.floor: 주어진 수 이하의 가장 큰 수 
   Math.random(): 0 이상 1 미만의 부동소숫점 의사 난수.
   1. 난수는 0.1, legnth는 100 candidate.splice(10,1)[0] ==> 배열의 10번째에 해당하는 곳부터 1개에 [0]을 넣겠다. */

   const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1);
   console.log("chosen==>"+ chosen)
   shuffle.push(chosen)
 }
 /* 일반 칸에 CODE.NORMAL넣기 */
 const data = [];
 for (let i = 0 ; i < row ; i++){
        const rowData = [];
        data.push(rowData)
   for(let j = 0; j < cell ; j ++){
    rowData.push(CODE.NORMAL);
   }
 }
 /* shuffle을 이용해서 마인 심기 */
 for(let k = 0; k < shuffle.length; k++){
   const ver = Math.floor(shuffle[k]/ cell);
   const hor = shuffle[k] % cell;
   data[ver][hor]= CODE.MINE;
 }
 console.log(data)
 return data;
}

export const START_GAME = 'START_GAME';

const reducer = (state, action) =>{
  switch(action.type){
    case START_GAME:
    return{
        ...state,
        /* action에서 받은 매개변수 그대로 함수 생성 */
        tableData: plantMine(action.row, action.cell, action.mine)
      };
    default:
      return state;
  }

}

function MineSearch2() {


  const [state, dispatch] = useReducer(reducer, initialState)
/* 리렌더 방지, 따로 빼주고 useMemo사용. */
  const value = useMemo(() => ({tableData: state.tableData, dispatch: dispatch})
  , [state.tableData])
  return (
    /*CONTEXT에 넣고 Provider로 감싸주기, 데이터는 value에 */
    <TableContext.Provider value={value}>
    <Form/>
    <div>{state.timer}</div>
   <Table/>
   <div>{state.result}</div>
   </TableContext.Provider>
  )
}

export default MineSearch2