import React from "react";
import "../Style/PopUp.css";
import { useNavigate } from "react-router-dom";

function PopUp(props)
{
    const navigate = useNavigate();
    function moveTo()
    {
        if(props.navigateLink === "reload")
            window.location.reload();
        else
            navigate(props.navigateLink);
    }
    return (
        <div id="popup-body">
            <div id="popup">
                <p id="tick">{props.sign}</p>
                <p>{props.content}</p>
                <button id="popup-btn" onClick={moveTo}>OK</button>
            </div>
        </div>
    );
}

export default PopUp;