import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../pictures/logo.jpg";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../pages/context/Context";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(DataContext);
  const handleLogout = async () => {

    const response = await axios.get('/users/logout')

    if (response.data.success) {
       // clear the context
    setUserData(null);
    }
   
    // redirect user to home
    navigate("/login");
    console.log("after logout userDataContext is:", userData);
  };

  return (
    <div className="navbar-comp">
      <nav className="navbar navbar-light bg-dark">
        <div className="container">
          <div className="navbar-left">
            {" "}
            <Link to="/" className="navbar-brand logo">
              <img src={logo} alt="" width="40" height="40" />
            </Link>
            <Link to="/employee" className="links emp-Link">
                Employees
            </Link>
            <Link to="/admin" className="links admin-Link">
                Admin
            </Link>
            <Link to="/posts" className="links admin-Link">
                Posts
            </Link>
          </div>
          <div className="navbar-right  ">
            <nav className="navbar navbar-expand-lg ">
              <div className="container-fluid ">
                <div className="right-logo ">
                  {" "}
                  <Link to="/home" className="navbar-brand ">
                    <img src={logo} alt="" width="40" height="40" />
                  </Link>
                </div>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" collapse navbar-collapse " id="navbarNav">
                  {!userData ? (
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link
                          to="/login"
                          className="nav-link active"
                          aria-current="page"
                        >
                          Sign In
                        </Link>
                      </li>

                      {
                        <li className="nav-item">
                          <Link to="/" className="nav-link">
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                          </Link>
                        </li>
                      }
                    </ul>
                  ) : (
                    <div className="dropdown">
                      <button className="dropbtn">
                        {" "}
                        {userData.username.toUpperCase()}{" "}
                        <img className="navbar-image" src={userData.image} alt="" />
                      </button>

                      <div className="dropdown-content">
                        <Link to="/profile">Profile</Link>
                        <Link to="/dashboard">Employees</Link>
                        <Link onClick={handleLogout} to="/">
                          Sign Out
                        </Link>
                      </div>
                      <div>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
