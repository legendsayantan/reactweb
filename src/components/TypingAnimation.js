import { useState, useEffect } from 'react';
import React from "react";
const TypingAnimation = ({ text, speed = 100 , delay =0,bold=true,onComplete=()=>{} }) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        setTimeout(()=>{
            let currentIndex = 0;
            const intervalId = setInterval(() => {
                setDisplayText(text.slice(0, currentIndex + 1));
                currentIndex++;
                if (currentIndex === text.length) {
                    clearInterval(intervalId);
                    onComplete()
                }
            }, speed);
            return () => clearInterval(intervalId);
        },delay)
    }, [text, speed]);

    return (
        <div>
            {bold
                ? <h3 style={{textAlign: "center"}}>{displayText}</h3>
                : <span style={{textAlign: "center"}}>{displayText}</span>
            }
        </div>
    );
};

export default TypingAnimation;
