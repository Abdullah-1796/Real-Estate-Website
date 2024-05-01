import React from "react";
import { Link } from 'react-router-dom';
import "../Style/AdminNav.css";

function AdminNav()
{
    return (
        <div id="outer">
            <div id="upper">
                <Link to={"/AdminHome"} id="logo-img" >
                    <img src="/Images/Horizontal Logo1.jpg" alt="Logo with home link" />
                </Link>
            </div>
            <div id="bottom">
                <div><Link to={"/AdminHome/ManagePosts"} className="navlink">Manage Posts</Link></div>
                <div><Link to={"/AdminHome/ManageHotProperties"} className="navlink">Manage Hot Properties</Link></div>
                <div><Link to={"/AdminHome/ManageAds"} className="navlink">Manage Ads</Link></div>
                <div><Link to={"/AdminHome/Queries"} className="navlink">Queries</Link></div>
                <div><Link to={"/AdminHome/ManageNewProjects"} className="navlink">Manage New Projects</Link></div>
                <div><Link to={"/AdminHome/LiveChats"} className="navlink">Live Chats</Link></div>
            </div>
        </div>
    );
}

export default AdminNav;