import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = props => {

    const createCells = () => {
        const cells = []
        for (let i=0; i<props.numberOfCells;i++) {
          cells.push(
          <Cell cellSize={props.cellSize} className={"cell"} key={i}/>
          )
        }
        if (typeof(props.food) !== "undefined") {
            cells[props.food] = <Cell cellSize={props.cellSize} className={"cell-food"} key={props.food}/> 
        } 
        if (typeof(props.snake) !== "undefined") {
            props.snake.forEach((el) => {
                cells[el] = <Cell cellSize={props.cellSize} className={"cell-snake"} key={el}/>
            })
        }
        return cells;
    }

    const cells = createCells()

    return (
      <div className="grid" 
        style={{width: props.width + "px", height: props.height + "px"}}>
          {cells}
      </div>
    )
}

export default Grid;