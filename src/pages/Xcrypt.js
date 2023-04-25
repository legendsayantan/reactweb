import "./Pages.css"
import React from "react";
import doViaAdb, {getAdbModes} from "../js/adb";

function Xcrypt({shown, goBack}) {
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
                        justifyContent: "center"
                    }}><img
                        src={'https://user-images.githubusercontent.com/69689739/190592603-f8215e2f-ab47-4701-aead-8d01a14245b1.png'}
                        alt={''}/></div>
                </div>
                <div className={'page-content'} style={{marginTop: '75px'}}>
                    <h3>Why Xcrypt?</h3>
                    <ul>
                        <li>
                            <p>Xcrypt is open-source and operates fully offline, no data ever leaves your phone or
                                computer. No analytics data is collected. The primary goal is to protect your privacy,
                                not to invade it.</p>
                        </li>
                        <li>
                            <p>Encrypt or Decrypt single or bulk files using 128-bit AES encryption, very simple to work
                                with.</p>
                        </li>
                        <li>
                            <p>Xcrypt doesn’t store the file in some kind of “private” folder, rather keeps it at its
                                original location. So you never lose the encrypted files even if you uninstall
                                Xcrypt.</p>
                        </li>
                        <li>
                            <p>Xcrypt is cross-compatible, it’s entirely possible to encrypt a file from one device,
                                share to another device then decrypt there using the same key. Even from Android to
                                Windows and vice versa.</p>
                        </li>
                        <li>
                            <p>Xcrypt autosaves the file paths you encrypt, and also the 16 digit encryption key to
                                relieve you of the hassle of remembering yourself.</p>
                        </li>
                        <li>
                            <p>Want to decrypt a file to use once, or encrypt and share at once? Xcrypt Single File
                                Operation Mode makes it easier with features like auto deletion.</p>
                        </li>
                    </ul>
                </div>
                <div className={'page-content'}>
                    <h3>Use Cases</h3>
                    <ul>
                        <li>
                            <p>Hide files from other people, as simple as that.</p>
                        </li>
                        <li>
                            <p>Stop suspicious apps from accessing all your files and reading the contents of your
                                confidential documents.</p>
                        </li>
                        <li>
                            <p>Encrypt files before sharing to someone, to prevent access to third parties or any
                                middle-men .</p>
                        </li>
                    </ul>
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
                             window.open('https://github.com/legendsayantan/Xcrypt/blob/master/app/release/app-release.apk?raw=true')
                         }}>
                        <img style={{height: '50px'}} src={'https://img.icons8.com/fluency/2x/android-os.png'}/>
                    </div>
                    <div className="button-glass" style={{display: 'block', margin: '10px', padding: '5px 10px'}}
                         onClick={() => {
                             //open GitHub releases
                             window.open('https://github.com/legendsayantan/xcrypt-windows/releases')
                         }}>
                        <img style={{height: '50px'}} src={'https://img.icons8.com/color/2x/windows-10.png'}/>
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
                             window.open('https://github.com/legendsayantan/Xcrypt')
                         }}><p style={{margin: 0, alignItems: "baseline"}}>
                        Source Code for Android
                    </p>
                    </div>
                    <div className="button-glass" style={{display: 'block', margin: '10px', padding: '5px 10px'}}
                         onClick={() => {
                             //open in new tab
                             window.open('https://github.com/legendsayantan/Xcrypt-windows')
                         }}>
                        <p style={{margin: 0, alignItems: "center"}}>
                            Source Code for Windows
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Xcrypt