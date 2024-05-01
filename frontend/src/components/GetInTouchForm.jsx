import React from "react";
import "../Style/GetInTouchForm.css";
import axios from "axios";
import PopUp from "./PopUp";
import $ from "jquery";

function GetInTouchForm()
{
    const [data, setData] = React.useState({
        name : "",
        email : "",
        phone : ""
    });

    React.useEffect(() => {
        document.getElementById("popup-body").style.display = "none";
    }, []);

    function handleChange(event)
    {
        setData((prev) => {
            return {
                ...prev,
                [event.target.name] : [event.target.value]
            }
        });
    }

    function submitData(event)
    {
        event.preventDefault();
        axios.post("http://localhost:3001/UserHome/GetInTouch", data)
        .then(res => {
            unhidePopup();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    function hideForm()
    {
        $('#inTouch-body').fadeOut(300, () => {
                //changing image
            document.getElementById("inTouch-body").style.display = "none";
        });
    }
    
    function unhidePopup()
    {
        $('#popup-body').fadeIn(300, () => {
                //changing image
            document.getElementById("popup-body").style.display = "flex";
        });
    }

    return (
        <div id="inTouch-body">
            <form id="inTouch-form" onSubmit={submitData}>
                <div id="inTouch-header">
                    <p id="inTouch-heading">Get In Touch</p>
                    <button id="close-btn" onClick={hideForm}>x</button>
                </div>
                <div className="col">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="intouch-name" placeholder="Example..." required value={data.name} onChange={handleChange} />
                </div>
                <div className="col">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="inTouch-email" placeholder="example@gmail.com" required value={data.email} onChange={handleChange} />
                </div>
                <div className="col">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" name="phone" id="inTouch-phone" placeholder="+92 000 12345667" required value={data.phone} onChange={handleChange} />
                </div>
                <button id="inTouch-btn" type="submit">Submit Query</button>                
            </form>
            <PopUp 
                sign = "✔"
                content = "Your data has been recorded successfully by us. You will be get in touch as soon as updates made. Thanks for reaching us!"
                navigateLink = "reload"
            />
        </div>
    );
}

export default GetInTouchForm;