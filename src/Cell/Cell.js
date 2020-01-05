import React from 'react';

const cell = props => {
    return (
        <div className="grid-cell" 
            style={{height: props.cellSize + "px", width:props.cellSize + "px"}}>
        </div>
    )
}

export default cell;