import React from 'react';
import fb from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import linkedin from '../../assets/linkedin.png'
import logo from '../../assets/logo.png'
const Footer = () => {
  return (
    <footer>
  <div class="footer-container">
    <div class="footer-section logo-section">
      <img src={logo} alt="Logo" class="logo" />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, nisi repudiandae sunt molestias et minima optio beatae asperiores? Tempore assumenda temporibus ab nihil iusto possimus earum molestias accusamus voluptas dolore.</p>
    </div>
    <div class="footer-section quick-links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Pricing</a></li>
      </ul>
    </div>
    <div class="footer-section contact">
      <h3>Contact Us</h3>
      <p>Email: <a href="mailto:team.hexabit@gmail.com">team.hexabit@gmail.com</a></p>
      <p>Phone: <a href="tel:017********">017********</a></p>
      <div class="social-media">
        <a href="#"><img src={fb} alt="Facebook" /></a>
        <a href="#"><img src={instagram} alt="Instagram" /></a>
        <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;
