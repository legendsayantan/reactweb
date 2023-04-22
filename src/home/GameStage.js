import SquareGuy from "./SquareGuy";
import "./scenes/scene0.css";
import "./scenes/scene1.css";
import "./scenes/scene2.css";
import "./scenes/scene3.css";
import "./scenes/scene4.css";
import Parachute from "./res/Parachute";
import {useEffect, useState} from "react";
import TypingAnimation from "../components/TypingAnimation";
import Cap from "./res/Cap";
import Books from "./res/Books";
import FallingPcs from "./res/FallingPcs";
import CJava from "./res/CJava";
import AndroidLogo from "./res/AndroidLogo";

function GameStage({setPlatformSpeed=(i)=>{}}) {
    const allTexts = require('./scenes/headings.json')
    const [level, setLevel] = useState(0);
    const [guyClass, setGuyClass] = useState('');
    const [parachuteClass, setParachuteClass] = useState('');
    const [capClass, setCapClass] = useState('');
    const [bookClass, setBookClass] = useState('');
    const [text, setText] = useState(allTexts[0]);
    const [showText, setShowText] = useState(false);
    const [showToSkip, setShowToSkip] = useState(false);
    useEffect(
        () => {
            setGuyClass('guy-'+level)
            setParachuteClass('parachute-'+level)
            setCapClass('cap-'+level)
            setBookClass('book-'+level)
            setText(allTexts[level])
            setShowText(false)
            if([1].includes(level)){
                setPlatformSpeed(1.75)
            }
            setTimeout(()=>{
                setShowText(true)
            }, 1000)
            setTimeout(()=>{
                setPlatformSpeed(0)
            }, 3500)
        }, [level]
    )
    return (<>
        <div id={'huh'} style={{
            bottom:'0',
            width: "100%",
            height: window.innerHeight-150,
            overflow:'visible'
        }}>
            <div style={{
                position: "absolute",
                bottom: '75px',
                left: window.innerWidth*0.3-25,
                justifyContent:"center",
                alignItems:"center",
            }} className={parachuteClass}>
                <Parachute/>
            </div>
            <div style={{
                position: "absolute",
                bottom: '55px',
                left: window.innerWidth*0.3+10,
                justifyContent:"center",
                alignItems:"center",
            }} className={capClass}>
                <Cap/>
            </div>
            <div style={{
                position: "absolute",
                bottom: 0,
                left: '30vw',
                justifyContent:"center",
                alignItems:"center",
            }} className={guyClass}>
                <SquareGuy />
            </div>
            <div style={{
                position: "absolute",
                bottom: 0,
                left: window.innerWidth*0.3+100,
                justifyContent:"center",
                alignItems:"center",
            }} className={bookClass}>
                <Books />
            </div>
            <div style={{
                position: "absolute",
                bottom: 0,
                left: window.innerWidth*0.3-75,
                justifyContent:"center",
                alignItems:"center",
            }}>
                <FallingPcs toFall={level===2} toSpread={level>2}/>
            </div>
            <div style={{
                position: "absolute",
                bottom: 125,
                opacity: 0.5,
                left: window.innerWidth*0.3,
                justifyContent:"center",
                alignItems:"center",
            }}>
                <CJava show={level===3} />
            </div>
            <div style={{
                position: "absolute",
                bottom: 0,
                opacity: 0.5,
                left: window.innerWidth*0.3+75,
                justifyContent:"center",
                alignItems:"center",
            }}>
                <AndroidLogo show={level===4} />
            </div>
            {showText &&
                <div style={{
                    position: "absolute",
                    top: '10vh',
                    left: window.innerWidth*0.22,
                    width: window.innerWidth*0.56,
                    justifyContent:"center",
                    alignItems:"center",
                    color: '#FF9506',
                }}>
                    <TypingAnimation text={text} bold={false} onComplete={()=>{
                        setShowToSkip(true)
                    }}/>
                </div>
            }
            {showToSkip &&
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    right: '10vw',
                    width: '50px',
                    justifyContent:"left",
                    alignItems:"left",
                    color: '#FF9506',
                    cursor: 'pointer',
                }} onClick={()=>{
                    if(level<allTexts.length-1)setLevel(level+1)
                    setShowToSkip(false)
                }}>
                    <TypingAnimation text={">>>"} speed={500} onComplete={()=>{
                        }}/>
                </div>
            }
        </div>
    </>)
}

export default GameStage