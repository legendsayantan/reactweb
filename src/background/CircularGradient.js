import React, {useRef, useState} from 'react';
import './CircularGradient.css';

const CircularGradient = (props) => {
    return (
        <div className="circular-gradient" style={{
            background: `radial-gradient(circle at ${props.x * 100}% ${props.y * 100}%, #041f3f, #171717)`
        }}>
        </div>
    );
};

export default CircularGradient;
