import {useRef, useState} from "react";
import Menu from "./Menu";
import Bubble from "../components/Bubble";
import "./Header.css"
import app, {getAppStates} from "../App";
import React from "react";
const PopupMenus = ({mobile,appState,articles,software})=>{
    const [showMenus, setShowMenus] = useState(false);
    const handleHover = () => {
        if(mobile){
            document.getElementById("bottom_layer_homelink").style.transition="0.5s";
            document.getElementById("bottom_layer_homelink").style.transform="translateX(-105%)";
        }
        setShowMenus(true);
    }
    const handleLeave = () => {
        setShowMenus(false)
        setTimeout(()=>{
            if(mobile){
                document.getElementById("bottom_layer_homelink").style.transition="0.5s";
                document.getElementById("bottom_layer_homelink").style.transform="translateX(0%)";
            }
        },800)
    }
    if(appState===getAppStates().none && showMenus)handleLeave()
    const openGithub = () => {
        window.location.href='https://github.com/legendsayantan'
    }
    const onMouseMove = (event)=>{
        event.stopPropagation()
    }
    return(
        <div onMouseMove={onMouseMove} onMouseLeave={handleLeave} style={{position:"absolute",right:0,display:"flex",flexDirection:"row"}}>
            <div className={`slide-up ${showMenus ? 'show' : ''}`} style={{transitionDelay:'0.4s'}}>
                <Bubble text="Articles" clickHandler={articles} shouldModify={showMenus}/>
            </div>
            <div className={`slide-up ${showMenus ? 'show' : ''}`} style={{transitionDelay:'0.2s'}}>
                <Bubble text="Software" clickHandler={software} shouldModify={showMenus}/>
            </div>
            <div className={`slide-up ${showMenus ? 'show' : ''}`} style={{transitionDelay:'0s'}}>
                <Bubble text="Github" clickHandler={openGithub} shouldModify={showMenus}/>
            </div>
            <div onMouseEnter={handleHover}>
                <Menu />
            </div>
        </div>
    );
}
export default PopupMenus;