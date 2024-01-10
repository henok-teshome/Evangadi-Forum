import React from "react";
import Register from "./Register";
import About from "../../pagess/SignUp/About";


function SignUp() {
  return (
    <div className="sign-up ">
      <div className="container tinshua">
        <div className="row">
          <div className="col-md col-xs-1">
            <Register />
          </div>
          <div className="col-md col-xs-1">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
