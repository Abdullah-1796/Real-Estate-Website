import React from "react";
import "../Style/Query.css";

function Query(props)
{
    return (
        <div id="queries-body">
            <div id="queries">
                <p id="queries-name">{props.name}</p>
                <div>
                    <img src="/Images/phone.png" alt="phone" />
                    <p id="queries-phone">{props.phone}</p>
                </div>
                <div>
                    <img src="/Images/email.png" alt="email" />
                    <p id="queries-email">{props.email}</p>
                </div>
                <p id="queries-content">{props.query}</p>
            </div>
            <button id="queries-del" onClick={() => {props.deleteQuery(props.qid)}}>Delete</button>
        </div>
    );
}

export default Query;