import React from "react";

function Message(props)
{
    return (
        <div className={props.decoration}>
            <div className="message">{props.message}</div>
        </div>
    );
}

export default Message;