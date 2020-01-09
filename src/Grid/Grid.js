import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
    setCells(createInitialCells());
  }, []);

  useEffect(() => {
    const localCells = [...cells]
    if (localCells.length !== 0) {
      props.changedGridItems.forEach((el) => {
        localCells[el.index] = <Cell cellSize={props.cellSize} className={el.className} key={el.index}/>
      })
      setCells(localCells);
    }
  }, [props.changedGridItems])

  return (
    <div className="grid"
      style={{width: props.width + "px", height: props.height + "px"}}>
      {cells}
    </div>
  )
}

export default Grid;