import React from 'react'
import imgLine from '../../image/heading-line-dec.png'
import imgAbout from '../../image/imgAbout.png'

const aboutSection = () => {

  return (
    <div id="about" className="about-us section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          <div className="section-heading">
            <h4>About <em>QUIZ-AI</em></h4>
            <img src={imgLine} alt=""/>
            <p>QUIZ-AI A Powerful and Easy-to-Use Tool for Evaluating Students with Simplicity.</p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Exam Generation</a></h4>
                <p>Just with a Description</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Make Learning Fun and Interactive</a></h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Visualize Results and Track Your Students' Progress</a></h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">24/7 Support &amp; Help</a></h4>
                <p>Contact us if there are any Problems</p>
              </div>
            </div>
            <div className="col-lg-12">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor idunte ut labore et dolore adipiscing  magna.</p>
              <div className="gradient-button">
                <a href="#">University Plan</a>
              </div>
              <span>*No Credit Card Required</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-image">
            <img src={imgAbout} alt="image dashborad"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default aboutSection