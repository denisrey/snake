import React, {Component} from 'react';
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
    for (let i=0; i<this.numberOfCells-1;i++) {
      allCellIndexes.push(i);
    }
    const freeCellsIndexes = allCellIndexes.filter(n => !snake.includes(n));

    return freeCellsIndexes[Math.floor(Math.random() * freeCellsIndexes.length)];
  }

  state = {
    gameStatus: gameStatus.NOTSTARTED,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyeventHandler)
  }

  keyeventHandler = (event) => {
    this.lastKeyEvent = event.key;
  }

  startGameButtonHandler = () => {
    if (this.state.gameStatus !== gameStatus.RUNNING) {
      this.startGame();
    }
    this.setState({gameStatus: gameStatus.RUNNING})
  }

  startGame = () => {
    this.setState({
      snake: [this.getRandomAndFreeCellIndex([])],
      food: this.getRandomAndFreeCellIndex([]),
      gameStatus: gameStatus.RUNNING
    });
    this.interval = setInterval(this.gameLoop, 120)
  }

  isSnakeHittingBorder = (snake, newPosition) => {
    const currentPosition = snake[0]
    if (newPosition < 0
      || (currentPosition % this.props.cellsPerRow === this.props.cellsPerRow - 1 
        && newPosition === currentPosition + 1) //right border
      || (currentPosition % this.props.cellsPerRow === 0 && newPosition === currentPosition - 1) //walking right
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
    switch(this.lastKeyEvent) {
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
        snake.splice(0,0,newPosition);
        snake[0] = newPosition;
        return oldTail;
    }
  }

  eatFood = (snake, oldTail) => {
    this.setState({
      food: this.getRandomAndFreeCellIndex(snake)
    })
    snake.push(oldTail);
  }

  gameLoop = () => {
    const snake = [...this.state.snake];
    const newPosition = this.getNextPosition(snake);
    if (!this.isSnakeHittingBorder(snake, newPosition)
      && !this.isSnakeHittingSnake(snake, newPosition)) {
      const oldTail = this.moveSnake(snake, newPosition)
      if (newPosition === this.state.food) {
        this.eatFood(snake, oldTail);
      }
      this.setState({snake: snake})
    } else {
      //Game Over
      this.setState({gameStatus: gameStatus.ENDED});
      clearInterval(this.interval);
    }
    
  }
  
  render() {

  return (
    <div className="App">
      <Panel 
        clicked={this.startGameButtonHandler} 
        gameStatus={this.state.gameStatus}/>
      <Grid width={this.width} 
        height={this.height} 
        numberOfCells={this.numberOfCells}
        cellSize={this.props.cellSize}
        snake={this.state.snake}
        food={this.state.food}>
      </Grid>
    </div>
  );
  }
}

export default App;
