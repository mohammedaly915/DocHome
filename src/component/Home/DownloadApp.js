import React from 'react'
import { Link } from 'react-router-dom'
import image from './image/App.png'
const DownloadApp = () => {
  return (
    <>
        <section className="Download py-5 d-flex  align-items-center justify-content-center">
                <div className="container w-75">
                    <div className="DownloagItem p-2 rounded rounded-5 shadow">
                            <div className="downloadContent">
                                        <div className="DownloadText item p-3 text-white  ">
                                            <h5 className="fw-bold mb-5">Download DocHome Application</h5>
                                            <p className="lead w-75  fw-light opacity-75 pb-5">Using the app, you can search and book caregiver consultations with ease. Book a caregiver and they will come to you within minutes.</p>
                                        </div>
                                        <Link className='Download_img item' > <img className="mb-3 " src={image} alt="" /></Link>
                            </div>
                            <div className="col-md-4">
                                <div className="DownloadImeg p-0">
                                    <img className=" w-100 " src="" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
    </>
  )
}

export default DownloadApp