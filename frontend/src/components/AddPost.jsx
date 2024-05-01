import React from "react";
import AdminNav from "./AdminNav";
import PostForm from "./PostForm";

function AddPost()
{
    return (
        <div>
            <AdminNav />
            <PostForm 
                operation = "add"
            />
        </div>
    );
}

export default AddPost;