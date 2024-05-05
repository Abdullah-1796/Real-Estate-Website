//import "../src/App.css";
// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminHome from "./components/AdminHome";
import ManagePosts from "./components/ManagePost";
import Queries from "./components/Queries";
import LoginPage from "./components/LoginPage";
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";
import UserHome from "./components/UserHome";
import FindProperty from "./components/FindProperty";
import PropertyDetails from "./components/PropertyDetails";
import PassQuery from "./components/PassQuery";

function App() {
  return (
      <Router>
        <Routes>
          {/* Admin side end points */}
          <Route exact path="/AdminHome" element={<AdminHome />} />
          <Route exact path="/AdminHome/ManagePosts" element={<ManagePosts />} />
          <Route exact path="/AdminHome/ManageHotProperties" element={<AdminHome />} />
          <Route exact path="/AdminHome/ManageAds" element={<AdminHome />} />
          <Route exact path="/AdminHome/Queries" element={<Queries />} />
          <Route exact path="/AdminHome/ManageNewProjects" element={<AdminHome />} />
          <Route exact path="/AdminHome/LiveChats" element={<AdminHome />} />
          <Route exact path="/AdminHome/ManagePosts/AddPost" element={<AddPost />} />
          <Route exact path="/AdminHome/ManagePosts/UpdatePost/:id" element={<UpdatePost />} />

          <Route exact path="/Login" element={<LoginPage />} />


          
          {/* User side end points */}
          <Route exact path="/UserHome" element={<UserHome />} />
          <Route exact path="/UserHome/FindProperty" element={<FindProperty />} />
          <Route exact path="/UserHome/PassQuery" element={<PassQuery />} />
          <Route exact path="/UserHome/FindProperty/PropertyDetails/:id" element={<PropertyDetails />} />
          

          <Route path="*" element={<Navigate to="/UserHome" />} />
        </Routes>
      </Router>
  );
}

export default App;
