import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminNav from "./AdminNav";
import PostForm from "./PostForm";

function UpdatePost() {
    const { id } = useParams();
    const [link, setLink] = React.useState(-1);
    const [data, setData] = useState({
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

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        axios.get(`http://localhost:3001/PostDetails/${id}`)
        .then(res => {
            let arr = [];
            const d = res.data.rows;
            console.log(d);
            let i = 0;
            for(; i < d.length; i++)
            {
                arr[i] = d[i].link;
            }
            for(; i < 10; i++)
            {
                arr[i] = "";
            }
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
                area : d[0].area,
                link1 : arr[0],
                link2 : arr[1],
                link3 : arr[2],
                link4 : arr[3],
                link5 : arr[4],
                link6 : arr[5],
                link7 : arr[6],
                link8 : arr[7],
                link9 : arr[8],
                link10 : arr[9]
            })
            setLink(1);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div>
            <AdminNav />
            {data.headline !== "" && link !== -1 ?
            <PostForm
                id = {id}
                operation = "update"
                headline = {data.headline}
                location = {data.location}
                city = {data.city}
                type = {data.type}
                purpose= {data.purpose}
                size= {data.size}
                price= {data.price}
                beds= {data.beds}
                bath= {data.bath}
                kitchen= {data.kitchen}
                portions= {data.portions}
                area= {data.area}
                link1 = {data.link1}
                link2 = {data.link2}
                link3 = {data.link3}
                link4 = {data.link4}
                link5 = {data.link5}
                link6 = {data.link6}
                link7 = {data.link7}
                link8 = {data.link8}
                link9 = {data.link9}
                link10 = {data.link10}
            /> :
            <h1>Loading</h1>}
        </div>
    )
}

export default UpdatePost;
