import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";

const Facebook = ({ informParent = f => f }) => {
  // f=> f is just default prop types that tells it is a function
  const responseFacebook = response => {
    console.log("google auth: ", response.tokenId);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook-login`, //send token to backend
      data: { userId: response.userID, accessToken: response.accessToken }
    })
      .then(response => {
        console.log("facebook sign in success", response);
        //inform parent component.
        informParent(response); // then the infor from back end to parent.
      })
      .catch(error => {
        console.log("facebook sign error :", error.response);
      });
  };
  return (
    <div className="pb-3">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            className="btn btn-primary btn-lg btn-block"
          >
            <i className="fab fa-facebook pr-2"></i>
            Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default Facebook;
