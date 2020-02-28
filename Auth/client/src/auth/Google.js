import React from "react";
import {GoogleLogin} from "react-google-login";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";


const Google = ({informParent= f=>f})=>{ // f=> f is just default prop types that tells it is a function
  const responseGoogle = (response) =>{
    console.log('google auth: ', response.tokenId);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/google-login`, //send token to backend
      data: { idToken: response.tokenId }
    }).then(response => {
        console.log("google sign in success", response);
        //inform parent component.
        informParent(response); // then the infor from back end to parent.
      }).catch(error => {
        console.log("google sign error :", error.response);
      });

  }
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        buttonText="Login"
        onSuccess={responseGoogle} // callback excuted on success
        onFailure={responseGoogle}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}
          className="btn btn-danger btn-lg btn-block"
          >
            <i className="fab fa-google-plus-g pr-2"></i>
            Login with Google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Google