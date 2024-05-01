import React from "react";
import "../Style/QueryForm.css";
import axios from "axios";
import PopUp from "./PopUp";
import $ from "jquery";

function QueryForm()
{
    const [data, setData] = React.useState({
        name : "",
        email : "",
        phone : "",
        query : ""
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

    function submitQuery(event)
    {
        event.preventDefault();
        axios.post("http://localhost:3001/UserHome/PassQuery", data)
        .then(res => {
            unhidePopup();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
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
        <div id="passQuery-body">
            <form id="query-form" onSubmit={submitQuery}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="query-name" placeholder="Example..." required value={data.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="query-email" placeholder="example@gmail.com" required value={data.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" name="phone" id="query-phone" placeholder="+92 000 12345667" required value={data.phone} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="query">Your Query:</label>
                    <textarea name="query" id="query" cols="30" rows="6" value={data.query} onChange={handleChange}></textarea>
                </div>
                <button id="query-btn" type="submit">Submit Query</button>
            </form> 
            <PopUp 
                sign = "✔"
                content = "Your query has been passed successfully to us. You will be get in touch as soon as possible. Thanks for reaching us!"
                navigateLink = "/UserHome"
            />
        </div>
    );
}

export default QueryForm;