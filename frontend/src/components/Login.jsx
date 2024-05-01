import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login()
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
        axios.post("http://localhost:3001/login", values).then(res => navigate("/"));
    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <label>Username</label>
                <input type="text" name="user" value={values.user} onChange={handleInput}/>
                <label>Password</label>
                <input type="file" name="pass" value={values.pass} onChange={handleInput}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;