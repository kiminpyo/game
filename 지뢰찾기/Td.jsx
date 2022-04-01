import React, {useCallback, useContext, memo} from 'react'
import {NORMALIZE_CELL,QUESTION_CELL, FLAG_CELL, CLICK_MINE, CODE, OPEN_CELL, TableContext } from './MineSearch'

const getTdStyle = (code) => {
  switch (code){
  case CODE.NORMAL:
  case CODE.MINE:
    return {
      background: '#444',
    };
  case CODE.CLICKED_MINE:
  case CODE.OPENED:
    console.log('hi')
    return{
      background: 'gray'
    };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      console.log('hi')
        return{
          background: 'yellow',
        };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
        return{
          background: 'red'
        }
    default:
      return{
        background: 'white'
      }
}
};
const getTdText = (code) =>{
  switch (code){
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'x';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
    
    return code || '';
    }
};


/* rowindex와 cell은 부모로부터 받고 tabledata 는 context로부터 받는다. */
const Td = ({rowIndex, cellIndex}) =>{
  const{tableData, dispatch, halted} = useContext(TableContext)

  
  const onClickTd = useCallback(() => {
    if(halted){
      return;
    }
    switch (tableData[rowIndex][cellIndex]){
    case CODE.OPENED:
    case CODE.FLAG_MINE:
    case CODE.FLAG:
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return;
        
    case CODE.NORMAL:
      dispatch({type: OPEN_CELL, row: rowIndex, cellIndex: cellIndex})
      return;
    case CODE.MINE :
      dispatch({type: CLICK_MINE, row: rowIndex, cellIndex:cellIndex})
      return;
      default:
      return;
  
    }
  },[tableData[rowIndex][cellIndex], halted])
  const onRightClickTd = useCallback((e) =>{
    e.preventDefault();
    if(halted){
      return;
    }
    switch(tableData[rowIndex][cellIndex]){
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
          dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex})
        return;
      default:
        return;
    }
  },[tableData[rowIndex][cellIndex]], halted)
  console.log('td rendered')
  return (
    <RealTd 
    onClickTd={onClickTd} 
    onRightClickTd={onRightClickTd} 
    data={tableData[rowIndex][cellIndex]}
    ></RealTd >
  )
}
const RealTd = memo(({ onClickTd, onRightClickTd, data}) => {
  console.log('real td rendered');
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});

export default Td