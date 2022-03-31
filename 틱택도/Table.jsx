import React,{memo} from 'react'
import Tr from './Tr'

const Table = memo(({ tableData, dispatch, rowData}) =>{
   
    return(
        <table>
            {/* i가 몇번째인지 나타낸다. */}
          {Array(tableData.length).fill().map((tr, i) => (<Tr dispatch={dispatch} rowIndex={i} rowData = {tableData[i]}/>))}  
      
        </table>
        )
})
export default Table;