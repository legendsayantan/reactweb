import React from 'react';
import "./AppItem.css"

const AppItem = ({ info, onClick }) => {
    var desc = {
        margin:0,
        fontSize:'12px',
        fontFamily:'Consolas'
    }
    return (
        <div className={'appitem'} onClick={onClick}>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", margin: "0px", padding: "0px" }}>
                <p style={{margin:0,fontSize:'15px',color:'#ffbf66'}}>
                    {info.id}
                </p>
                <p style={{ margin: "0px 10px", fontSize: "small" ,color:'#FF9506'}}>{info.removal===undefined?'Removal : Unknown':'Removal : '+info.removal}</p>
            </div>
            <p style={desc}>
                {info.description}
                {info.url && (
                    <>
                        {info.url.startsWith("link-->") ? (
                            <a style={{ margin: "0px 10px" ,color:'#91d4ff'}} target="_blank" href={info.url.replace("link-->", "")} onClick={(e) => { e.stopPropagation(); }} rel="noreferrer">Link</a>
                        ) : (
                            <a style={{ margin: "0px 10px" ,color:'#91d4ff'}} target="_blank" href={info.url} onClick={(e) => { e.stopPropagation(); }} rel="noreferrer">Reference</a>
                        )}
                    </>
                )}
            </p>
        </div>
    );
}

export default AppItem;
