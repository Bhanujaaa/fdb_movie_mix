import React, { useState } from "react";
import Axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "../Styling/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:8080/user";
  const loginSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${url}/login`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message === "Admin logged in successfully") {
        console.log("admin dashbord");
        console.log(response);
        secureLocalStorage.setItem("admin_id", response.data.admin_id);
        navigate("/admin");
      } else {
        secureLocalStorage.setItem("admin_id", response.data.user_id);
        console.log("user dashboard");
        navigate("/user");
      }
    });
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={loginSubmit}>
        <label htmlFor="username" className="form-label">
          User Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your username"
          id="username"
          name="username"
        />

        <label htmlFor="password" className="form-label">
          password
        </label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="your password"
          id="password"
          name="password"
        />
        <div className="button-container">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
          <p>
            new user?
            <Link to="/register" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
