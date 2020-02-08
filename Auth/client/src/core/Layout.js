import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import { isAuth, signout } from '../auth/Helpers';

const Layout = ({children, match, history})=>{
  // withRouter gives history props, list of history where been to. 

  const isActive = path => {
    if(match.path === path){ 
      // or, history.location.pathname ===path
      return {color: '#000'}
    }else{
      return {color: '#fff'}
    }
  }
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link style={isActive("/")} to="/" className=" nav-link">
          {/* to, not href */}
          Home
        </Link>
      </li>

      {!isAuth() && (
        <>
          {/* this is the case where I need fragment */}
          <li className="nav-item">
            <Link
              style={isActive("/signin")}
              to="/signin"
              className=" nav-link"
            >
              Signin
            </Link>
          </li>

          <li className="nav-item">
            <Link
              style={isActive("/signup")}
              to="/signup"
              className=" nav-link"
            >
              Signup
            </Link>
          </li>
        </>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <li className="nav-item">
          <Link to="/admin" className="nav-link" style={isActive("/admin")}>
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item">
          <Link to="/private" className="nav-link" style={isActive("/private")}>
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#fff" }}
            onClick={() => {
              signout(() => {
                history.push("/"); // callback function in signout function
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
  return (
    <>
      {nav()}
      <div className="container">{children}</div>
    </>
  );
}


export default withRouter(Layout);