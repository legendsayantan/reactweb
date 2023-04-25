import "./Software.css";
import React from "react";

const Software = ({name, desc, imageUrl, scale, onClickHandler,mobile}) => {
    const showimage = (imageUrl?.trim()?.length || 0) > 0;
    return (
        <div className="software-card" onClick={onClickHandler} style={{
            width: mobile?'85vw':'250px',
            height: mobile?'40px':'100px'
        }}>
            <div className="software-card-flex">
                <img src={imageUrl} className="software-card_image"
                     style={{display: `${showimage ? "block" : "none"}`, transform: `scale(${scale})`}} alt={''}/>
                <h4 style={{
                    height: "25px",
                    margin: "10px",
                    textAlign: "center",
                    alignContent: "center",
                    color: "#FF9506"
                }}>{name}</h4>
            </div>
            {mobile ||
                <p style={{color: "#ffbc62", margin: "0px 10px 10px 10px"}}>{desc}</p>
            }
        </div>
    )
}
export default Software;