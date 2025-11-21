import React from 'react'
import imgBanner from '../../image/1679098103287.png'
import {FaSignInAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const mainBanner = () => {
  return (
    <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
    
     <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className='text-dark'>Just Describe Your Exam and QUIZ-AI will Do Everything.</h2>
                    <p>QUIZ AI is an application based on OpenAI's artificial intelligence. It allows you to generate quizzes "questions with single choice, multiple choice and open-ended" intended for professors and trainers to evaluate their students with ease.</p>
                  </div>
                  <div className="col-lg-12">
                    <div className="white-button first-button scroll-to-section">
                    <ul>
                      <li className="gradient-button">
                            <Link to={'/Auth'}><FaSignInAlt /> Try QUIZ-AI</Link>
                      </li>
                    </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <img src={imgBanner} alt="image AI in Education"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default mainBanner