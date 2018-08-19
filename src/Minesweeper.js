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

    
    render() {
        return (
            <div className='board'>
                <div className='board-border'>
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