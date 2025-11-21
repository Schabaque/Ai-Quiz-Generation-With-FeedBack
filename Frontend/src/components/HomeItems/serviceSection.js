import React from 'react'
import imgLine from '../../image/heading-line-dec.png'

const serviceSection = () => {

  return (
  <div id="services" className="services section">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            <h4>Amazing <em>Services &amp; Features</em> for You</h4>
            <img src={imgLine} alt="line heading image"/>
            <p>Whether you are a teacher or student in Computer Science, Science, Mathematics, Literature or any other field, our QUIZ-AI application is here to satisfy you in your work and teaching</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="service-item first-service">
            <div className="icon"></div>
            <h4>Create and Customize</h4>
            <p>Generate your Exams with a small description and a few clicks</p>
            <div className="text-button">
              <a href="#">See more <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item second-service">
            <div className="icon"></div>
            <h4>Include & Engage</h4>
            <p>Engage students flexibly at their own pace, from any device</p>
            <div className="text-button">
              <a href="#">See more <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item third-service">
            <div className="icon"></div>
            <h4>Get Data</h4>
            <p>See overall class performance, the most difficult question or subject and individual progress</p>
            <div className="text-button">
              <a href="#">See more <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item fourth-service">
            <div className="icon"></div>
            <h4>24/7 Help &amp; Support</h4>
            <p>We are available 24/7 <a href="mailto:Quiz.AI.contact@gmail.com">Contact us</a> if you encounter any problems.</p>
            <div className="text-button">
              <a href="#">See more <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default serviceSection