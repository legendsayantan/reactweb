import "./Header.css"
import React from "react";

function Homelink({homeclick}) {
    //get the base url
    let url = window.location.hostname;
    let name = url.replace("legendsayantan", "LegendSayantan");
    return (
        <div id="bottom_layer_homelink" onClick={homeclick}>
            <div id={"top_layer_homelink"}>
                <h2 className={'cursiveHeader'}>{name}</h2>
            </div>
        </div>
    );
}

export default Homelink;