import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Forgot = ({ history }) => {
  // as this component was wrapped with browser router, history props are provided.

  const [values, setValues] = useState({
    email: process.env.REACT_APP_ID,
    buttonText: "Request password reset link"
  });

  const { email, buttonText } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email }
    })
     
      .then(response => {
        console.log("forgot password success ", response);
        toast.success(response.data.message)
        setValues({...values, buttonText: 'Requested'})
      })
      .catch(error => {
        console.log("forgot error :", error);
        // console.log("Sign in error: ", error.response.data);
        // ??
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };
  const forgotForm = () => (
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
        {/* {JSON.stringify(isAuth())} */}
        <ToastContainer />
        {/* {isAuth()} */}
        <h1 className="p-5 text-centered">Forgot password</h1>
        {forgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
