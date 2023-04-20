import './App.css';
import Header from "./header/Header";
import React, {useEffect, useState} from 'react';
import CircularGradient from "./background/CircularGradient";
import Platform from "./components/Platform";
import StarField from "./components/StarField";
import AllSoftwarePC from "./components/AllSoftwarePC";
import AllArticlesPC from "./components/AllArticlesPC";
import TypingAnimation from "./components/TypingAnimation";
import Homepage from "./home/Homepage";
import MarkdownPage from "./pages/MarkdownPage";
import Debloat from "./pages/Debloat";
import Themepatcher from "./pages/Themepatcher";
import software from "./components/Software";
import Xcrypt from "./pages/Xcrypt";
import Screenery from "./pages/Screenery";
import Autoreact from "./pages/Autoreact";
import Webmimic from "./pages/Webmimic";

var AppStates = {
    home: 0,
    articles: 1,
    software: 2,
    customPage: 3
};

function App() {
    const [portrait, setPortrait] = useState(window.innerWidth < window.innerHeight);
    const [platformSpeed, setPlatformSpeed] = useState(0);
    const handleWindowSizeChange = () => {
        setPortrait(window.innerWidth < window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    var footerStyle = {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100px",
        overflow: "hidden"
    }
    //states
    const [x, setX] = React.useState(0)
    const [y, setY] = React.useState(0)
    const [currentAppState, setCurrentAppState] = React.useState(AppStates.home)
    const [previousAppState,setPreviousAppState] = React.useState(AppStates.home)
    const [customPage,setCustomPage] = React.useState(0)
    const [customPageFile, setCustomPageFile] = React.useState('');
    const setAppState = (state) => {
        setCurrentAppState(state)
        setTimeout(() => {
            setPreviousAppState(state)
        }, 750)
    }
    useEffect(() => {
        console.log(currentAppState,previousAppState);
    }, [currentAppState,previousAppState]);
    const mouseMoveCallback = (event) => {
        setX(event.clientX / window.innerWidth);
        setY(event.clientY / window.innerHeight);
    }
    return (
        <div onMouseMove={mouseMoveCallback} style={{overflow:"hidden"}}>
            <CircularGradient x={x} y={y}/>
            <Header
                mobile={portrait}
                home={() => {
                    if (currentAppState === AppStates.home) {
                        window.location.hostname += "/";
                    }
                    setAppState(AppStates.home);
                }}
                articles={() => {
                    setAppState(AppStates.articles);
                }}
                software={() => {
                    setAppState(AppStates.software);
                }}
            />
            <div>
                <div style={{pointerEvents: 'none'}}>
                    <StarField count={25} width={window.innerWidth} height={window.innerHeight * 0.8}/>
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.home || previousAppState===AppStates.home) &&
                        <Homepage shown={currentAppState === previousAppState} switchState={(state) => {
                            setAppState(state);
                        }}/>
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.articles || previousAppState ===AppStates.articles) && !portrait &&
                        <AllArticlesPC shown={currentAppState === previousAppState}
                                       loadArticle={(article) => {
                                           if (article.isEmpty) return;
                                           setCustomPage(0)
                                           setAppState(AppStates.customPage);
                                           setCustomPageFile(article);
                                       }}/>
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px"}}>
                    {(currentAppState === AppStates.software ||previousAppState === AppStates.software ) && !portrait &&
                        <AllSoftwarePC shown={currentAppState === previousAppState}
                                       loadCustomPage={(page) => {
                                           setCustomPage(page)
                                           setAppState(AppStates.customPage)
                                       }}
                        />
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.customPage || previousAppState === AppStates.customPage) && <>
                        {customPage===0 && <MarkdownPage shown={currentAppState===previousAppState} file={customPageFile}/>}
                        {customPage===1 && <Debloat shown={currentAppState===previousAppState} goBack={()=>{setAppState(AppStates.software)}}/>}
                        {customPage===2 && <Themepatcher shown={currentAppState===previousAppState} goBack={()=>{setAppState(AppStates.software)}}/>}
                        {customPage===3 && <Xcrypt shown={currentAppState===previousAppState} goBack={()=>{setAppState(AppStates.software)}}/>}
                        {customPage===4 && <Screenery shown={currentAppState===previousAppState} goBack={()=>{setAppState(AppStates.software)}}/>}
                        {customPage===5 && <Autoreact shown={currentAppState===previousAppState} goBack={()=>{setAppState(AppStates.software)}}/>}
                        {customPage===6 && <Webmimic shown={currentAppState===previousAppState} goBack={()=>{setAppState(AppStates.software)}}/>}
                    </>}
                </div>
                <div style={footerStyle}>
                    <Platform speed={
                        (currentAppState!==AppStates.home&&previousAppState===AppStates.home)?5.5:platformSpeed
                    }/>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", color: '#0154b4',}}>
                        {portrait &&
                            <TypingAnimation text={
                                (currentAppState === AppStates.articles ? "Latest Articles" :
                                        (currentAppState === AppStates.software ? "Open Source Software and Tools" :
                                            "")
                                )
                            }/>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;
export let getAppStates = () => {
    return AppStates
}