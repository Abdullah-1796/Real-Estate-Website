import React from "react";
import "../Style/PropertyDetails.css";
import { useParams } from "react-router-dom";
import UserNav from "./UserNav";
import axios from "axios";
import $ from "jquery";

function PropertyDetails()
{
    const {id} = useParams();
    const [arr, setArr] = React.useState([]);
    const [imgIdx, setImgIdx] = React.useState(0);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        loadDetails();
    }, []);

    function loadDetails()
    {
        axios.get(`http://localhost:3001/PostDetails/${id}`)
        .then(res => {
            const d = res.data.rows;
            //console.log(d);
            setArr(() => {
                return d.map((i) => {
                    return i.link;
                });
            });
            // let i = 0;
            // for(; i < d.length; i++)
            // {
            //     arr[i] = d[i].link;
            // }
            //console.log(arr);
            setData({
                headline : d[0].headline,
                location : d[0].location,
                city : d[0].city,
                type : d[0].type,
                purpose : d[0].purpose,
                size : d[0].size,
                price : d[0].price,
                beds : d[0].beds,
                bath : d[0].bath,
                kitchen : d[0].kitchen,
                portions : d[0].portions,
                area : d[0].area
            });
        });
    }
    const time = 300;

    function nextImg()
    {
        //fading out an image
        $('#images img').fadeOut(time, () => {
            //changing image
            if(imgIdx < arr.length - 1)
                setImgIdx(imgIdx + 1)
            else if(imgIdx === arr.length - 1)
                setImgIdx(0)
            // fading in an image again
            $('#images img').fadeIn(time);
        });
    }

    function prevImg()
    {
        //fading out an image
        $('#images img').fadeOut(time, () => {
            //changing image
            if(imgIdx > 0)
                setImgIdx(imgIdx - 1)
            else if(imgIdx === 0)
                setImgIdx(arr.length - 1)
                // fading in an image again
            $('#images img').fadeIn(time);
        });
    }

    document.addEventListener('keydown', function keyPress(event) {
        if(event.key === "ArrowRight")
        {
            nextImg();
        }
        else if(event.key === "ArrowLeft")
        {
            prevImg();
        }
        document.removeEventListener('keydown', keyPress);
    });

    return (
        <div>
            <UserNav />
            <div id="ad-preview">
                <h1>{data.headline}</h1>
                <div>
                    <div id="images">
                        <div>
                            <button id="left-btn" className="img-btn" onClick={prevImg}>{"<"}</button>
                        </div>
                        <img src={arr[imgIdx]} alt="property pics" />
                        <div>
                            <button id="right-btn" className="img-btn" onClick={nextImg}>{">"}</button>
                        </div>
                        <div id="imgCount"><p>{imgIdx + 1} / {arr.length}</p></div>
                    </div>
                    <div id="ad-description">
                        <div>
                            <span><strong>Type: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.type}</span>
                        </div>
                        <div>
                            <span><strong>Size: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.size} Marla</span>
                        </div>
                        <div>
                            <span><strong>Area: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.area}</span>
                        </div>
                        <div>
                            <span><strong>Price: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.price}</span>
                        </div>
                        <div>
                            <span><strong>Purpose: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.purpose}</span>
                        </div>
                        <div>
                            <span><strong>Location: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.location}</span>
                        </div>
                        <div>
                            <span><strong>City: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.city}</span>
                        </div>
                        <div>
                            <span><strong>Portion: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.portions}</span>
                        </div>
                        <div>
                            <span><strong>Bedroom: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.beds}</span>
                        </div>
                        <div>
                            <span><strong>Bathroom: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.bath}</span>
                        </div>
                        <div>
                            <span><strong>Kitchen: </strong>&nbsp;&nbsp;&nbsp;</span>
                            <span>{data.kitchen}</span>
                        </div>
                        <div id="phone-number">
                            <strong>+92 322 7888444</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;