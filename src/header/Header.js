import Homelink from "./Homelink";
import "./Header.css"
import PopupMenus from "./PopupMenus";
import React from "react";
const Header = ({mobile,home,articles,software})=>{
    // eslint-disable-next-line no-undef
    return(
        <div id="totalHeader">
            <Homelink homeclick={home} style={{pointerEvents:"none"}}/>
            <PopupMenus mobile={mobile} articles={articles} software={software} />
        </div>
    );
}
export default Header;