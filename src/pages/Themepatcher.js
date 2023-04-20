import doViaAdb, {getAdbModes} from "../js/adb";
import React, {useState} from "react";

function Themepatcher({shown,goBack}){
    const [connected, setConnected] = useState(false);
    const [waitingForAdb,setWaitingForAdb] = useState(false)
    const [doneMessage,setDoneMessage] = useState('')
    const codes = require('../data/patcher-codes.json')
    return (
        <div className={`${shown?'showpage':'hidepage'}`} style={{width:window.innerWidth,height:window.innerHeight-150,display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <div className={`page`} style={{overflow:"auto"}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img alt={''} style={{
                        height: '35px',
                        width: '35px',
                        filter: 'invert(56%) sepia(87%) saturate(1230%) hue-rotate(352deg) brightness(103%) contrast(108%)'
                    }} src="https://www.svgrepo.com/show/450517/back.svg" onClick={goBack}/>
                    <h3 className={"page-heading"} style={{
                        height: '30px',
                        width: '100%',
                        margin: '0 30px 0 0',
                        textAlign: "center",
                        justifyContent: "center"
                    }}>ThemePatcher</h3>
                </div>
                <div style={{display: 'flex', flexDirection: 'row',justifyContent:"center"}}>
                    <h6 className={'text'}>Tired of overpriced themes? Unlock anything, for free!</h6>
                </div>
                <section className="center"
                         style={{margin:'0px',padding:'0px',maxWidth:'100%',alignItems:'center',display:connected?'none':'block'}}>
                    <h4 style={{textAlign:"center",justifyContent:"center",alignItems:"center",marginBottom:0}}>Make sure to follow these steps :</h4>
                    <div id="connector" className="center" style={{flexDirection:'column',alignItems:'center'}}>
                        <ol className="center" style={{flexDirection:'column'}}>
                            <li >Turn on developer options in the Android device you want to unlock themes for.</li>
                            <li >Enable USB debugging inside developer options.</li>
                            <li >Disable Permission Monitoring inside Developer Options.</li>
                            <li >Connect the Android device to this device using USB.</li>
                            <li >Click on the button below.</li>
                        </ol>
                        <div className="button-glass" style={{margin:'0px'}} onClick={()=>{
                            setWaitingForAdb(true)
                            doViaAdb(getAdbModes().connect, (e) => {
                                if(e===0){
                                    doViaAdb(getAdbModes().execute, (e,data) => {
                                        console.log(data)
                                        if(e===0){
                                            setConnected(true)
                                            setWaitingForAdb(false)
                                        }else console.log('error')
                                    },'settings get secure oppo_device_name').then()
                                }else console.log('error')
                            }).then()
                        }}>
                            <p style={{margin:'0px'}}>
                                Start
                            </p>
                        </div>
                    </div>
                </section>
                <div style={{display:(waitingForAdb)?'flex':'none',flexDirection:'row',justifyContent:"center",color:'#0154b4',fontWeight: "bold",margin:'0px 20px'}}>
                    <span>Please allow the permission popup on your mobile screen.</span>
                </div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
                    <div className="button-glass" style={{display:connected?'block':'none',margin:'0px',padding:'5px 10px'}} onClick={()=>{
                        doViaAdb(getAdbModes().disconnect, (e) => {
                            setConnected(false)
                            goBack()
                        }).then()
                    }}>
                        <p style={{margin:'0px'}}>
                            Exit
                        </p>
                    </div>
                </div>
                <section className="center"
                         style={{margin:'20px',padding:'0px',maxWidth:'100%',alignItems:'center',display:(connected && !waitingForAdb)?'block':'none'}}>
                    <h4 style={{textAlign:"center",justifyContent:"center",alignItems:"center"}}>Activate any trial theme / font / wallpaper from <strong>Theme Store</strong>, then Select below.</h4>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
                        <div className="button-glass" style={{display:connected?'block':'none',margin:'10px',padding:'5px 10px'}} onClick={()=>{
                            doViaAdb(getAdbModes().execute, (e) => {
                                if(e!==0)setDoneMessage('Theme should be activated permanently now!')
                                else setDoneMessage('Error! Please make sure you followed all the steps correctly.')
                            },codes[0]).then()
                        }}>
                            <p style={{margin:'5px'}}>
                                Theme
                            </p>
                        </div>
                        <div className="button-glass" style={{display:connected?'block':'none',margin:'10px',padding:'5px 10px'}} onClick={()=>{
                            doViaAdb(getAdbModes().execute, (e) => {
                                if(e!==0)setDoneMessage('Font should be activated permanently now!')
                                else setDoneMessage('Error! Please make sure you followed all the steps correctly.')
                            },codes[1]).then()
                        }}>
                            <p style={{margin:'5px'}}>
                                Font
                            </p>
                        </div>
                        <div className="button-glass" style={{display:connected?'block':'none',margin:'10px',padding:'5px 10px'}} onClick={()=>{
                            doViaAdb(getAdbModes().execute, (e) => {
                                if(e!==0)setDoneMessage('Wallpaper should be activated permanently now!')
                                else setDoneMessage('Error! Please make sure you followed all the steps correctly.')
                            },codes[2]).then()
                        }}>
                            <p style={{margin:'5px'}}>
                                Wallpaper
                            </p>
                        </div>
                    </div>
                    <h5 style={{textAlign:"center",justifyContent:"center",alignItems:"center"}}>{doneMessage}</h5>
                </section>
            </div>
        </div>
    )
}
export default Themepatcher