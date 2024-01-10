
import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about">
      <p className="text-start abt-txt">About</p>
      <h2>Evangadi Networks Q&A</h2>
      <p>
        No matter what stage of life you are in, whether you’re just starting
        elementary school or being promoted to CEO of a Fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps.
      </p>
      <br />
      <p>
        Wheather you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here
      </p>
      <Link className="abt-btn btn btn-md btn-primary btn-block" type="submit">
        HOW IT WORKS
      </Link>
    </div>
  );
}

export default About;