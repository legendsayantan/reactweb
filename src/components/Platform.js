import React from "react";
import "./Platform.css";
const Platform = ({speed = 0})=> {
    return (
        <div className={`platform ${speed>0 ? 'moving' : ''}`} style={{animationDuration:`${0.25/speed}s`}}></div>
    );
}
export default Platform;
