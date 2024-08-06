import React from 'react'
import './stuff.scss'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import DoctorItem from '../DoctorItem/DoctorItem';
const Caregiver = () => {
  return (
    <section id='nursing' className='py-5 mt-5 bg-light '>
            <div className="stuff-box container bg-white rounded rounded-3 shadow shadow-2 p-4  ">
                <div className=" nursingtext d-flex  align-items-center mb-5 p-3">
                    <ArrowBackIos/>
                    <h2 className='fw-bolder'>Nursing Stuff</h2>
                </div>
                <div className='stuff'>
                    <DoctorItem/>
                    <DoctorItem/>
                    <DoctorItem/>
                    <DoctorItem/>
                    <DoctorItem/>
                    <DoctorItem/>
                    <DoctorItem/>
                </div>
                </div>
        </section>
    
  )
}

export default Caregiver