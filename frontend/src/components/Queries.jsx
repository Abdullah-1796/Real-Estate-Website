import React from "react";
import AdminNav from "./AdminNav";
import Query from "./Query";
import PopUp from "./PopUp";
import axios from "axios";
import $ from "jquery";

function Queries()
{
    const [queries, setQueries] = React.useState([]);

    React.useEffect(() => {
        document.getElementById("popup-body").style.display = "none";
    }, []);

    React.useEffect(() => {
        loadQueries();
    }, []);

    function loadQueries()
    {
        axios.get("http://localhost:3001/AdminHome/Queries")
        .then(res => {
            setQueries(res.data.rows);
        })
        .catch(error => {
            console.error("Error in fetching queries: ", error);
        });
    }

    function deleteQuery(qid)
    {
        axios.delete(`http://localhost:3001/AdminHome/Queries/${qid}`)
        .then(res => {
            unhidePopup();
        })
        .catch(error => {
            console.error("Error in fetching queries: ", error);
        });
    }
    
    function unhidePopup()
    {
        $('#popup-body').fadeIn(300, () => {
                //changing image
            document.getElementById("popup-body").style.display = "flex";
        });
    }

    //console.log(queries);
    return (
        <div id="admin-queries">
            <AdminNav />
            {queries.map((q, index) => (
                <Query
                    key = {index}
                    qid = {q.qid}
                    name = {q.name}
                    phone = {q.phone}
                    email = {q.email}
                    query = {q.query}
                    deleteQuery = {deleteQuery}
                />
            ))}
            <PopUp 
                sign = "✔"
                content = "Query has been deleted successfully"
                navigateLink = "reload"
            />
        </div>
    );
}

export default Queries;