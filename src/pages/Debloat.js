import "./Pages.css";
import {useState} from "react";
import React from "react";
import doViaAdb from "../js/adb"
import {getAdbModes} from "../js/adb";
import AppItem from "../components/AppItem";
import Popup from "../components/Popup";
function fetchAppDatabase(callback=(json)=>{}) {
    fetch('https://rawcdn.githack.com/0x192/universal-android-debloater/749820ca8616df97b81a2b51e0422f3ae7cd593c/resources/assets/uad_lists.json').then(async function (response) {
        return response.text();
    })
        .then(function (body) {
            callback(body)
        });
}
function createAppList(json,apps){
    let appInfos = []
    let allApps = JSON.parse(json); // Assuming json is the JSON string containing the AppInfo objects

    for (let str of apps) {
        let appInfo = appInfos.find(x => x.id === str);
        if (appInfo) continue;

        let app = { id: str, description: '' };
        if (!app.id || app.id.includes('package:/')) continue;

        for (let appInfo of allApps || []) {
            if (appInfo.id.trim() === app.id) {
                app = appInfo;
                break;
            }
        }

        if (app.description.includes('https://')) {
            let parts = app.description.split('(');
            let newDesc = '';

            for (let p of parts) {
                let part = p.split(')')[0];
                if (part.startsWith('https://') && !part.includes(' ')) {
                    app.url = part;
                } else {
                    newDesc = `${newDesc} ${part}`;
                }
            }

            if (!app.url) {
                let parts2 = newDesc.split(' ');
                newDesc = '';

                for (let part of parts2) {
                    if (part.startsWith('https://') && !part.includes(' ')) {
                        app.url = `link-->${part}`;
                    } else {
                        newDesc = `${newDesc} ${part}`;
                    }
                }
            }

            app.description = newDesc.trim();
        }

        appInfos.push(app);
    }
    return appInfos
}

function Debloat({shown,goBack}) {
    const [connected, setConnected] = useState(false);
    const [waitingForAdb,setWaitingForAdb] = useState(false)
    const [foundApps,setFoundApps] = useState([]);
    const [uninstallPackage,setUninstallPackage] = useState('');
    function uninstallApp(packageId) {
        doViaAdb(getAdbModes().execute,()=>{},"pm uninstall "+packageId).then()
    }

    return (
        <div className={`${shown?'showpage':'hidepage'}`} style={{width:window.innerWidth,height:window.innerHeight-150,display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <div className={`page`} style={{overflow:"auto"}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img alt={''} style={{
                        height: '35px',
                        width: '35px',
                        filter: 'invert(56%) sepia(87%) saturate(1230%) hue-rotate(352deg) brightness(103%) contrast(108%)'
                    }} src="https://www.svgrepo.com/show/450517/back.svg" onClick={goBack}/>
                    <h2 className={"page-heading"} style={{
                        height: '30px',
                        width: '100%',
                        margin: 0,
                        textAlign: "center",
                        justifyContent: "center"
                    }}>Online Android Debloater</h2>
                </div>
                <div style={{display: 'flex', flexDirection: 'row',justifyContent:"center"}}>
                    <h6 className={'text'}>Have a phone full of bloatwares? Clean them up without installing anything!</h6>
                </div>
                <section className="center"
                         style={{margin:'0px',padding:'0px',maxWidth:'100%',alignItems:'center',display:connected?'none':'block'}}>
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
                        <div className="button-glass" style={{margin:'0px'}} onClick={()=>{
                            setWaitingForAdb(true)
                            doViaAdb(getAdbModes().connect, (e) => {
                                if(e===0){
                                    setConnected(true)
                                    setWaitingForAdb(false)
                                    fetchAppDatabase((json)=>{
                                        doViaAdb(getAdbModes().loadApps, (e,data) => {
                                            if(e===0){
                                                let array = data.split(" ");
                                                let list = createAppList(json,array)
                                                setFoundApps(list);
                                            }else console.log('error')
                                        }).then()
                                    })
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
                    <span style={{display:foundApps.length>0?'block':'none',color:'#0154b4',fontWeight: "bold",margin:'0px 20px'}}>Apps found: {foundApps.length}</span>
                    <div className="button-glass" style={{display:connected?'block':'none',margin:'0px',padding:'5px 10px'}} onClick={()=>{
                        doViaAdb(getAdbModes().disconnect, (e) => {
                            setConnected(false)
                            setFoundApps([])
                            goBack()
                        }).then()
                    }}>
                        <p style={{margin:'0px'}}>
                            Exit
                        </p>
                    </div>
                </div>
                <section className="center"
                         style={{margin:'10px 0px',padding:'0px',maxWidth:'100%',alignItems:'center',display:connected?'flex':'none'}}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", overflowWrap: "anywhere" }}>
                        {foundApps.map(info => (
                            <div onClick={() => {
                                if(info.removal!=='Unsafe') {
                                    setUninstallPackage(info.id)
                                }
                            }} >
                                <AppItem info={info}/>
                            </div>

                        ))}
                    </div>
                </section>
            </div>
            {uninstallPackage==='' ||
                <div>
                    <Popup showInput={false} text={'Uninstall the app '+uninstallPackage+'?'} onContinue={()=>{
                        uninstallApp(uninstallPackage)
                        setUninstallPackage('')
                    }} onClose={()=>{
                        setUninstallPackage('')
                    }}/>
                </div>
            }
        </div>
)
}

export default Debloat;