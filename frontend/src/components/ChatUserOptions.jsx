import React from "react";
import "../Style/ChatUserOptions.css";

function ChatUserOptions(props)
{
    return (
        <div id="chat-user-outer">
            <div className="user" onClick={() => props.handleUid("1")}><p>User 1</p></div>
            <div className="user" onClick={() => props.handleUid("2")}><p>User 2</p></div>
            <div className="user" onClick={() => props.handleUid("3")}><p>User 3</p></div>
            <div className="user" onClick={() => props.handleUid("4")}><p>User 4</p></div>
            <div className="user" onClick={() => props.handleUid("5")}><p>User 5</p></div>
        </div>
    );
}

export default ChatUserOptions;