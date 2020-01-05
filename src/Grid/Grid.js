import React, { useEffect} from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = (props) => {

    useEffect(() => {
        props.setStartingCells(createStartingCells());
    }, [])

    const createStartingCells = () => {
        const cells = []
        for (let i=0; i<props.numberOfCells;i++) {
          cells.push(<Cell cellSize={props.cellSize} key={i}/>)
        }
        return cells;
    }

    return (
      <div className="grid" style={{width: props.width + "px", height: props.height + "px"}}>
          {props.children}
      </div>
    )
}

export default Grid;