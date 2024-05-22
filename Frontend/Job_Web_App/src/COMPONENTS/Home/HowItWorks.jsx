//import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>HOW JOB SEARCH WORKS</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Find a match for your skills and interests and get a head start on
              growing your career.
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find A Job / Post a Job</p>
            <p>
              Take advantage of the opportunity to work alongside experienced
              professionals and broaden your horizon.
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Search For Jobs</p>
            <p>
              Your job growth is important to us and we’re working hard to find
              the right opportunity that fits your long-term career goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
