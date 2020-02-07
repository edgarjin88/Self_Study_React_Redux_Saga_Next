import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import jwt from 'jsonwebtoken'

// browserRouter injects match props
const Activate = ({match}) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show:true,
  });

  //params.token == /:token in Routes
  useEffect(()=>{
    let token=match.params.token
    let {name} = jwt.decode(token)
    if(token){
      setValues({...values, name, token})
    }
  }, [])
  
  const { name, token, show } = values; 

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    })
      .then(response => {
        console.log("account activation ", response);
        setValues({
          ...values,
          show: false,
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("error itself :", error);
        console.log("account error: ", error.response.data.error);
        // ??
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-centered">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button
        className="btn btn-outline-primary text-centered"
        onClick={handleSubmit}
      >
        Activate Account
      </button>
    </div>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
