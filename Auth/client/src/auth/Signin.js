import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: process.env.REACT_APP_ID,
    password: process.env.REACT_APP_PASSWORD,
    buttonText: "Submit"
  });

  const {  email, password, buttonText } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
    // save the resopnse(user, token) to localstorage/cookie. cookie is more secure. 

      .then(response => {
        console.log("signup success ", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted"
        });
        toast.success(`Hey ${response.data.user.name}, Welcome back!`);
      })
      .catch(error => {
        console.log("error itself :", error);
        console.log("Sign in error: ", error.response.data);
        // ??
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };
  const signinForm = () => (
    <form>


      <div className="form-group">
        <label className="text-muted"> Email</label>
        <input
          value={email}
          className="form-control"
          onChange={handleChange("email")}
          type="email"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          value={password}
          className="form-control"
          onChange={handleChange("password")}
          type="password"
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-centered">Signin</h1>
        {signinForm()}
      </div>
    </Layout>
  );
};

export default Signin;
