import React from 'react'
import image from './image/injection.png'
const Blog = () => {
  return (
    <>
        <div className="col-md-4">
                            <div className="BlogItem d-flex">
                                <div className=" px-3">
                                    <img className=" " src={image} alt="" />
                                </div>
                                <div className="blog_text">
                                    <h6 className=" fw-bolder mb-3">Search and book an appointment</h6>
                                    <p className=" text-muted">Request a home visit from the doctor, book medical services or procedures, and you can also contact the doctor for quick inquiries at the best available prices.</p>
                                </div>
                            </div>
                        </div>
    </>
  )
}

export default Blog