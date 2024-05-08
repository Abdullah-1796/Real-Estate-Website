import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/LoginPage.css";
function LoginPage()
{
    const [values, setValues] = React.useState({
        user: "",
        pass: ""
    });

    const navigate = useNavigate();

    function handleInput(event)
    {
        setValues( prev => {
            return ({
                ...prev,
                [event.target.name]: [event.target.value]
            })
        })
    }

    function handleClick(event)
    {
        //console.log("Username: " + values.user + ", Password: " + values.pass);
        event.preventDefault();
        axios.post("http://localhost:3001/login", values)
        .then(res => {
            console.log(res.data);
            if(res.data === "Success")
            {
                navigate("/AdminHome");
            }
        });
    }

    return (
        <div  id="login-outer">
            <div id="login-admin-body">
                <div id="login-form">
                    <p id="logo">Best Homes Real Estate!</p>
                    <form method="post" onSubmit={handleClick}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="user" id="username" required placeholder="Admin Username" value={values.user} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="pass" id="password" required placeholder="Enter Password" value={values.pass} onChange={handleInput} />
                        </div>
                        <div><button>Login</button></div>
                    </form>
                </div>
                <div id="login-design">
                    <div id="img-container">
                        <img src="/Images/Home Illustration 2.png" alt="home illustration" />
                    </div>
                    <div id="text-container">
                        <p>Let's Rectify and introduce new living styles</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;