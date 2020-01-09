import React, { Component } from 'react';
import './App.css';
import Grid from './Grid/Grid';
import Panel from './Panel/Panel';

const gameStatus = {
  RUNNING: "RUNNING",
  NOTSTARTED: "NOTSTARTED",
  ENDED: "ENDED"
};

class App extends Component {

  constructor(props) {
    super(props)
    this.width = this.props.cellsPerRow * this.props.cellSize;
    this.height = this.width;
    this.numberOfCells = this.props.cellsPerRow * this.props.cellsPerRow;
    this.lastKeyEvent = null;
  }
  
  getRandomAndFreeCellIndex = (snake) => {
    const allCellIndexes = [];
    for (let i = 0; i < this.numberOfCells - 1; i++) {
      allCellIndexes.push(i);
    }
    const freeCellsIndexes = allCellIndexes.filter(n => !snake.includes(n));

    return freeCellsIndexes[Math.floor(Math.random() * freeCellsIndexes.length)];
  }

  state = {
    gameStatus: gameStatus.NOTSTARTED,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyEventHandler)
  }

  keyEventHandler = (event) => {
    this.lastKeyEvent = event.key;
  }

  startGameButtonHandler = () => {
    if (this.state.gameStatus !== gameStatus.RUNNING) {
      this.startGame();
    }
    this.setState({ gameStatus: gameStatus.RUNNING })
  }

  startGame = () => {
    const snake = this.getRandomAndFreeCellIndex([])
    const food = this.getRandomAndFreeCellIndex([])
    const changedGridItems = [
      {index: food, className: "cell-food"},
      {index: snake, className: "cell"}
    ]
    this.setState({
      snake: [snake],
      food: food,
      changedGridItems: changedGridItems,
      gameStatus: gameStatus.RUNNING
    });
    this.interval = setInterval(this.gameLoop, 125)
  }

  isSnakeHittingBorder = (snake, newPosition) => {
    const currentPosition = snake[0]
    if (newPosition < 0
      || (currentPosition % this.props.cellsPerRow === this.props.cellsPerRow - 1
        && newPosition === currentPosition + 1)
      || (currentPosition % this.props.cellsPerRow === 0 && newPosition === currentPosition - 1)
      || newPosition >= this.numberOfCells) {
      return true;
    } else {
      return false;
    }
  }

  isSnakeHittingSnake = (snake, newPosition) => {
    return snake.slice(0, snake.length - 2).includes(newPosition);
  }

  getNextPosition = (snake) => {
    switch (this.lastKeyEvent) {
      case "ArrowUp": {
        return snake[0] - this.props.cellsPerRow;
      }
      case "ArrowLeft": {
        return snake[0] - 1;
      }
      case "ArrowDown": {
        return snake[0] + this.props.cellsPerRow;
      }
      case "ArrowRight": {
        return snake[0] + 1;
      }
      default: {
        return snake[0];
      }
    }
  }

  moveSnake = (snake, newPosition) => {
    if (snake.length === 0) {
      return;
    } else if (snake.length === 1) {
      const oldTail = snake[0];
      snake[0] = newPosition;
      return oldTail;
    } else {
      const oldTail = snake[snake.length - 1];
      snake.pop();
      snake.splice(0, 0, newPosition);
      snake[0] = newPosition;
      return oldTail;
    }
  }

  eatFood = (snake, oldTail) => {
    const nextFood = this.getRandomAndFreeCellIndex(snake)
    snake.push(oldTail);
    return nextFood
  }

  gameLoop = () => {
    let changedGridItems = []
    let newState = {}

    const snake = [...this.state.snake];
    const newPosition = this.getNextPosition(snake);
    if (!this.isSnakeHittingBorder(snake, newPosition)
      && !this.isSnakeHittingSnake(snake, newPosition)) {
      const oldTail = this.moveSnake(snake, newPosition)
      if (newPosition === this.state.food) {
        const nextFood = this.eatFood(snake, oldTail);
        changedGridItems.push({index: nextFood, className: 'cell-food'})
        changedGridItems.push({index: this.state.food, className: 'cell'})
        newState.food = nextFood;
      }
      changedGridItems.push({index: oldTail, className: 'cell'});
      changedGridItems.push({index: newPosition, className: 'cell-snake'});
      newState.snake = snake;
      newState.changedGridItems = changedGridItems;
      this.setState(newState)
    } else {
      //Game Over
      snake.forEach(el =>{
        changedGridItems.push({index: el, className: 'cell'});
      })
      changedGridItems.push({index: this.state.food, className: 'cell'});
      this.setState({
        gameStatus: gameStatus.ENDED,
        changedGridItems: changedGridItems
      });
      clearInterval(this.interval);
    }
  }

  render() {

    return (
      <div className="App">
        <Panel
          clicked={this.startGameButtonHandler}
          gameStatus={this.state.gameStatus} />
        <Grid width={this.width}
          height={this.height}
          numberOfCells={this.numberOfCells}
          cellSize={this.props.cellSize}
          changedGridItems={this.state.changedGridItems}>
        </Grid>
      </div>
    );
  }
}

export default App;
