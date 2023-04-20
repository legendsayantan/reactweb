import React from "react";

function Screenery({shown, goBack}) {
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
                    <h2 className={"page-heading"} style={{
                        height: '30px',
                        width: '100%',
                        margin: 0,
                        textAlign: "center",
                        justifyContent: "center"
                    }}>Screenery</h2>
                </div>
                <div className={'page-content'}>
                    <h3>Features</h3>
                    <ol dir="auto">
                        <li>
                            Prevent Android Screen from automatically turning off, until You do it.
                        </li>
                        <li>
                            Set Custom Screen Wake Timers for your device.
                        </li>
                        <li>
                            Turns off screen and pauses device media when you fall asleep, thanks to its
                            Automatic Sleep Detection Capabilities.
                        </li>
                        <li>
                            Android Screen too bright even at lowest brightness? Screenery can darken your
                            screen up to <strong>90% more</strong> than lowest brightness.
                        </li>
                        <li>
                            Easy and Customisable Controls, from Quick Settings Panel or Floating
                            Bubble.
                        </li>
                        <li>
                            More features are about to be added.
                        </li>
                    </ol>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <h3 className={'page-content'}>Install On :</h3>
                    <div className="button-glass" style={{display: 'block', margin: '10px', padding: '5px 10px'}}
                         onClick={() => {
                             //download file from GitHub
                             window.open('https://github.com/legendsayantan/Screenery/blob/master/app/release/app-release.apk?raw=true')
                         }}>
                        <img style={{height: '50px'}} src={'https://img.icons8.com/fluency/2x/android-os.png'}/>
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
                             window.open('https://github.com/legendsayantan/Screenery')
                         }}><p style={{margin: 0, alignItems: "baseline"}}>
                        Source Code
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Screenery;