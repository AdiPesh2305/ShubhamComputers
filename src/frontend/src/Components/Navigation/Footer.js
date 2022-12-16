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
import Fab from '@mui/material/Fab';

function Footer() {
  return (
    <div className='footer-wrapper'>
      <div className='footer-links'>
        {/* <div className='footer-link-items'>
          <h2>Quick Links</h2>
          <Link to='/products'>Products</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact-us'>Contact</Link>
        </div> */}
        <div className='footer-link-items'>
          <h2>Social Media</h2>
          <Link to='/'><FacebookIcon />Facebook</Link>
          <Link to="/"><WhatsAppIcon />WhatsApp</Link>
          <Link to='/'><TwitterIcon />Twitter</Link>
          <Link to='/'><TelegramIcon />Telegram</Link>
        </div>
        <div className='footer-link-items'>
          <h2>Contact Us</h2>
          <a href="tel:9322249976">
            <CallIcon /> +91 9322249976
          </a>
          <a href="tel:9222785781">
            <CallIcon /> +91 9222785781
          </a>
          <a href="mailto:mailto:shubhamcomputers@hotmail.com?subject=Inquiry%20about%20Shubham%20Computers%20Products%20&body=Hi, %0D%0A%0D%0A">
            <EmailIcon /> shubhamcomputers@hotmail.com
          </a>
        </div>
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
      <Fab color="success" component="a" href="https://web.whatsapp.com/send?phone=919322249976&text=https://www.shubhamcomputers.com/%0A%0AI'm interested in your products and I have a few questions. Can you help?" aria-label="WhatsApp" className="fabButton">
        <WhatsAppIcon />
      </Fab>
    </div>
  );
}

export default Footer;
