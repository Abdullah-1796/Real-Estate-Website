import React from "react";
import { Link } from 'react-router-dom';
import "../Style/AdminNav.css";

function UserNav()
{
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    return (
        <div id="outer">
            <div id="upper">
                <Link to={"/UserHome"} id="logo-img" >
                    <img src="/Images/Horizontal Logo1.jpg" alt="Logo with home link" />
                </Link>
            </div>
            <div id="bottom">
                <div><Link to={"/UserHome/FindProperty"} className="navlink">Find Property</Link></div>
                <div><Link to={"/UserHome/NewProjects"} className="navlink">New Projects</Link></div>
                <div><Link to={"/UserHome/Ads"} className="navlink">Ads</Link></div>
                <div><Link to={"/UserHome/PassQuery"} className="navlink">Pass Queries</Link></div>
                <div><Link to={"#"} onClick={() => {openInNewTab("http://localhost:3000/UserHome/Live%20Chat")}} className="navlink">Live Chat</Link></div>
            </div>
        </div>
    );
}

export default UserNav;