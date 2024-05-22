import { useEffect, useContext } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./COMPONENTS/Auth/Login";
import Register from "./COMPONENTS/Auth/Register";
import Navbar from "./COMPONENTS/Layout/Navbar";
import Footer from "./COMPONENTS/Layout/Footer";
import Home from "./COMPONENTS/Home/Home";
import Jobs from "./COMPONENTS/Job/Jobs";
import JobDetails from "./COMPONENTS/Job/JobDetails";
import MyJobs from "./COMPONENTS/Job/MyJobs";
import PostJobs from "./COMPONENTS/Job/PostJob";
import Application from "./COMPONENTS/Application/Application";
import MyApplications from "./COMPONENTS/Application/MyApplications";
//import MyApplications from "./COMPONENTS/Application/MyApplications";
import NotFound from "./COMPONENTS/NotFound/NotFound";
import axios from "axios";
//import { Toaster } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/me" element={<MyApplications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
};

export default App;
