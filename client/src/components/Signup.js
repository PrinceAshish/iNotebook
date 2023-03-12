import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const Navigate = useNavigate();
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handelSubmit = async (e) => {
    console.log("im handel");
    e.preventDefault();
    let URL = "http://localhost:8080/auth/createUser";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: detail.name,
        email: detail.email,
        password: detail.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account created Successfully", "success");
      Navigate("/home");
    } else {
      props.showAlert("Invalid credencial", "danger");
    }
  };
  const handelChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2 className="mx-4 my-4">Sign Up</h2>
      <div className="container">
        <form className="mx-1 mx-md-4" onSubmit={handelSubmit}>
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              {/* **** I N P U T ****** */}
              <input
                type="text"
                id="form3Example1c"
                className="form-control"
                name="name"
                onChange={handelChange}
                minLength={3}
              />
              <label className="form-label" htmlFor="form3Example1c">
                Your Name
              </label>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              {/* **** E M A I L  ****** */}
              <input
                type="email"
                id="form3Example3c"
                className="form-control"
                name="email"
                onChange={handelChange}
              />
              <label className="form-label" htmlFor="form3Example3c">
                Your Email
              </label>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              {/* **** P A S W O R D ****** */}
              <input
                type="password"
                id="form3Example4c"
                className="form-control"
                name="password"
                onChange={handelChange}
                minLength={5}
              />
              <label className="form-label" htmlFor="form3Example4c">
                Password
              </label>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              {/* **** C P A S W O R D ****** */}
              <input
                type="password"
                id="form3Example4cd"
                className="form-control"
                name="cpassword"
                onChange={handelChange}
                minLength={5}
              />
              <label className="form-label" htmlFor="form3Example4cd">
                Repeat your password
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
