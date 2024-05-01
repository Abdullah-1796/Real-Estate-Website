import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/PostForm.css";

function PostForm(props)
{
    //console.log("Post form rendering");
    const [loaded, setLoaded] = React.useState(false);
    const [values, setValues] = React.useState({
        headline : "",
        location : "",
        city : "Lahore",
        type : "Home",
        purpose : "Sale",
        size : "",
        price : "",
        beds : "",
        bath : "",
        kitchen : "",
        portions : "",
        area : "Residential",
        link1 : "",
        link2 : "",
        link3 : "",
        link4 : "",
        link5 : "",
        link6 : "",
        link7 : "",
        link8 : "",
        link9 : "",
        link10 : ""
    });

    function initializeStoredValues()
    {
        setValues({
            id : props.id,
            headline : props.headline,
            location : props.location,
            city : props.city,
            type : props.type,
            purpose : props.purpose,
            size : props.size,
            price : props.price,
            beds : props.beds,
            bath : props.bath,
            kitchen : props.kitchen,
            portions : props.portions,
            area : props.area,
            link1 : props.link1,
            link2 : props.link2,
            link3 : props.link3,
            link4 : props.link4,
            link5 : props.link5,
            link6 : props.link6,
            link7 : props.link7,
            link8 : props.link8,
            link9 : props.link9,
            link10 : props.link10
        });
        setLoaded(true);
    }

    if(props.operation === "update")
    {
        console.log("Updating");
        if(!loaded)
        {
            initializeStoredValues();
            console.log("Updated");
        }
    }

    function handleInput(event)
    {
        setValues( prev => {
            return ({
                ...prev,
                [event.target.name]: [event.target.value]
            })
        })
    }

    const navigate = useNavigate();
    function handlePost(event)
    {
        //console.log("Username: " + values.user + ", Password: " + values.pass);
        event.preventDefault();
        if(props.operation === "add")
            axios.post("http://localhost:3001/AdminHome/ManagePost/AddPost", values).then(res => navigate("/AdminHome/ManagePosts"));
        else if(props.operation === "update")
            axios.put("http://localhost:3001/AdminHome/ManagePost/UpdatePost", values).then(res => navigate("/AdminHome/ManagePosts"));
    }

    return (
        <div className="postContainer">
            <div id="container">
            <form action="/AdminHome/ManagePost" method="post" onSubmit={handlePost}>
                <div id="first">
                    <div className="headline">
                        <label htmlFor="headline">Headline</label>
                        <input type="text" name="headline" id="headline" value={values.headline} onChange={handleInput}/>
                    </div>
                </div>
                <div id="second">
                    <div className="location">
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" id="location" value={values.location} onChange={handleInput}/>
                    </div>
                    <div className="city">
                        <label htmlFor="city">City</label>
                        <select name="city" id="city" onChange={handleInput}>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Karachi">Karachi</option>
                        </select>
                    </div>
                </div>
                
                <div id="forth">
                    <div className="size">
                        <label htmlFor="size">Size&nbsp;</label>
                        <input type="number" name="size" id="size" value={values.size} onChange={handleInput}/>
                    </div>
                    <div className="price">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" value={values.price} onChange={handleInput}/>
                    </div>
                    <div className="portion">
                        <label htmlFor="portion">Portions</label>
                        <input type="number" name="portions" id="portion" value={values.portions} onChange={handleInput}/>
                    </div>
                </div>
                <div id="fifth">
                    <div className="beds">
                        <label htmlFor="beds">Beds</label>
                        <input type="number" name="beds" id="beds" value={values.beds} onChange={handleInput}/>
                    </div>
                    <div className="bath">
                        <label htmlFor="bath">Bath&nbsp;</label>
                        <input type="number" name="bath" id="bath" value={values.bath} onChange={handleInput}/>
                    </div>
                    <div className="kitchen">
                        <label htmlFor="kitchen">Kitchen</label>
                        <input type="number" name="kitchen" id="kitchen" value={values.kitchen} onChange={handleInput}/>
                    </div>
                </div>
                <div id="sixth">
                    <label htmlFor="img"></label>
                </div>
                <div id="third">
                    <div className="type">
                        <label htmlFor="type">Property Type</label>
                        <select name="type" id="type" onChange={handleInput}>
                            <option value="Home">Home</option>
                            <option value="Plot">Plot</option>
                            <option value="Flat">Flat</option>
                        </select>
                    </div>
                    <div className="purpose">
                        <label htmlFor="purpose">Purpose</label>
                        <select name="purpose" id="purpose" onChange={handleInput}>
                            <option value="Sale">Sale</option>
                            <option value="Rent">Rent</option>
                        </select>
                    </div>
                    <div className="area">
                        <label htmlFor="area">Area</label>
                        <select name="area" id="area" onChange={handleInput}>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                </div>
                <div id="eight">
                    <ol>
                        <h3>Image source links</h3>
                        <br/>
                        <li className="link">
                            1
                            <input type="text" name="link1" id="link" value={values.link1} onChange={handleInput}/> 
                        </li>
                        <li className="link">
                            2
                            <input type="text" name="link2" id="link" value={values.link2} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            3
                            <input type="text" name="link3" id="link" value={values.link3} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            4
                            <input type="text" name="link4" id="link" value={values.link4} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            5
                            <input type="text" name="link5" id="link" value={values.link5} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            6
                            <input type="text" name="link6" id="link" value={values.link6} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            7
                            <input type="text" name="link7" id="link" value={values.link7} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            8
                            <input type="text" name="link8" id="link" value={values.link8} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            9<input type="text" name="link9" id="link" value={values.link9} onChange={handleInput}/>
                        </li>
                        <li className="link">
                            10<input type="text" name="link10" id="link" value={values.link10} onChange={handleInput}/>
                        </li>
                    </ol>
                </div>
                <button type="submit">{props.operation === "update" ? "Update" : "Add"} Post</button>
            </form>
        </div>
    </div>
    );
}

export default PostForm;