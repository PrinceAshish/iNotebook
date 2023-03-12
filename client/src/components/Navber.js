import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navber() {
  let location = useLocation();
  let Navigate = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            i Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={` nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={"/home"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={` nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to={"/about"}
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link to="/login" className="mx-3 btn btn-light" role="button">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-light" role="button">
                  Sing Up
                </Link>
              </form>
            ) : (
              <button onClick={handelLogout} className="btn btn-light">
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
