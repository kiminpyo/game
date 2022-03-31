import React, {useRef, useEffect, memo, useMemo} from 'react'
import Td from './Td'


const Tr = memo(({rowData, rowIndex, dispatch}) =>{
    const ref = useRef([])
    useEffect(() => {
        console.log(rowIndex === ref.current[0],  dispatch ===ref.current[2], rowIndex ===ref.current[3])
        ref.current = [rowData, rowIndex, dispatch]
    },  [rowData, rowIndex,  dispatch] )

   console.log('tr rendered')
    return(
        <tr >
        {Array(rowData.length).fill().map((td ,i) => (
        useMemo( () =>
        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i}>{''} cellData={rowData[i]}</Td>,
             [rowData[i]],
        )
        ))}
        </tr>
        )
})
export default Tr;