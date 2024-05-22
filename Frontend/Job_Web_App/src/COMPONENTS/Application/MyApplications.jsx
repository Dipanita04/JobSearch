/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { user } = useContext(Context); // Use destructuring to access values from Context
  const { isAuthorized } = useContext(Context); // Use destructuring to access values from Context

  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            //setApplications(res.data.applications);
            setApplications(res.data.applications || []);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]); // Include isAuthorized and user in the dependency array

  if (!isAuthorized) {
    navigateTo("/");
  }
  const deleteApplication = async (id) => {
    try {
      await axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section className="my_applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h1>My Applications</h1>
            {applications && applications.length > 0 ? (
              applications.map((element) => (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ))
            ) : (
              <h4>No Applications Found</h4>
            )}
          </div>
        ) : (
          <div className="container">
            <h3>Applications From Job Seeker</h3>
            {applications.map((element) => (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
              />
            ))}
          </div>
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </section>
    </>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name: </span>
            {element.name}
          </p>
          <p>
            <span>Email: </span>
            {element.email}
          </p>
          <p>
            <span>Phone: </span>
            {element.phone}
          </p>
          <p>
            <span>Address: </span>
            {element.address}
          </p>
          <p>
            <span>CoverLetter: </span>
            {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name: </span>
            {element.name}
          </p>
          <p>
            <span>Email: </span>
            {element.email}
          </p>
          <p>
            <span>Phone: </span>
            {element.phone}
          </p>
          <p>
            <span>Address: </span>
            {element.address}
          </p>
          <p>
            <span>CoverLetter: </span>
            {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};
