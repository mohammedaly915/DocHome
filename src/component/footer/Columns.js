import React from 'react'
import { Link } from 'react-router-dom'

const Columns = ({spec}) => {
  return (
    <>
        <div className="col-md-3">
            <div className="footertext1">
              <h5 className='mb-1 fw-bold title'>{spec.title}</h5>
              <div className="">
                <ul>
                    {spec.content.map((content ,index)=>(<li key={index}><Link to="/company " className='content'>{content}</Link></li>))}
                </ul>
              </div>
            </div>
          </div>
    </>
  )
}

export default Columns