import React from 'react'
import land from './image/topsphere-media-WxRd7byFxs4-unsplash.jpg'
const LandingPage = () => {
  return (
    <div className="landing-page">
      <img  src={land} alt="Background Image" className="background-image" />
      <div className="content-wrapper">
        <div className="hometext d-flex align-items-center ps-5 vh-100">
                <div className="item ps-5 text-white ">
                    <h1 className=" fw-bold opacity-75"> Reviews for </h1>
                    <h2 className=" fw-bold mb-5 h1 opacity-75"> Nursing Care Providers </h2>
                    <p className="lead opacity-50 py-5">Yes, home care has expanded in recent years to includea <br /> more full range of services but what does that mean <br /> for you? Overall, the importance of home nursing is  <br /> significant to  a larger number of patients,</p>
                    <div className="botn">Read more ....</div>
                </div>
          </div>
      </div>
    </div>
  )
}

export default LandingPage