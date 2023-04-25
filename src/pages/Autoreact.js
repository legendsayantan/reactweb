import React from "react";

function Autoreact({shown,goBack}){
    return(
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
                    }}>AutoReact</h2>
                </div>
                <div className={'page-content'}>
                    <h3>What actually is this?</h3>
                    <p>
                        This android app / browser extension is a custom browser , integrated with a bot that can
                        automatically scroll and/or react on posts in social media platforms like Facebook and
                        Instagram, reducing your hassle to do these manually. Also, this blocks some fb ads/sponsored
                        posts.
                    </p>
                </div>
                <div className={'page-content'}>
                    <h3>How does it know the suitable reaction for every post?</h3>
                    <p>
                        Well... it doesn't. It scans the already existing reactions other people provided and just
                        simply goes with the majority.
                    </p>
                    <p>
                        (If a post has no reactions yet, this bot would skip the post too)
                    </p>
                </div>
                <div className={'page-content'}>
                    <h3>Known bugs</h3>
                    <p>
                        Sometimes , if you set too high auto scrolling speed and also use auto reaction, Auto reaction
                        might stop working after some time. This happens when the Auto reaction bot cannot keep up with
                        the speed of posts being rendered and scrolled.
                    </p>
                    <h5>So... Could I not make the reaction bot faster?</h5>
                    <p>
                        No. Reacting too fast might make you sus in the eyes of facebook, thus your account might get
                        temporarily restricted from reactions.
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
                        <img style={{height: '50px'}} src={'https://img.icons8.com/fluency/2x/android-os.png'} alt={''}/>
                    </div>
                    <div className="button-glass" style={{display: 'block', margin: '10px', padding: '5px 10px'}}
                         onClick={() => {
                             //open GitHub releases
                             window.open('https://github.com/legendsayantan/autoreact/releases')
                         }}>
                        <img style={{height: '50px'}}
                             src={'https://www.freepnglogos.com/uploads/google-chrome-png-logo/google-chrome-logo-png-0.png'} alt={''}/>
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
}export default Autoreact