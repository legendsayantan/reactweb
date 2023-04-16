import TypingAnimation from "../components/TypingAnimation";
import React, {useCallback, useEffect, useState} from "react";
import "./Homepage.css"
import {getAppStates} from "../App";
function Homepage({shown,switchState}){
    const [gamePlay,setGamePlay] = useState(-1);
    const key = useCallback((event) => {
        switch (event.key){
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
                switchState(getAppStates().software);
                break;
            case "g":
            case "G":
                window.location.href = "https://github.com/legendsayantan"
                break;
        }
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", key, false);
        return () => {
            document.removeEventListener("keydown", key, false);
        };
    }, [key]);
    return(
      <div style={{width:window.innerWidth}} className={`home ${shown?'':'hide'}`}>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center",fontSize:"30px",color: '#FF9506'}}>
              <TypingAnimation text={"Hi! I'm Sayantan..."} speed={150} delay={500}/>
          </div>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center",fontSize:"14px",color: '#FF9506'}}>
              <TypingAnimation text={"want to know me?"} delay={4000} bold={false}/>
          </div>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center",fontSize:"13px",color: '#FF9506',marginTop:'15px'}}>
              <div style={{cursor:"pointer"}} onClick={()=>{
                  setGamePlay(1);
              }}>
                  <TypingAnimation text={"[Y]es"} delay={6000} bold={false}/>
              </div>
              <div style={{width:'15px'}}></div>
              <div style={{cursor:"pointer"}} onClick={()=>{
                  setGamePlay(0);
              }}>
                  <TypingAnimation text={"[N]o"} delay={6500} bold={false}/>
              </div>
          </div>
          <div style={{height:'50vh'}}>
              {gamePlay===0?<div>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"center",fontSize:"14px",color: '#FF9506',marginTop:'30px'}}>
                      <TypingAnimation text={"what would interest you?"} bold={false}/>
                  </div>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"center",fontSize:"13px",color: '#FF9506',marginTop:'15px'}}>
                      <div style={{cursor:"pointer"}} onClick={()=>{
                          switchState(getAppStates().articles);
                      }}>
                          <TypingAnimation text={"[A]rticles"} delay={3000} bold={false}/>
                      </div>
                      <div style={{width:'15px'}}></div>
                      <div style={{cursor:"pointer"}} onClick={()=>{
                          switchState(getAppStates().software);
                      }}>
                          <TypingAnimation text={"[S]oftware"} delay={4000} bold={false}/>
                      </div>
                      <div style={{width:'15px'}}></div>
                      <div style={{cursor:"pointer"}} onClick={()=>{
                          window.location.href = "https://github.com/legendsayantan"
                      }}>
                          <TypingAnimation text={"[G]ithub"} delay={5000} bold={false}/>
                      </div>
                  </div>
              </div>:''}
          </div>
      </div>
    );
}
export default Homepage;