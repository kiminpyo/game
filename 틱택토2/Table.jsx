import React from 'react'
import Tr from './Tr'
const Table = ({onClick, tableData, dispatch}) => {
  return (
    <table >
      {/* 배열에 tableData.length =>3 이고 인덱스마다 rowData를 넣어준다. 1열 2열 3열과 i = 0, 1, 2(1열의 0번째 1열의 1번째를 가림) */}
      {Array(tableData.length).fill().map((tr,i) => 
      (<Tr  
      rowData={tableData[i]} 
      rowIndex={i} 
      dispatch={dispatch}/>)
      )}
    </table>
    
  )
}

export default Table