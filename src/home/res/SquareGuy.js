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
        const {isBlinking} = this.state;
        return (
            <div style={{height:'75px',width:'75px',transform:'scale(1)',opacity:'0.7'}}>
                <svg viewBox="0 0 51 51" style={{position: "absolute"}}>
                    <rect x="0.5" y="0.5" width="50" height="50" rx="10" ry="10" fill="none" stroke="#ffffff" strokeWidth="2"/>
                </svg>
                <svg viewBox="0 0 51 51" style={{position: "absolute"}}>
                    <ellipse id="left-eye" cx="30" cy="20" rx="3" ry="5" fill="none" stroke="#ffffff"
                             strokeWidth="2" className={isBlinking ? 'blink' : ''}/>
                    <ellipse id="right-eye" cx="42" cy="20" rx="3" ry="5" fill="none" stroke="#ffffff"
                             strokeWidth="2" className={isBlinking ? 'blink' : ''}/>
                </svg>
            </div>
        );
    }
}

export default SquareGuy;