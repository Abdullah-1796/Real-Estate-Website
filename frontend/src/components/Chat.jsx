import React from "react";
import axios from "axios";
import "../Style/Chat.css";
import Message from "./Message";

function Chat(props)
{
    const [uid, setUid] = React.useState("");
    const [from, setFrom] = React.useState("");
    const [to, setTo] = React.useState("");
    const [mesg, setMesg] = React.useState("");
    const [chating, setChating] = React.useState([]);

    function handleChange(event)
    {
        setMesg(event.target.value);
    }

    function sendMessage()
    {
        //console.log(uid);
        const msg = {
            from : props.from,
            to : props.to,
            message : mesg
        };
        axios.post("http://localhost:3001/UserHome/sendMessage", msg)
        .then(res => {
            console.log(res.data.rows);
            setChating(res.data.rows);
            setMesg("");
            if(props.to === "Admin")
                props.informAdmin();
            else if(props.from === "Admin")
            {
                props.informUser();
            }
            props.setFalse();
        })
        .catch(err => {
            if(err)
            {
                console.error("Unable to send message", err);
            }
        });
    }

    function updateChatting()
    {
        const msg = {
            from : props.from,
            to : props.to,
            message : mesg
        };
        axios.post("http://localhost:3001/AdminHome/updateChatting", msg)
        .then(res => {
            //console.log(res.data.rows);
            if(res.data.rows.length > 0)
                setChating(res.data.rows);
            else
                setChating([]);
            setMesg("");
            //loadData();
        })
        .catch(err => {
            if(err)
            {
                console.error("Unable to send message", err);
            }
        });
    }

    function scrollToBottom() {
        var chatMiddle = document.getElementById("chat-middle");
        chatMiddle.scrollTop = chatMiddle.scrollHeight;
    }

    React.useEffect(() => {
        scrollToBottom();
    }, [chating]);

    // React.useEffect(() => {
    //     window.onload = setIntervl();
    //     // Alternatively, you can call getUid directly:
    //     // getUid();
    //     return () => {
    //         window.onload = null; // Cleanup to avoid memory leaks
    //     };
    // }, [setIntervl]);
    

    // function setIntervl()
    // {
    //     setInterval(updateChatting(), 1000);
    // }
    window.onload = async () => {
        
    };

    React.useEffect(() => {
        setTo(props.to);
        console.log("From becomes: ", props.from);
        console.log("To becomes: ", props.to);
        updateChatting();
    }, [props]);

    return (
        <div id="chat-outer">
            <div id="chat-header">
                <h2>{props.to === "Admin" ? "Admin" : "User " + props.to}</h2>
            </div>
            <div id="chat-middle">
                
                {chating.map((c, index) => (
                    <Message 
                        key = {index}
                        decoration = {c.from_ === to ? "left" : "right" }
                        message = {c.message}
                    />
                ))}
            </div>
            <div id="chat-bottom">
                <input type="text" name="message" id="message-to-send" placeholder="Write message here..." value={mesg} onChange={handleChange} />
                <button id="send-btn" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;