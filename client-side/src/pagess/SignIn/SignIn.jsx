import React from "react";

import About from "./About";
import Login from "../../pagess/SignIn/Login";

function SignIn() {
  return (
    <div className="sign-up">
      <div className="container">
        <div className="row ">
          <div className="col">
            <Login />
          </div>
          <div className="col">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;