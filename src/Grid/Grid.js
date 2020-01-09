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
  const prevFoodRef = useRef();
  useEffect(() => {
    prevSnakeRef.current = props.snake;
    prevFoodRef.current = props.food;
  });
  const prevSnake = prevSnakeRef.current;
  const prevFood = prevFoodRef.current;

  useEffect(() => {
    setCells(createInitialCells());
  }, []);

  useEffect(() => {
    if (typeof (props.snake) === "undefined"
      || typeof (props.food) === "undefined"
      || cells.length === 0) {
      return
    }
    const localCells = [...cells]

    //paint current snake
    if (typeof (prevSnake) !== "undefined") {
      props.snake.filter(n => !prevSnake.includes(n)).forEach((el) => {
        localCells[el] = <Cell cellSize={props.cellSize} className={"cell-snake"} key={el}/>
      })

      //unpaint old snake minus new snake
      prevSnake.filter(n => !props.snake.includes(n)).forEach((el) => {
        localCells[el] = <Cell cellSize={props.cellSize} className={"cell"} key={el}/>
      })
    } else {
        localCells[props.snake] = <Cell cellSize={props.cellSize} className={"cell-snake"} key={props.snake}/>
    }

    if (typeof (prevFood) !== "undefined") {
      localCells[prevFood] = <Cell cellSize={props.cellSize} className={"cell"} key={prevFood}/>
    }
    localCells[props.food] = <Cell cellSize={props.cellSize} className={"cell-food"} key={props.food}/>

    setCells(localCells);
  }, [props.snake, props.food])

  return (
    <div className="grid"
         style={{width: props.width + "px", height: props.height + "px"}}>
      {cells}
    </div>
  )
}

export default Grid;