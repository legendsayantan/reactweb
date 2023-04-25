import TypingAnimation from "../components/TypingAnimation";
import React, {useCallback, useEffect, useState} from "react";
import "./Homepage.css"
import {getAppStates} from "../App";
import GameStage from "./GameStage";

function Homepage({shown, switchState, setPlatformSpeed,portrait}) {
    const [gamePlay, setGamePlay] = useState(-1);
    const [gameRunning, setGameRunning] = useState(false)
    const [blink, setBlink] = useState(false)
    const [pressedKey, setPressedKey] = useState('')
    const key = useCallback((event) => {
        setPressedKey('')
        switch (event.key) {
            case "y":
            case "Y":
                setGamePlay(1);
                break;
            case "n":
            case "N":
                setGamePlay(0);
                break;
            case "a":
            case "A":
                switchState(getAppStates().articles);
                break;
            case "s":
            case "S":
                if (gamePlay === 1) setGameRunning(true)
                else switchState(getAppStates().software)
                break;
            case "g":
            case "G":
                window.open("https://github.com/legendsayantan", "_blank")
                break;
            default:
                console.log(event.key);
                setPressedKey(event.key)
                break;
        }
    }, [gamePlay,pressedKey]);
    useEffect(() => {
        document.addEventListener("keydown", key, false);
        return () => {
            document.removeEventListener("keydown", key, false);
        };
    }, [key]);
    return (
        <div style={{width: window.innerWidth}} className={`home ${shown ? '' : 'hide'}`}>
            {gameRunning
                ? <GameStage mobile={portrait} setPlatformSpeed={setPlatformSpeed} onQuit={() => {
                    setGameRunning(false)
                    setGamePlay(-1)
                }} keypress={pressedKey} resetKey={()=>{
                    setPressedKey('')
                }}/>
                : <>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        fontSize: "30px",
                        color: '#FF9506'
                    }}>
                        <TypingAnimation text={"Hi! I'm Sayantan..."} speed={150} delay={500}/>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        fontSize: "14px",
                        color: '#FF9506'
                    }}>
                        <TypingAnimation text={"want to know me?"} delay={4000} bold={false}/>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        fontSize: "13px",
                        color: '#FF9506',
                    }}>
                        <div style={{cursor: "pointer"}} onClick={() => {
                            setGamePlay(1);
                        }}>
                            <TypingAnimation text={"[Y]es"} delay={6000} bold={false}/>
                        </div>
                        <div style={{width: '15px'}}></div>
                        <div style={{cursor: "pointer"}} onClick={() => {
                            setGamePlay(0);
                        }}>
                            <TypingAnimation text={"[N]o"} delay={6500} bold={false}/>
                        </div>
                    </div>
                    <div style={{height: '30vh'}}>
                        {gamePlay === 0 ? <div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                fontSize: "14px",
                                color: '#FF9506',
                                marginTop: '30px'
                            }}>
                                <TypingAnimation text={"what would interest you?"} bold={false}/>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                fontSize: "13px",
                                color: '#FF9506',
                                marginTop: '15px'
                            }}>
                                <div style={{cursor: "pointer"}} onClick={() => {
                                    switchState(getAppStates().articles);
                                }}>
                                    <TypingAnimation text={"[A]rticles"} delay={3000} bold={false}/>
                                </div>
                                <div style={{width: '15px'}}></div>
                                <div style={{cursor: "pointer"}} onClick={() => {
                                    switchState(getAppStates().software);
                                }}>
                                    <TypingAnimation text={"[S]oftware"} delay={4000} bold={false}/>
                                </div>
                                <div style={{width: '15px'}}></div>
                                <div style={{cursor: "pointer"}} onClick={() => {
                                    window.location.href = "https://github.com/legendsayantan"
                                }}>
                                    <TypingAnimation text={"[G]ithub"} delay={5000} bold={false}/>
                                </div>
                            </div>
                        </div> : <>
                            {gamePlay === 1 && <>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    fontSize: "13px",
                                    color: '#FF9506',
                                    cursor: "pointer",
                                    marginTop: '25px'
                                }} className={blink ? 'blink-infinite' : ''}
                                     onClick={() => {
                                         setGameRunning(true)
                                     }}>
                                    <TypingAnimation text={"[S]tart now"} bold={true}
                                                     onComplete={() => {
                                                         setBlink(true)
                                                     }}/>
                                </div>
                            </>}
                        </>}
                    </div>
                </>}
        </div>
    );
}

export default Homepage;