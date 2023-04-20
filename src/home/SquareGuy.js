import React, {useEffect, useRef, useState} from 'react';
import './SquareGuy.css';

class SquareGuy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: "blue",
            hover: false,
            isBlinking: false,
        }
    }

    componentDidMount() {
        this.blinkInterval = setInterval(() => {
            const shouldBlink = Math.random() < 0.5;
            this.setState({isBlinking: shouldBlink});
        }, Math.floor(Math.random() * 5000) + 5000);
    }

    componentWillUnmount() {
        clearInterval(this.blinkInterval);
    }

    render() {
        var eyeStyle = {
            position: "absolute",
            top: 75,
            left: 150,
        }
        const {isBlinking} = this.state;
        return (
            <div>
                <div>
                    <svg viewBox="0 0 105 105" style={{position: "absolute"}}>
                        <rect x="1" y="1" width="100" height="100" rx="20" ry="20" fill="none" stroke="#ff9500"/>
                    </svg>
                    <svg viewBox="0 0 100 50" style={eyeStyle}>
                        <ellipse id="left-eye" cx="25" cy="25" rx="7" ry="10" fill="none" stroke="#ff9500"
                                 strokeWidth="2" className={isBlinking ? 'blink' : ''}/>
                        <ellipse id="right-eye" cx="50" cy="25" rx="7" ry="10" fill="none" stroke="#ff9500"
                                 strokeWidth="2" className={isBlinking ? 'blink' : ''}/>
                    </svg>
                </div>
            </div>
        );
    }
}

export default SquareGuy;