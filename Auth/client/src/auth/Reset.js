import React, { useState, useEffect } from "react";
import jwt from 'jsonwebtoken'
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Reset = ({ match }) => {  //props.match from react router
  // as this component was wrapped with browser router, history props are provided.

  const [values, setValues] = useState({
    name: '',
    token:'',
    newPassword:'',
    buttonText: "Reset password"
  });


  useEffect(()=>{
    let token = match.params.token
    let {name} = jwt.decode(token) 
    if(token){
      setValues({...values, name, token})
    }
  }, [])

  const { name, token, newPassword, buttonText } = values;

  const handleChange = e => {
    setValues({ ...values, newPassword: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log("Reset password success ", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch(error => {
        console.log("Reset error :", error);
        // console.log("Sign in error: ", error.response.data);
        // ??
        setValues({ ...values, buttonText: "Reset password" });
        toast.error(error.response.data.error);
      });
  };
  const ResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Password</label>
        <input placeholder="Type new password"
          value={newPassword}
          className="form-control"
          onChange={handleChange}
          type="password"
          required
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
        <h1 className="p-5 text-centered">Hey {name}, Type your new password</h1>
        {ResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
