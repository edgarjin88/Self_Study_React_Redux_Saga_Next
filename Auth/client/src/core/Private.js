import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth, getCookie, signout } from "../auth/Helpers";

const Private = ({history}) => {
  const [values, setValues] = useState({
    role:'',
    name: '',
    email: '',
    password: '',
    buttonText: "Submit"
  });

  useEffect(()=>{
    loadProfile()
  },[])

  const token = getCookie('token')
  const loadProfile =()=>{
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response =>{
      console.log('Proifle update :', response);
      const {role, name, email} = response.data
      setValues({...values, role, name, email})
    })
    .catch(error =>{
      console.log('profile update error', error)
      if(error.response.status === 401){
        signout(()=>{
          history.push('/')
        })
      }
    })
  }
  const { role, name, email, password, buttonText } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
      .then(response => {
        console.log("signup success ", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted"
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("error itself :", error);
        console.log("Sign up error: ", error.response.data);
        // ??
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };
  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Role</label>
        <input
          disabled
          defaultValue={role}
          className="form-control"
          type="text"
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Name</label>
        <input
          value={name}
          className="form-control"
          onChange={handleChange("name")}
          type="text"
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Email</label>
        <input
          disabled
          defaultValue={email}
          className="form-control"
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
        <h1 className="pt-5 text-centered">Private</h1>
        <p className="lead text-center">Profile update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private; 
