import React from "react";
import UserNav from "./UserNav";
import Chat from "./Chat";
import "../Style/UserChat.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UserChat()
{
    const [uid, setUid] = React.useState("");
    const [flag, setFlag] = React.useState(false);

    function setFalse()
    {
        setFlag(false);
    }

    const informAdmin = () => {
        localStorage.setItem("a-flag", "true");
        console.log("User sent message");
    };

    React.useEffect(() => {
        const receiveFlagU = (event) => {
          const flagFromStorage = localStorage.getItem("u-flag");
          if (flagFromStorage) {
            setFlag(flagFromStorage);
            localStorage.removeItem("u-flag"); // Remove the flag from localStorage after reading it
            console.log("User received message");
          }
        };
    
        // Add event listener to listen for messages
        window.addEventListener("storage", receiveFlagU);
    
        // Cleanup function to remove event listener
        return () => {
          window.removeEventListener("storage", receiveFlagU);
        };
      }, []);

    function getUid()
    {
        axios.get("http://localhost:3001/UserHome/Chat")
        .then(res => {
            setUid(res.data);
            console.log(res.data);
        })
        .catch(error => {
            console.error("Unable to fetch UID", error);
        });
    };

    React.useEffect(() => {
        window.onload = getUid;
        // Alternatively, you can call getUid directly:
        // getUid();
        return () => {
            window.onload = null; // Cleanup to avoid memory leaks
        };
    }, [getUid]);

    return (
        <div id="user-chat-body">
            <UserNav />
            <Chat 
                from = {uid}
                to = "Admin"
                informAdmin = {informAdmin}
                flag = {flag}
                setFalse = {setFalse}
            />
        </div>
    );
}

export default UserChat;