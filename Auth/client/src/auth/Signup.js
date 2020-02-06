import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.min.css'


const Signup = () =>{
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit"
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name)=>(e) =>{

    setValues({...values, [name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault(); 
    setValues({...values, buttonText:'Submitting'})
    axios({
      method: 'POST',
      url:`${process.env.REACT_APP_API}/signup`,
      data:{name, email, password}
    }).then(response =>{

      console.log('signup success ', response)
      setValues({...values, name:'', email:'', password: '', buttonText: 'Submitted'})
      toast.success(response.data.message)
    }
    )
    .catch(error =>{
      console.log('error itself :', error);
      console.log('Sign up error: ', error.response.data);
      // ?? 
      setValues({...values, buttonText:'Submit'})
      toast.error(error.response.data.error)
    })
  }
  const signupForm = () => (
    <form>
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

  return(
    <Layout>
      <div className="col-md-6 offset-md-3">

      <ToastContainer/>
      <h1 className="p-5 text-centered">Signup</h1>
      {signupForm()}
      </div>
    </Layout>
  )
}

export default Signup; 
