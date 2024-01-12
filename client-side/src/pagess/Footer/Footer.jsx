import React from "react";
import Logo from "../../assets/img/footerlogo.png";
import { Link } from "react-router-dom";
import "./Footer.css";
import { AiFillFacebook } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
import { AiFillYoutube } from "react-icons/ai";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-warpper">
        <div className="footer-top">
          <div className="container">
            <div className="footer-bottom-content clearfix">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="logo-footer">
                    <a className="navbar-brand" href="/">
                      <img src={Logo} alt="" />
                    </a>
                  </div>

                  <ul className="footer-social-list list-social list-inline">
                    <li>
                      <Link to="https://www.facebook.com/EthiopiansNetwork">
                        <i className="social_facebook ">
                          <AiFillFacebook />
                        </i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.instagram.com/evangaditech/">
                        <i className="social_instagram ">
                          <TiSocialInstagram />
                        </i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.youtube.com/c/weareethiopians">
                        <i className="social_youtube ">
                          <AiFillYoutube />
                        </i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h5>Useful Link</h5>
                  <ul className="list-menu">
                    <li>
                      <a className="a" href="/explained">
                        How it works{" "}
                      </a>
                    </li>
                    <li>
                      <a className="a" href="/legal/terms/">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a className="a" href="/legal/privacy/">
                        Privacy policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h4>Contact Info</h4>
                  <ul className="list-menu contact-list">
                    <li className="b">Evangadi Networks || Henok Setegne</li>
                    <li className="b">henoksetegne@gmail.com</li>
                    <li className="b">+251-1111111111</li> 
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
