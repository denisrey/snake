import React, {Component} from 'react';
import './App.css';
import Grid from './Grid/Grid';
import Cell from './Cell/Cell';
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
  }

  state = {
    gameStatus: gameStatus.NOTSTARTED,
  }

  createStartingCells() {
    const cells = []
    console.log(this.numberOfCells);
    for (let i=0; i<this.numberOfCells;i++) {
      cells.push(<Cell cellSize={this.props.cellSize}/>)
    }
    return cells;
  }

  componentWillMount() {
    this.setState({cells: this.createStartingCells()})
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyeventHandler)
  }

  keyeventHandler = (event) => {
    console.log("clicked", event);
  }

  startGameButtonHandler = () => {
    this.setState({gameStatus: gameStatus.RUNNING})
    this.startGame();
    console.log("start game clicked");
  }

  startGame = () => {

  }
  
  render() {


  return (
    <div className="App">
      <Panel 
        clicked={this.startGameButtonHandler} 
        gameStatus={this.state.gameStatus}/>
      <Grid width={this.width} height={this.height}>
        {this.state.cells}
      </Grid>
    </div>
  );
  }
}

export default App;
