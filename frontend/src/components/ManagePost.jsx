import React from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom";

function ManagePosts()
{
    //window.onload = loadData;
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        loadData();
    }, []);
    function loadData()
    {
        
        axios.get("http://localhost:3001/AdminHome/ManagePost")
        .then(res => {
            //console.log(res.data.rows);
            setData(res.data.rows);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
    //setTimeout(console.log(data), 1000);
    // console.log(data[0].id);
    const navigate = useNavigate();
    function deletePost(id)
    {
        //console.log(id);
        axios.delete(`http://localhost:3001/AdminHome/ManagePost/DeletePost/${id}`)
        .then(res => {
            navigate("/AdminHome/ManagePosts")
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div>
            <AdminNav />
            <div id="post">
                {data.map((d, index) => (
                    <Link to={`/AdminHome/ManagePosts/UpdatePost/${d.id}`} className="post-link" key={d.id}>
                        <Post
                            access = "admin"
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
                            deletePost = {deletePost}
                        />
                    </Link>
                ))}
            </div>
            <Link to={"/AdminHome/ManagePosts/AddPost"} className="add-post-button">+</Link>
        </div>
    );
}

export default ManagePosts;