import React from 'react';

const panel = props => {
    const text = props.gameStatus;
    
    return (
        <React.Fragment>
            <button onClick={props.clicked}>Start Game</button>
            <p>{text}</p>
        </React.Fragment>
    )
}

export default panel;