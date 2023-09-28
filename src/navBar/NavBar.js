import React from 'react';
import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../img/logo.png';

function NavBar() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="navBar">
      <Link to="/">
        <img className="navbar-logo" src={logo} alt="" />
      </Link>
      
      <ul className="nav-links">
        <Link to="/">
          <li className="nav-link">Home</li>
        </Link>
        
        {isLandingPage && (
          <ScrollLink to="contactUs" spy={true} smooth={true} duration={500}>
            <li className="nav-link">Contact</li>
          </ScrollLink>
        )}
        
        {!isLandingPage && (
          <Link to="/contactUsPage">
            <li className="nav-link">Contact </li>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
