import React from 'react';
import {Link, withRouter} from 'react-router-dom'


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