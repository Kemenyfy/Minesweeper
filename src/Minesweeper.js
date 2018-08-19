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

    clickedSquare = (row, column) => {
        fetch(`${BoardURL}/games/${this.state.gameId}/check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                "row": row,
                "col": column
            })
        })
        .then(resp => resp.json())
        .then(newGame => {
            this.setState({
                game: newGame
            })
            if (this.state.game.state === "lost") {
                console.log('You Lose!')
            }
            else if (this.state.game.state === "won") {
                console.log('You Won!')
            }
        })
        .catch(console.error)
    }

    flaggedSquare = (row, column) => {
        fetch(`${BoardURL}/games/${this.state.gameId}/flag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "row": row,
                "col": column
            })
        })
        .then(resp => resp.json())
        .then(newGame => {
            this.setState({
                game: newGame
            })
        })
    }

    
    render() {
        return (
            <div className='Board'>
                <div className='Board-Border'>
                    {this.state.game.board.map((row, i) => {
                        return (
                            <div key={i} className='row square'>
                                {row.map((col, j) => {
                                    return (
                                        <span key={j}
                                        className='column square'
                                        onClick={() => this.clickedSquare(i, j)}
                                        onContextMenu={() => this.flaggedSquare(i, j)}>
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