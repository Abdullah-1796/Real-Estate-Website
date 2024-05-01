import React from "react";
import "../Style/UserHomeBody.css";
import GetInTouchForm from "./GetInTouchForm";
import $ from "jquery";

function UserHomeBody()
{
    React.useEffect(() => {
        document.getElementById("inTouch-body").style.display = "none";
    }, []);
    
    function unhidePopup()
    {
        $('#inTouch-body').fadeIn(300, () => {
                //changing image
            document.getElementById("inTouch-body").style.display = "flex";
        });
    }

    return (
        <div id="blur-background">
            <div id="UserHome-outer">
                <div id="about-us">
                    <p id="head">About Us</p>
                    <p id="about">
                    Discover your dream home with Best Homes Real Estate. Personalized service and expert guidance. Whether it's a cozy apartment, spacious family home, or your own paradise, we'll find your perfect fit. Your journey starts here. Unlock endless possibilities. Find the perfect address today.
                    </p>
                    <button id="get-in-touch" onClick={unhidePopup}>Get In Touch</button>
                </div>
                <div id="agents">
                    <div className="agent a1">
                        <div className="identity">
                            <img src="/Images/Zahid.jpg" alt="Zahid's Profile" />
                            <p>Zahid Chaudhary</p>
                        </div>
                        <div className="about-me">
                            <p className="des">"Passionate about helping you find your perfect home sweet home."</p>
                            <p className="contact">+92 300 4146694</p>
                        </div>
                    </div>
                    <div className="agent a2">
                        <div className="identity">
                            <img src="/Images/Javed.jpg" alt="Javed's Profile" />
                            <p>Javed Alam Shamsi</p>
                        </div>
                        <div className="about-me">
                            <p className="des">"Committed to turning your real estate dreams into reality from my experience."</p>
                            <p className="contact">+92 300 4146694</p>
                        </div>
                    </div>
                </div>
            </div>
            <GetInTouchForm />
        </div>
    );
}

export default UserHomeBody;