import React from "react";
import axios from "axios";
import UserNav from "./UserNav";
import Post from "./Post";
import { Link } from "react-router-dom";
import "../Style/Filter.css";
import $ from "jquery";

function FindProperty()
{
    //window.onload = loadData;
    const [first, setFirst] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [filter, setFilter] = React.useState({
        fLocation : "DHA",
        fCity : "Lahore",
        fType : "Home",
        fPurpose : "Any",
        fArea : "Residential",
        fSize : "20",
        fPrice : "100000000000"
    });
    React.useEffect(() => {
        loadData();
    }, []);

    function loadData()
    {
        axios.post("http://localhost:3001/UserHome/FindProperty", filter)
        .then(res => {
            //console.log(res.data.rows);
            setData(res.data.rows);
            if(first)
            {
                setFirst(false);
            }
            else {
                hideFilter();
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
    //setTimeout(console.log(data), 1000);
    //console.log(data);

    function handleChange(event)
    {
        setFilter( prev => {
            return ({
                ...prev,
                [event.target.name] : [event.target.value]
            });
        });
    }

    const time = 300;
    function hideFilter()
    {
        //fading out an image
        $('#filter-body').fadeOut(time, () => {
                //changing image
            document.getElementById("filter-body").style.display = "none";
        });
    }
    function unhideFilter()
    {
        //fading out an image
        $('#filter-body').fadeIn(time, () => {
                //changing image
            document.getElementById("filter-body").style.display = "flex";
        });
    }

    return (
        <div>
            <UserNav />
            <div id="post">
                {data.map((d, index) => (
                    <Link to={`/UserHome/FindProperty/PropertyDetails/${d.id}`} className="post-link" key={d.id}>
                        <Post
                            access = "user"
                            id={d.id}
                            location = {d.location}
                            city = {d.city}
                            purpose = {d.purpose}
                            size = {d.size}
                            price = {d.price}
                            beds = {d.beds}
                            bath = {d.bath}
                            kitchen = {d.kitchen}
                            link = {d.first_link}
                        />
                    </Link>
                ))}
            </div>
            <button onClick={unhideFilter} id="apply-filter">Filter</button>
            
            {/* Filter popup */}

            <div id="filter-body">
                <div id="filter">
                    <div id="filter-head">
                        <p>Apply Filter</p>
                        <button onClick={hideFilter}>x</button>
                    </div>
                    <div id="filter-inp1">
                        <input type="text" name="fLocation" id="fLoc" placeholder="Location" value={filter.fLocation} onChange={handleChange} />

                        <select name="fCity" id="fCity"  onChange={handleChange}>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Karachi">Karachi</option>
                        </select>

                        <select name="fType" id="fType"  onChange={handleChange}>
                            <option value="Home">Home</option>
                            <option value="Plot">Plot</option>
                            <option value="Flat">Flat</option>
                        </select>
                    </div>

                    <div id="filter-inp2">
                        <select name="fPurpose" id="fPurpose"  onChange={handleChange}>
                            <option value="Any">Any</option>
                            <option value="Sale">Sale</option>
                            <option value="Rent">Rent</option>
                        </select>

                        <select name="fArea" id="fArea"  onChange={handleChange}>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>

                        <input type="number" name="fSize" id="fSize" placeholder="Marla" min="1" value={filter.fSize}  onChange={handleChange} />

                        <input type="number" name="fPrice" id="fPrice" placeholder="Price" min="1" value={filter.fPrice}  onChange={handleChange} />
                    </div>
                    <button id="filter-button" onClick={loadData}>Apply Filter</button>
                </div>
            </div>
        </div>
    );
}

export default FindProperty;