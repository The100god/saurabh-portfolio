import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Quick Links */}
        <div className="footer__section">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Certificate">Certificate</Link></li>
            <li><Link to="/Portfolio">Portfolio</Link></li>
            <li><Link to="/Resume">Resume</Link></li>
            <li><Link to="/Skills">Skills</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="footer__section">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li><FaEnvelope /> saurabhgoyal8055@gmail.com</li>
            <li><FaPhoneAlt /> +91 8302443507</li>
            <li><FaMapMarkerAlt /> Jodhpur, Rajasthan</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer__section">
          <h4>Follow Me</h4>
          <div className="footer__socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} All rights reserved by <strong>Saurabh Goyal</strong>.</p>
      </div>
    </footer>
  );
};

export default Footer;
