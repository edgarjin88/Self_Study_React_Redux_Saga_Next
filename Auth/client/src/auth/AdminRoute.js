import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./Helpers";

//again, component not required

const AdminRoute = ({ component: Component, ...rest }) => {
  // component={Private}, and ...rest
  console.log("admin", isAuth());
  
  return (
    <Route
      {...rest}
      render={
        props =>
          isAuth() && isAuth().role === 'admin' ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
                // passing state value as well.
              }}
            />
          )
        // double curly brace as the value is an object.
      }
    ></Route>
  );
};

export default AdminRoute;
