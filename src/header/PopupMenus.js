import {useRef, useState} from "react";
import Menu from "./Menu";
import Bubble from "../components/Bubble";
import "./Header.css"
import app, {getAppStates} from "../App";
import React from "react";

const PopupMenus = ({mobile, articles, software}) => {
    const [showMenus, setShowMenus] = useState(false);
    const randomPos = () => {
        return {
            X: Math.random() * 10 - 5,
            Y: Math.random() * 5,
            Rotate: Math.random() * 20 - 10
        }
    }
    const [positions, setPositions] = useState([randomPos(), randomPos(), randomPos()])

    const handleHover = () => {
        if (showMenus) return
        if (mobile) {
            document.getElementById("bottom_layer_homelink").style.transition = "0.5s";
            document.getElementById("bottom_layer_homelink").style.transform = "translateX(-105%)";
        }
        if (poppedIndex !== 0) setPoppedIndex(0)
        setPositions([randomPos(), randomPos(), randomPos()])
        setShowMenus(true);
    }
    const handleLeave = () => {
        setShowMenus(false)
        setTimeout(() => {
            if (mobile) {
                document.getElementById("bottom_layer_homelink").style.transition = "0.5s";
                document.getElementById("bottom_layer_homelink").style.transform = "translateX(0%)";
            }
        }, 800)
    }
    const [poppedIndex, setPoppedIndex] = useState(0)
    const openArticles = () => {
        setPoppedIndex(1)
        articles()
    }
    const openSoftware = () => {
        setPoppedIndex(2)
        software()
    }
    const openGithub = () => {
        setPoppedIndex(3)
        window.open("https://github.com/legendsayantan", "_blank")
    }
    const onMouseMove = (event) => {
        event.stopPropagation()
    }
    return (
        <div onMouseMove={onMouseMove} onMouseLeave={handleLeave}
             style={{position: "absolute", right: 0, display: "flex", flexDirection: "row"}}>
            <div className={`slide-up ${showMenus ? 'show' : ''}`} style={{transitionDelay: '0.4s'}}>
                <Bubble text="Articles" clickHandler={openArticles} position={positions[0]} popped={poppedIndex === 1}/>
            </div>
            <div className={`slide-up ${showMenus ? 'show' : ''}`} style={{transitionDelay: '0.2s'}}>
                <Bubble text="Software" clickHandler={openSoftware} position={positions[1]} popped={poppedIndex === 2}/>
            </div>
            <div className={`slide-up ${showMenus ? 'show' : ''}`} style={{transitionDelay: '0s'}}>
                <Bubble text="Github" clickHandler={openGithub} position={positions[2]} popped={poppedIndex === 3}/>
            </div>
            <div onMouseEnter={handleHover}>
                <Menu/>
            </div>
        </div>
    );
}
export default PopupMenus;