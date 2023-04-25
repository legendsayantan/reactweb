import "./Article.css";
import React from "react";

function Article({name, desc, imageUrl, onClickHandler,mobile}) {
    const style={
        width: mobile?"85vw":"30vw",
        height: mobile?"14vh":"20vh"
    }
    return (
        <div className="article-card" onClick={onClickHandler} style={style}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <img src={imageUrl} alt={""} className="article-card_image"/>
            </div>
            <div style={{position: "absolute", bottom: '15px', left: 0, overflow: "hidden", width: mobile?"85vw":"30vw",
                height: mobile?"10vh":"auto"}}>
                <h4 style={{margin: "10px", textAlign: "center", alignContent: "center", color: "#FF9506"}}>{name}</h4>
                <p style={{color: "#ffbc62", margin: "5px 20px", fontSize: '12px'}}>{desc}</p>
            </div>
        </div>
    )
}

export default Article;