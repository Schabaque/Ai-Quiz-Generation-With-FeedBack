import React from 'react'

const Footer = () => {
  return (
    <footer id="newsletter">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="section-heading">
            <h4>Join our newsletter to receive news &amp; the latest trends</h4>
          </div>
        </div>
        <div class="col-lg-6 offset-lg-3">
          <form id="search" action="#" method="GET">
            <div class="row">
              <div class="col-lg-6 col-sm-6">
                <fieldset>
                  <input type="address" name="address" class="email" placeholder="Email Address..." autocomplete="on" required/>
                </fieldset>
              </div>
              <div class="col-lg-6 col-sm-6">
                <fieldset>
                  <button type="submit" class="main-button">Subscribe  <i class="fa fa-angle-right"></i></button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="footer-widget">
            <h4>Contact Us</h4>
            <p>Morocco, Rabat 10000 </p>
            <p><a href="mailto:abderrahmane_jabli@um5.ac.ma">Abderrahmane_Jabli@um5.ac.ma</a></p>
            <p><a href="mailto:ayoub_derdouri@um5.ac.ma">Ayoub_Derdouri@um5.ac.ma</a></p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="footer-widget">
            <h4>QUIZ-AI</h4>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#clients">Testimonials</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#clients">Testimonials</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="footer-widget">
            <h4>Our Team</h4>
            <p class="mt-3">Group 4: JABLI Abderrahmane & DERDOURI Ayoub.</p>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="copyright-text">
            <p>Copyright © 2023 QUIZ-AI. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer