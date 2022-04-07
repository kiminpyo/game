import React from 'react'
import Td from './Td'
const Tr = ({rowData, rowIndex, dispatch}) => {
  return (
      <tr>
       {Array(rowData.length).fill().map((td,i) => 
       (<Td  
       dispatch={dispatch} 
       /* i */
       rowIndex={rowIndex} 
       cellIndex={i} 
       /* rowData는 1열에 해당 => 1열의 i번째 */
       cellData={rowData[i]}/>) 
       )}
      </tr>
    
  )
}

export default Tr