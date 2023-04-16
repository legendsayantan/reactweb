import "./Pages.css";
import {useState} from "react";
import React from "react";
function Debloat({shown}) {
    shown = true;
    const [connected, setConnected] = useState(false);
    var foundApps = []
    return (
        <div className={`page ${shown ? 'show' : ''}`} style={{height:"max-content"}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <img style={{
                    height: '35px',
                    width: '35px',
                    filter: 'invert(56%) sepia(87%) saturate(1230%) hue-rotate(352deg) brightness(103%) contrast(108%)'
                }} src="https://www.svgrepo.com/show/450517/back.svg"/>
                <h3 className={"page-heading"} style={{
                    height: '30px',
                    width: '100%',
                    margin: 0,
                    textAlign: "center",
                    justifyContent: "center"
                }}>Online Android Debloater</h3>
            </div>
            <div className="text">
                <h5>Have a phone full of bloatwares? Clean them up without installing anything!</h5>
            </div>
            <section className="center"
                     style={{margin:'0px',padding:'0px',maxWidth:'100%',flexDirection:'column',alignItems:'center',display:connected?'none':'block'}}>
                <div id="connector" className="center" style={{flexDirection:'column',alignItems:'center'}}>
                    <ol className="center" style={{flexDirection:'column'}}>
                        <li >Turn on developer options in the Android device you want to debloat.</li>
                        <li >Enable USB debugging in developer options.
                        </li>
                        <li >Connect the Android device to this device
                            using USB.
                        </li>
                        <li >Click on the button below.</li>
                    </ol>
                    <div className="button-glass" style={{margin:'0px'}}>
                        <p style={{margin:'0px'}}>
                        Start
                    </p>
                </div>
        </div>
</section>
</div>
)
}

export default Debloat;