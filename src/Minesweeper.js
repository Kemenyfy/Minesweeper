import React, { Component } from 'react';

const BoardURL = 'https://minesweeper-api.herokuapp.com'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: []
            },
            gameId: ''
        }
    }

    componentDidMount() {
        fetch(`${BoardURL}/games/`, {
            method: "POST",
            body: JSON.stringify({
                difficulty: 0
            })
        })
        .then(resp => resp.json())
        .then(newGame => {
            this.setState({
                game: newGame,
                gameId: newGame.id
            })
        })
    }

    renderCells = (row, column) => {
        if (this.state.game.board[row][column] === "_") {
            return "_"
        }
        else if (this.state.game.board[row][column] === "F") {
            return "F"
        }
        else if (this.state.game.board[row][column] === "*") {
            return "*"
        }
        else {
            return this.state.game.board[row][column]
        }
    }

    
    render() {
        return (
            <div className='Board'>
                <div className='Board-Border'>
                    {this.state.game.board.map((row, i) => {
                        return (
                            <div key={i} className='row'>
                                {row.map((col, j) => {
                                    return (
                                        <span key={j}
                                        className='column'
                                        onClick={() => this.checkBox(i, j)}
                                        onContextMenu={() => this.flagbox(i, j)}>
                                          {this.renderCells(i, j)}
                                        </span>
                                    )
                                })}
                            </div>
                        )
                    })}  
                </div>
            </div>
        );
    }
}

export default Minesweeper