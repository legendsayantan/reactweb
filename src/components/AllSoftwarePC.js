import Software from "./Software";
import React from "react";
import "./SectionsForPC.css"
import PointedStar from "./PointedStar";
import {getCustomPages} from "../App";
function AllSoftwarePC({shown,loadCustomPage}) {
    var flexStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '125px',
        pointerEvents: 'inherit',
    }
    let allData = require('../data/software.json');
    return (
        <div style={{
            width: window.innerWidth,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            margin: "auto"
        }}>
            <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transitionDelay:shown?'0.6s':'0s'}}>
                <h3 className={'heading'}>Open Source Software & Tools</h3>
            </div>
            <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transform:'translateY(20px)',zIndex:5,transitionDelay:shown?'0.4s':'0s'}}>
                <PointedStar />
            </div>
            <div style={flexStyle}>
                <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transitionDelay:shown?'0.4s':'0s'}}>
                    <Software
                        name={allData[0].name}
                        desc={allData[0].desc}
                        imageUrl={allData[0].imageurl}
                        scale={allData[0].scale}
                        onClickHandler={loadCustomPage(getCustomPages().debloat)}
                    />
                </div>
            </div>
            <div style={flexStyle}>
                <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transitionDelay:shown?'0.2s':'0s'}}>
                    <Software
                        name={allData[1].name}
                        desc={allData[1].desc}
                        imageUrl={allData[1].imageurl}
                        scale={allData[1].scale}
                    />
                </div>
                <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transitionDelay:shown?'0.3s':'0.1s'}}>
                    <Software
                        name={allData[2].name}
                        desc={allData[2].desc}
                        imageUrl={allData[2].imageurl}
                        scale={allData[2].scale}
                    />
                </div>
            </div>
            <div style={flexStyle}>
                <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transitionDelay:shown?'0s':'0.4s'}}>
                    <Software
                        name={allData[3].name}
                        desc={allData[3].desc}
                        imageUrl={allData[3].imageurl}
                        scale={allData[3].scale}
                    />
                </div>
                <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transitionDelay:shown?'0.1s':'0.3s'}}>
                    <Software
                        name={allData[4].name}
                        desc={allData[4].desc}
                        imageUrl={allData[4].imageurl}
                        scale={allData[4].scale}
                    />
                </div>
                <div className={`${shown ? 'visiblecard' : 'hiddencard'}`} style={{transitionDelay:shown?'0.2s':'0.2s'}}>
                    <Software
                        name={allData[5].name}
                        desc={allData[5].desc}
                        imageUrl={allData[5].imageurl}
                        scale={allData[5].scale}
                    />
                </div>
            </div>
        </div>
    );
}

export default AllSoftwarePC;