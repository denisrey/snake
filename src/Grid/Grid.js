import React from 'react';
import './Grid.css';

const grid = props => {

    return (
      <div className="grid" style={{width: props.width + "px", height: props.height + "px"}}>
          {props.children}
      </div>
    )
}

export default grid;