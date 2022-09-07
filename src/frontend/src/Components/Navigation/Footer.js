import React from 'react';
// import "../styles/Footer.scss";
import "../../styles/Footer.scss";
// import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Reach out to us for more details
        </p>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>
              <Link to='/about'>About Us</Link>
            </h2>
          </div>
          <div className='footer-link-items'>
            <h2>
              <Link to='/'>Contact Us</Link>
            </h2>
          </div>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Facebook</Link>
            <Link to='/'>WhatsApp</Link>
            <Link to='/'>Twitter</Link>
            <Link to='/'>Telegram</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              Shubham Computers
            </Link>
          </div>
          {/* <small className='website-rights'>TRVL © 2020</small> */}
          <div className="website-rights">Copyright © 2015-2022 All Rights Reserved</div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
