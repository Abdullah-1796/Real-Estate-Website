import React from "react";
import "../Style/AdminChat.css";
import AdminNav from "./AdminNav";
import ChatUserOptions from "./ChatUserOptions";
import Chat from "./Chat";

function AdminChat()
{
    const [uid, setUid] = React.useState("1");
    const [flag, setFlag] = React.useState(false);
    
    function setFalse()
    {
        setFlag(false);
    }

    const informUser = () => {
        localStorage.setItem("u-flag", "true");
        console.log("Admin sent message");
    };

    React.useEffect(() => {
        const receiveFlag = (event) => {
          const flagFromStorage = localStorage.getItem("a-flag");
          if (flagFromStorage) {
            setFlag(true);
            localStorage.removeItem("a-flag"); // Remove the flag from localStorage after reading it
            console.log("Admin received message");
          }
        };
    
        // Add event listener to listen for messages
        window.addEventListener("storage", receiveFlag);
    
        // Cleanup function to remove event listener
        return () => {
          window.removeEventListener("storage", receiveFlag);
        };
      }, []);

    function handleUid(uid)
    {
        setUid(uid);
    }

    return (
        <div id="admin-chat-body">
            <AdminNav />
            <ChatUserOptions 
                handleUid = {handleUid}
            />
            <Chat 
                from = "Admin"
                to = {uid}
                informUser = {informUser}
                flag = {flag}
                setFalse = {setFalse}
            />
        </div>
    );
}

export default AdminChat;