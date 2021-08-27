import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import "./navbar.css";

const Navbar = () => {
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("userId");
    Cookies.remove("jwtToken");
    history.push("/signin");
  };
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <h2>Logo</h2>
      </div>

      <ul className="navbar_links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <button className="btn btn-danger" onClick={logOut}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
