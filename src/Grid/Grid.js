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
          cells.push(<Cell cellSize={props.cellSize} className={"cell"} key={i}/>)
        }
        return cells;
    }

    const renderNewGrid = () => {
        console.log("is this called during each change?");
    }

    renderNewGrid()

    return (
      <div className="grid" style={{width: props.width + "px", height: props.height + "px"}}>
          {props.children}
      </div>
    )
}

export default Grid;