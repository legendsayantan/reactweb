import React from "react";

function Webmimic({shown, goBack}) {
    return (
        <div className={`${shown ? 'showpage' : 'hidepage'}`} style={{
            width: window.innerWidth,
            height: window.innerHeight - 150,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        }}>
            <div className={`page`} style={{overflow: "auto"}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img alt={''} style={{
                        height: '35px',
                        width: '35px',
                        filter: 'invert(56%) sepia(87%) saturate(1230%) hue-rotate(352deg) brightness(103%) contrast(108%)'
                    }} src="https://www.svgrepo.com/show/450517/back.svg" onClick={goBack}/>
                    <div className={"page-heading"} style={{
                        height: '30px',
                        width: '100%',
                        margin: 0,
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <img style={{height: '40px'}}
                             src={'https://rawcdn.githack.com/legendsayantan/WebMimic/7f790100059935a6cf05def8c54cc56416a9ae8d/extension/WebMimic/images/icon.png'}
                             alt={''}/>
                        <h3 style={{margin: '0px 10px'}}>WebMimic</h3>
                    </div>
                </div>
                <div className={'page-content'}>
                    <h3>What actually is this?</h3>
                    <p>
                        This android app / browser extension is a custom browser , integrated with a specific algorithm
                        that can detect and learn what you're doing on a webpage then simulate them whenever needed.
                    </p>
                </div>
                <div className={'page-content'}>
                    <h3>But why?</h3>
                    <p>
                        There are times when we need to check/submit something on a website in a regular basis, and we
                        don't want to hurt our hand everytime to do that. This is a project aimed to replace the
                        repetitiveness of our hands with automation.
                    </p>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <h3 className={'page-content'}>Use On :</h3>
                    <div className="button-glass" style={{display: 'block', margin: '10px', padding: '5px 10px'}}
                         onClick={() => {
                             //download file from GitHub
                             window.open('https://github.com/legendsayantan/Autoreact/blob/master/app/release/app-release.apk?raw=true')
                         }}>
                        <img style={{height: '50px'}} src={'https://img.icons8.com/fluency/2x/android-os.png'}/>
                    </div>
                    <div className="button-glass" style={{display: 'block', margin: '10px', padding: '5px 10px'}}
                         onClick={() => {
                             //open GitHub releases
                             window.open('https://github.com/legendsayantan/autoreact/releases')
                         }}>
                        <img style={{height: '50px'}}
                             src={'https://www.freepnglogos.com/uploads/google-chrome-png-logo/google-chrome-logo-png-0.png'}/>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: '25px'
                }}>
                    <div className="button-glass" style={{display: 'block', margin: '10px', padding: '5px 10px'}}
                         onClick={() => {
                             //open in new tab
                             window.open('https://github.com/legendsayantan/autoreact')
                         }}><p style={{margin: 0, alignItems: "baseline"}}>
                        Source Code
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Webmimic