import React, {useCallback} from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Homelink from "../header/Homelink";
import Menu from "../header/Menu";
import Header from "../header/Header";
import Bubble from "../components/Bubble";
import SquareGuy from "../home/res/SquareGuy";
import Platform from "../components/Platform";
import App from "../App";
import StarField from "../components/StarField";
import Software from "../components/Software";
import Debloat from "../pages/Debloat";
import PointedStar from "../components/PointedStar";
import AllSoftwarePC from "../components/AllSoftwarePC";
import Article from "../components/Article";
import AllArticlesPC from "../components/AllArticlesPC";
import TypingAnimation from "../components/TypingAnimation";
import MarkdownPage from "../pages/MarkdownPage";
import AppItem from "../components/AppItem";
import Popup from "../components/Popup";
import GameStage from "../home/GameStage";
import Cap from "../home/res/Cap";
import Books from "../home/res/Books";
import Pc from "../home/res/Pc";
import FallingPcs from "../home/res/FallingPcs";
import CJava from "../home/res/CJava";
import AndroidLogo from "../home/res/AndroidLogo";
import MoreLangs from "../home/res/MoreLangs";
import WebFrameworks from "../home/res/WebFrameworks";
import GitHubLogo from "../home/res/GitHubLogo";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Homelink">
                <Homelink/>
            </ComponentPreview>
            <ComponentPreview path="/Menu">
                <Menu/>
            </ComponentPreview>
            <ComponentPreview path="/Header">
                <Header/>
            </ComponentPreview>
            <ComponentPreview path="/Bubble">
                <Bubble/>
            </ComponentPreview>
            <ComponentPreview path="/SquareGuy">
                <SquareGuy/>
            </ComponentPreview>
            <ComponentPreview path="/Platform">
                <Platform/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/StarField">
                <StarField/>
            </ComponentPreview>
            <ComponentPreview path="/Software">
                <Software/>
            </ComponentPreview>
            <ComponentPreview path="/Debloat">
                <Debloat/>
            </ComponentPreview>
            <ComponentPreview path="/PointedStar">
                <PointedStar/>
            </ComponentPreview>
            <ComponentPreview path="/AllSoftwarePC">
                <AllSoftwarePC/>
            </ComponentPreview>
            <ComponentPreview path="/Article">
                <Article/>
            </ComponentPreview>
            <ComponentPreview path="/AllArticlesPC">
                <AllArticlesPC/>
            </ComponentPreview>
            <ComponentPreview path="/TypingAnimation">
                <TypingAnimation/>
            </ComponentPreview>
            <ComponentPreview path="/MarkdownPage">
                <MarkdownPage/>
            </ComponentPreview>
            <ComponentPreview path="/AppItem">
                <AppItem/>
            </ComponentPreview>
            <ComponentPreview path="/Popup">
                <Popup/>
            </ComponentPreview>
            <ComponentPreview path="/GameStage">
                <GameStage bg={true}/>
            </ComponentPreview>
            <ComponentPreview path="/Cap">
                <Cap/>
            </ComponentPreview>
            <ComponentPreview path="/Books">
                <Books/>
            </ComponentPreview>
            <ComponentPreview path="/Pc">
                <Pc/>
            </ComponentPreview>
            <ComponentPreview path="/FallingPcs">
                <FallingPcs/>
            </ComponentPreview>
            <ComponentPreview path="/CJava">
                <CJava/>
            </ComponentPreview>
            <ComponentPreview path="/AndroidLogo">
                <AndroidLogo/>
            </ComponentPreview>
            <ComponentPreview path="/MoreLangs">
                <MoreLangs/>
            </ComponentPreview>
            <ComponentPreview path="/WebFrameworks">
                <WebFrameworks/>
            </ComponentPreview>
            <ComponentPreview path="/GitHubLogo">
                <GitHubLogo/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews