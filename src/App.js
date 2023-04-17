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
import MarkdownRenderer from "./pages/MarkdownRenderer";
import Debloat from "./pages/Debloat";

var AppStates = {
    none: 0,
    home: 1,
    articles: 2,
    software: 3,
    customPage: 4
};
var CustomPages = {
    markdown: 0,
    debloat: 1,
}

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
    const [x, setX] = React.useState(0)
    const [y, setY] = React.useState(0)
    const [currentAppState, setCurrentAppState] = React.useState(AppStates.home)
    const [customPage,setCustomPage] = React.useState(CustomPages.markdown)
    const [customPageName, setCustomPageName] = React.useState('');
    const setAppState = (state) => {
        if (state === currentAppState) return;
        if (currentAppState === AppStates.home) setPlatformSpeed(6);
        setCurrentAppState(0);
        setTimeout(() => {
            setPlatformSpeed(0);
            setCurrentAppState(state);
        }, 800)
    }
    useEffect(() => {
        console.log(currentAppState,customPage,customPageName);
    }, [currentAppState,customPage,customPageName]);
    const mouseMoveCallback = (event) => {
        setX(event.clientX / window.innerWidth);
        setY(event.clientY / window.innerHeight);
    }
    return (
        <div onMouseMove={mouseMoveCallback} style={{overflow:"hidden"}}>
            <CircularGradient x={x} y={y}/>
            <Header
                mobile={portrait}
                appState={currentAppState}
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
                    {(currentAppState === AppStates.home || currentAppState === AppStates.none) &&
                        <Homepage shown={currentAppState === AppStates.home} switchState={(state) => {
                            setAppState(state);
                        }}/>
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.articles || currentAppState === AppStates.none) && !portrait &&
                        <AllArticlesPC shown={currentAppState === AppStates.articles && (!portrait)}
                                       loadArticle={(article) => {
                                           if (article.isEmpty) return;
                                           setCustomPage(CustomPages.markdown)
                                           setAppState(AppStates.customPage);
                                           setCustomPageName(article);
                                       }}/>
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px"}}>
                    {(currentAppState === AppStates.software || currentAppState === AppStates.none) && !portrait &&
                        <AllSoftwarePC shown={currentAppState === AppStates.software && (!portrait)}
                                       loadCustomPage={(page) => {
                                           console.log('page',page)
                                           setCustomPage(page)
                                           setAppState(AppStates.customPage)
                                       }}
                        />
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.customPage) && customPage === CustomPages.markdown
                        &&<MarkdownRenderer file={customPageName}/>
                    }
                </div>
                <div style={{position: "absolute", bottom: "100px", overflow: 'hidden'}}>
                    {(currentAppState === AppStates.customPage) && customPage===CustomPages.debloat
                    && <Debloat />
                    }
                </div>
                <div style={footerStyle}>
                    <Platform speed={platformSpeed}/>
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
export let getCustomPages = () => {
    return CustomPages;
}
export let getAppStates = () => {
    return AppStates
}