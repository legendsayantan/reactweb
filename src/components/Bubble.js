import React, {useEffect, useRef, useState} from 'react';
import './Bubble.css';

const Bubble = ({ text,clickHandler,shouldModify }) => {
    // Define random values for the CSS transforms
    var randomX;
    var randomY ;
    var randomRotate;
    if(shouldModify){
        randomX = Math.random() * 10 - 5;
        randomY = Math.random() * 5;
        randomRotate = Math.random() * 20 - 10; // Random value between -10 and 10
    }
    // Define the style object for the bubble
    var ref = useRef()
    const bubbleStyle = {
        transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`,
        borderRadius: '50%',
        border: '1px solid white',
        borderBottom: '2px',
        width: randomX+55,
        marginTop: randomY+5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '25px',
    };
    var textStyle = {
        textAlign:'center',
        color:"white",
        fontFamily:'cursive',
        fontSize:'10px',
        transform: `rotate(${-1*randomRotate}deg)`,
    }
    return (
        <div ref={ref} onClick={clickHandler}>
            <div style={bubbleStyle} className='circle'>
                <div className="glare"></div>
                <p style={textStyle}>{text}</p>
            </div>
        </div>
    );
};

export default Bubble;
