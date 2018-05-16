import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Square component renders a single <button>
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
      {props.value}
      </button>
    );
}

//the same as above
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

//Board component renders 9 squares
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'x' : '0';
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
    <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    }
    else {
     status = `Next player: ${(this.state.xIsNext ? 'X' : '0')}`;
    }

    return (
      <div>
        <div className = "status">{status}</div>
        <div className = "board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className = "board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className = "board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
      </div>
    )
  }
}

//Game component renders a board with some placeholders
class Game extends React.Component {
  render() {
    return (
      <div className = "game">
        <div className = "game-board">
          <Board />
        </div>
        <div className = "game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
  }

 return null;
}