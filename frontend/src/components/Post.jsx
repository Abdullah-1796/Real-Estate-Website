import React from "react";
import "../Style/Post.css";

function Post(props)
{
    //console.log(props.headline);
    return (
        <div id="ad-outer">
            <div id="ad">
                <div id="ad-highlight">
                    <img src={props.link} alt="thumbnail" />
                </div>
                
                <div id="ad-details">
                    <p id="price">{props.price} &nbsp;&nbsp;PKR</p>
                    <p>{props.size} Marla</p>
                    <p>{props.location} {props.city}</p>
                        
                    <div id="minor-details">
                        <div id="ad-beds">
                            <img src="/Images/beds.png" alt="beds" className="ad-img" />
                            <p>Bed:&nbsp;{props.beds}</p>
                        </div>
                        <div id="ad-bath">
                            <img src="/Images/bathrooms.png" alt="baths" className="ad-img" />
                            <p>Bathroom:&nbsp;{props.bath}</p>
                        </div>
                        <div id="ad-kitchen">
                            <img src="/Images/kitchens.png" alt="kitchens" className="ad-img" />
                            <p>Kitchen:&nbsp;{props.kitchen}</p>
                        </div>
                    </div>
                </div>
                <div id="purpose-logo" style={props.purpose === "Rent" ? {backgroundColor : "darkcyan"} : null}>
                    {props.purpose}
                </div>
                <div id="del-button" onClick={() => {props.deletePost(props.id)}} style={props.access === "user" ? {display: "none"} : {display: "block"}}>X</div>
            </div>
        </div>
    );
}

export default Post;