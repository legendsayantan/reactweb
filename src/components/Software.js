import "./Software.css";
import React from "react";

const Software = ({name, desc, imageUrl, scale, onClickHandler}) => {
    const showimage = (imageUrl?.trim()?.length || 0) > 0;
    return (
        <div className="software-card" onClick={onClickHandler}>
            <div className="software-card-flex">
                <img src={imageUrl} className="software-card_image"
                     style={{display: `${showimage ? "block" : "none"}`, transform: `scale(${scale})`}}/>
                <h4 style={{
                    height: "25px",
                    margin: "10px",
                    textAlign: "center",
                    alignContent: "center",
                    color: "#FF9506"
                }}>{name}</h4>
            </div>
            <p style={{color: "#ffbc62", margin: "0px 10px 10px 10px"}}>{desc}</p>
        </div>
    )
}
export default Software;