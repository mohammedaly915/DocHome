import React, { useState } from 'react'
import './Main.scss'
import SideBar from '../../component/Sidebar/SideBar'
import Doctor from './Doctor'
import Booking from './Booking'
import SettingsPage from './SettingsPage'
import Profile from './Profile'
import Notification from '../Notifcation/Notification'
import Chat from '../chat/Chat'
import { Navigate, Route, Routes } from 'react-router-dom'
import Service from '../../component/Stuff/Service'
import DoctorChec from '../../pages/DoctorCheque/DoctorChec'
const Main = ({user}) => {
  const [page,setPage]=useState('booking')
  const [sidebar,setsideBar]=useState(true)
  
  console.log(sidebar);

  return (

    <> 
    <div className='main-page'>

    <SideBar setPage= {setPage} sidebar={sidebar} page={page}/>
       
      <Routes>
          <Route path="doctor/*" element={<Doctor setsidebar={setsideBar}/>} />
          <Route path='doctor/service/*' element={<Service setsidebar={setsideBar} />}/>
          <Route path='doctor/service/appointment/' element={<DoctorChec user={user}/>}/>
          <Route path="profile" element={<Profile user={user}/>} />
          <Route path="booking" element={<Booking user={user}/>} />
          <Route path="setting/*" element={<SettingsPage/>} />
          
        </Routes>
    </div>
    </>
  )
}

export default Main