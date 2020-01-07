import React, {useState, useEffect, useRef} from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = props => {

  const createInitialCells = () => {
    const localCells = []
    for (let i = 0; i < props.numberOfCells; i++) {
      localCells.push(
        <Cell cellSize={props.cellSize} className={"cell"} key={i}/>
      )
    }
    return localCells;
  }
  const [cells, setCells] = useState([]);

  const prevSnakeRef = useRef();
  useEffect(() => {
    prevSnakeRef.current = props.snake;
  });
  const prevSnake = prevSnakeRef.current;

  useEffect(() => {
    console.log("use effect first time");
    setCells(createInitialCells());
  }, []);

  useEffect(() => {
    if (typeof (props.snake) === "undefined"
      || typeof (props.food) === "undefined"
      || cells.length === 0) {
      return
    }
    const localCells = [...cells]

    props.snake.forEach((el) => {
      localCells[el] = <Cell cellSize={props.cellSize} className={"cell-snake"} key={el}/>
    })

    if (typeof (prevSnake) !== "undefined") {
      prevSnake.filter(n => !props.snake.includes(n)).forEach((el) => {
        localCells[el] = <Cell cellSize={props.cellSize} className={"cell"} key={el}/>
      })
    }
    localCells[props.food] = <Cell cellSize={props.cellSize} className={"cell-food"} key={props.food}/>

    setCells(localCells);
  }, [props.snake])

  return (
    <div className="grid"
         style={{width: props.width + "px", height: props.height + "px"}}>
      {cells}
    </div>
  )
}

export default Grid;