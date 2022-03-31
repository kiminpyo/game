import React, {useCallback, useEffect, useRef, memo} from 'react'
import { CLICK_CELL } from './TicTacToe'

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) =>{
    console.log('td rendered')
    
    /* 성능최적화를 위해서 테스트 중 */
    const ref = useRef([])
    useEffect(() => {
        console.log(rowIndex === ref.current[0], rowIndex === ref.current[1], rowIndex ===ref.current[2], rowIndex ===ref.current[3])
        ref.current = [cellData, ref.current[3]]
    },  [rowIndex, cellIndex, dispatch, cellData] )
   const onClickTd = useCallback(()=>{

    console.log(rowIndex,cellIndex)
    /* 기존 데이터가 있으면 바뀌지 않음 */
    if(cellData){
        return;
    }
   /* action은 마음대로 해도된다. reducer에서만 잘조절해주면된다.*/
   /* 비동기에 따라서 처리할때는 useEffect를 사용 */
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex })
    
   }, [cellData])

   
    return(
        <td onClick={onClickTd}>{cellData}</td>
        )
});
export default Td;