import React from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Activate from './auth/Activate'
import Private from './core/Private'
import PrivateRoute from './auth/PrivateRoute'
import Admin from './core/Admin'
import AdminRoute from './auth/AdminRoute'
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'


const Routes= ()=>{
  return (
    <BrowserRouter>
      {/* when we wrap the components with BrowserRouter, Route parameters, path and everything as props */}
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/auth/activate/:token" exact component={Activate} />

        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
        {/* <Route path="/admin" exact component={Admin} /> */}
        <PrivateRoute path="/private" exact component={Private} />
        <AdminRoute path="/admin" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes