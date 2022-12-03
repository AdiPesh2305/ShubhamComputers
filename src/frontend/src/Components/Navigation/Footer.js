import React from 'react';
import "../../styles/Footer.scss";
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <div className='footer-wrapper'>
      <div className='footer-links'>
        <div className='footer-link-items'>
          <h2>Contact Us</h2>
          <a href="tel:9999999999">
            <CallIcon /> +91 9999999999
          </a>
          <a href="mailto:aaa@aaa.com">
            <EmailIcon /> aaa@aaa.com
          </a>
        </div>
        <div className='footer-link-items'>
          <h2>Social Media</h2>
          <Link to='/'><FacebookIcon />Facebook</Link>
          <Link to='/'><WhatsAppIcon />WhatsApp</Link>
          <Link to='/'><TwitterIcon />Twitter</Link>
          <Link to='/'><TelegramIcon />Telegram</Link>
        </div>
        {/* <div className='footer-link-items'>
            <h2>Quick links</h2>
            <Link to='/about'>Products</Link>
            <Link to='/about'>About</Link>
            <Link to='/about'>Contact</Link>
          </div> */}
      </div>
      <div className='social-media-wrap'>
        <div className='footer-logo'>
          <Link to='/' className='social-logo'>
            <img className="branding-logo" src={Logo} alt="logo" />
            Shubham Computers
          </Link>
        </div>
        <div className="website-rights">Copyright © 2015-2022 All Rights Reserved</div>
      </div>
    </div>
  );
}

export default Footer;
