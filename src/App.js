import './App.css';
import Header from "./header/Header";
import React, {useEffect, useState} from 'react';
import CircularGradient from "./background/CircularGradient";
import Platform from "./components/Platform";
import StarField from "./components/StarField";
import AllSoftware from "./components/AllSoftware";
import AllArticles from "./components/AllArticles";
import TypingAnimation from "./components/TypingAnimation";
import Homepage from "./home/Homepage";
import MarkdownPage from "./subpages/MarkdownPage";
import Debloat from "./subpages/Debloat";
import Themepatcher from "./subpages/Themepatcher";
import Xcrypt from "./subpages/Xcrypt";
import Screenery from "./subpages/Screenery";
import Autoreact from "./subpages/Autoreact";
import Webmimic from "./subpages/Webmimic";

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
    const [previousAppState, setPreviousAppState] = React.useState(AppStates.home)
    const [customPage, setCustomPage] = React.useState(0)
    const [customPageFile, setCustomPageFile] = React.useState('');
    useEffect(() => {
        const pathname = window.location.pathname
        if (pathname.startsWith("/articles")) {
            setAppState(AppStates.articles)
        } else if (pathname.startsWith("/software")) {
            setAppState(AppStates.software)
        } else if (pathname !== '/') {
            if (pathname.startsWith("/article/")) {
                console.log("art")
                setCustomPage(0)
                setCustomPageFile(pathname.replace("/article/", ""))
            } else {
                console.log("non")
                const softx = require("./data/software.json");
                for (let i = 0; i < softx.length; i++) {
                    if (softx[i].path === pathname) {
                        setCustomPage(i + 1)
                        break
                    }
                }
            }
            setAppState(AppStates.customPage)
        }
    }, [])
    const setAppState = (state) => {
        setCurrentAppState(state)
        setTimeout(() => {
            setPreviousAppState(state)
        }, 750)
    }
    useEffect(() => {
        console.log(currentAppState, previousAppState);
        var path;
        var name;
        switch (currentAppState) {
            case AppStates.software:
                path = "/software"
                name = "Software"
                break
            case AppStates.articles:
                path = "/articles"
                name = "Articles"
                break
            case AppStates.customPage:
                path = customPage === 0 ? '/article/' + customPageFile : require("./data/software.json")[customPage - 1].path
                name = customPage === 0 ? customPageFile : require("./data/software.json")[customPage - 1].name
                break
            default:
                path = "/"
                name = "LegendSayantan"
                break
        }
        window.history.replaceState(null, name, path)
    }, [currentAppState, previousAppState]);
    const mouseMoveCallback = (event) => {
        setX(event.clientX / window.innerWidth);
        setY(event.clientY / window.innerHeight);
    }
    return (
        <div onMouseMove={mouseMoveCallback} style={{overflow: "hidden"}}>
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
                    {(currentAppState === AppStates.home || previousAppState === AppStates.home) &&
                        <Homepage portrait={portrait} shown={currentAppState === previousAppState}
                                  switchState={(state) => {
                                      setAppState(state);
                                  }} setPlatformSpeed={(i) => {
                            setPlatformSpeed(i)
                        }}/>
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.articles || previousAppState === AppStates.articles) &&
                        <AllArticles shown={currentAppState === previousAppState} mobile={portrait}
                                     loadArticle={(article) => {
                                         if (article.isEmpty) return;
                                         setCustomPage(0)
                                         setAppState(AppStates.customPage);
                                         setCustomPageFile(article);
                                     }}/>
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px"}}>
                    {(currentAppState === AppStates.software || previousAppState === AppStates.software) &&
                        <AllSoftware shown={currentAppState === previousAppState}
                                     loadCustomPage={(page) => {
                                           setCustomPage(page)
                                           setAppState(AppStates.customPage)
                                       }} mobile={portrait}
                        />
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.customPage || previousAppState === AppStates.customPage) && <>
                        {customPage === 0 &&
                            <MarkdownPage shown={currentAppState === previousAppState} file={customPageFile}/>}
                        {customPage === 1 && <Debloat shown={currentAppState === previousAppState} goBack={() => {
                            setAppState(AppStates.software)
                        }}/>}
                        {customPage === 2 && <Themepatcher shown={currentAppState === previousAppState} goBack={() => {
                            setAppState(AppStates.software)
                        }}/>}
                        {customPage === 3 && <Xcrypt shown={currentAppState === previousAppState} goBack={() => {
                            setAppState(AppStates.software)
                        }}/>}
                        {customPage === 4 && <Screenery shown={currentAppState === previousAppState} goBack={() => {
                            setAppState(AppStates.software)
                        }}/>}
                        {customPage === 5 && <Autoreact shown={currentAppState === previousAppState} goBack={() => {
                            setAppState(AppStates.software)
                        }}/>}
                        {customPage === 6 && <Webmimic shown={currentAppState === previousAppState} goBack={() => {
                            setAppState(AppStates.software)
                        }}/>}
                    </>}
                </div>
                <div style={footerStyle}>
                    <Platform speed={
                        (currentAppState !== AppStates.home && previousAppState === AppStates.home) ? 5.5 : platformSpeed
                    }/>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", color: '#0154b4',alignItems:"center"}}>
                        {portrait ?
                            <>
                                {currentAppState === AppStates.articles &&
                                    <TypingAnimation text={`Latest Articles`
                                    }/>
                                }
                                {currentAppState === AppStates.software &&
                                    <TypingAnimation text={`Open Source software and tools`
                                    }/>
                                }
                            </> : <></>
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