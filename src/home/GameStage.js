import SquareGuy from "./res/SquareGuy";
import "./scenes/scene0.css";
import "./scenes/scene1.css";
import "./scenes/scene2.css";
import "./scenes/scene3.css";
import "./scenes/scene4.css";
import "./scenes/scene5.css";
import "./scenes/scene6.css";
import "./scenes/scene7.css";
import Parachute from "./res/Parachute";
import {useEffect, useState} from "react";
import TypingAnimation from "../components/TypingAnimation";
import Cap from "./res/Cap";
import Books from "./res/Books";
import FallingPcs from "./res/FallingPcs";
import CJava from "./res/CJava";
import AndroidLogo from "./res/AndroidLogo";
import MoreLangs from "./res/MoreLangs";
import WebFrameworks from "./res/WebFrameworks";
import GitHubLogo from "./res/GitHubLogo";

function GameStage({setPlatformSpeed=()=>{},onQuit,keypress,resetKey}) {
    const allTexts = require('./scenes/headings.json')
    const [level, setLevel] = useState(0);
    const [guyClass, setGuyClass] = useState('');
    const [parachuteClass, setParachuteClass] = useState('');
    const [capClass, setCapClass] = useState('');
    const [bookClass, setBookClass] = useState('');
    const [gitLogoClass, setGitLogoClass] = useState('');
    const [text, setText] = useState(allTexts[0]);
    const [showText, setShowText] = useState(false);
    const [showToSkip, setShowToSkip] = useState(false);
    useEffect(
        () => {
            setGuyClass('guy-'+level)
            setParachuteClass('parachute-'+level)
            setCapClass('cap-'+level)
            setBookClass('book-'+level)
            setGitLogoClass('git-logo-'+level)
            setText(allTexts[level])
            setShowText(false)
            if([1,5].includes(level)){
                setPlatformSpeed()
            }
            setTimeout(()=>{
                setShowText(true)
            }, 1000)
            setTimeout(()=>{
                setPlatformSpeed()
            }, level===1? 3500 : 5000)
        }, [allTexts, level, setPlatformSpeed]
    )
    useEffect(()=> {
        resetKey()
        if(showToSkip){
            if(keypress==='Enter'||keypress===' '||keypress==='ArrowRight'){
                if(level<allTexts.length-1) {
                    setLevel(level + 1)
                    setShowToSkip(false)
                }else{
                    onQuit()
                }
            }else if(keypress==='Escape'||keypress==='q'||keypress==='Q'){
                onQuit()
            }
        }
    }, [allTexts.length, keypress, level, onQuit, resetKey, showToSkip])
    return (<>
        <div id={'game'} style={{
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
            <div style={{
                position: "absolute",
                bottom: 0,
                opacity: 0.5,
                left: window.innerWidth*0.3,
                justifyContent:"center",
                alignItems:"center",
            }}>
                <MoreLangs show={level===5} />
            </div>
            <div style={{
                position: "absolute",
                bottom: 0,
                opacity: 0.5,
                left: window.innerWidth*0.3,
                justifyContent:"center",
                alignItems:"center",
            }}>
                <WebFrameworks show={level===6} />
            </div>
            <div style={{
                position: "absolute",
                bottom: 0,
                left: window.innerWidth*0.3,
                justifyContent:"center",
                alignItems:"center",
            }} className={gitLogoClass}>
                <GitHubLogo />
            </div>
            {showText &&
                <div style={{
                    position: "absolute",
                    top: window.innerHeight*0.2,
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
                    else onQuit()
                    setShowToSkip(false)
                }}>
                    <TypingAnimation text={level<allTexts.length-1?">>>":"[Q]uit"} speed={500} onComplete={()=>{
                        }}/>
                </div>
            }
        </div>
    </>)
}

export default GameStage