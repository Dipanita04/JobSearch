import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  const { id } = useParams();
  const handleFileChange = (e) => {
    //   const resume = e.target.files[0];
    //   setResume(resume);
    // };
    const file = e.target.files[0];
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Resume file is required.");
      return;
    }

    //const { id } = useParams();
    // const handleApplication = async (e) => {
    //   e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success("Application Submitted!");
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("");
  }
  return (
    <>
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>
          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write a Cover Letter."
            />
            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                {" "}
                Select Your Resume
              </label>
              <input
                type="file"
                accept=".jpg, .jpeg"
                onChange={handleFileChange}
                style={{ width: "100%" }}
                required
              />
            </div>
            <button type="submit">Send Application Form Here</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Application;
