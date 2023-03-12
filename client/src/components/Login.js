import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const Navigate = useNavigate();
  const [detail, setDetail] = useState({ email: "", password: "" });

  const handelSubmit = async (e) => {
    e.preventDefault();
    let URL = "http://localhost:8080/auth/login";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: detail.email, password: detail.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Login successfully", "success");
      Navigate("/home");
    } else {
      props.showAlert("Invalid Detail", "danger");
    }
  };
  const handelChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Login to Use iNotebook</h2>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handelChange}
            value={detail.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            name="password"
            onChange={handelChange}
            value={detail.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
