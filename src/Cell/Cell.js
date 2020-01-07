import React from 'react';
import './Cell.css';

const cell = props => {
  return (
    <div className={props.className}
         style={{height: props.cellSize + "px", width: props.cellSize + "px"}}>
    </div>
  )
}

export default cell;