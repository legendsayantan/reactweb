import React, {useEffect, useRef, useState} from 'react';
import './Bubble.css';

const Bubble = ({ text,clickHandler,position,popped }) => {
    // Define the style object for the bubble
    var ref = useRef()
    const bubbleStyle = {
        transform: `translate(${position.X}px, ${position.Y}px) rotate(${position.Rotate}deg)`,
        borderRadius: '50%',
        border: '1px solid white',
        borderBottom: '2px',
        width: position.X+55,
        marginTop: position.Y+5,
        height: 40,
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '25px',
    };
    var textStyle = {
        textAlign:'center',
        color:"white",
        fontFamily:'cursive',
        fontSize:'10px',
        transform: `rotate(${-1*position.Rotate}deg)`,
    }

    return (
        <div ref={ref} onClick={clickHandler} className={popped?'pop':'spawn'}>
            <div style={bubbleStyle} className='circle'>
                <div className="glare"></div>
                <p style={textStyle}>{text}</p>
            </div>
        </div>
    );
};

export default Bubble;
