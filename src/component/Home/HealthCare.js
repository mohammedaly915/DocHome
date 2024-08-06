import React from 'react'
import image from './image/nurse.png'
const HealthCare = () => {
  return (
    <>
        <section id="Morehealthcare" className=" bg-light py-5">
                <div className="footerline w-100  bg-light pt-1"></div>
                <div className="container">
                    <h2 className="fw-bolder text-center pt-2">More health care</h2>
                    <p className="text-muted lead text-center w-25  mx-auto"> We care about your health and well-being, your health matters to us</p>
                    <div className="footerline w-25  bg-dark opacity-25 mx-auto pt-1 mb-4  "></div>
                </div>
                <div className="container w-75 bg-white rounded rounded-5 shadow mb-5">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-4">
                            <div className=" p-5">
                                <img className="w-100 mx-auto mb-5" src={image} alt="" />
                            </div>
                        </div>
                        <div className="col-md-7 offset-md-1">
                            <div className="p-5">
                                <h4 className="fw-bold py-4">Do you have any medical  <br /> questions?</h4>
                                <p className=" text-muted lead w-75 mb-5 ">Send your medical question and get an answer from a specialist doctor</p>
                                 <button className="btn btn1 mb-3 shadow-lg px-5 "> Ask Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container w-75 bg-white rounded rounded-5 shadow  ">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 offset-md-1 ">
                            <div className="p-5">
                                <h4 className="fw-bold py-4">Doctor call </h4>
                                <p className=" text-muted lead w-75 mb-5 ">Determine the call time in agreement with the caregiver</p>
                                <button className="btn btn1 mb-3 shadow-lg px-5 "> Book a call</button>
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className=" p-5">
                                <img className="w-100 mx-auto mb-5" src={image} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default HealthCare