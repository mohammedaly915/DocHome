import React from 'react'
import './SideBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor,faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import {
    LineStyle,Timeline,TrendingUp,
    PermIdentity,List,MailOutline, DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    AddToQueue,
    QueuePlayNext} from "@mui/icons-material";


import logo from './fullLogo.png'
import { Link } from 'react-router-dom';
const SideBar2 = ({setCurrentPage}) => {

  const sidebarData = [
    {
      title: "Home",
      items: [
        { name: "Home", icon: <LineStyle className="sidebarIcon" />, path: "/" },
      ],
    },
    {
      title: "Caregiver",
      items: [
        { name: "Caregiver", icon: <PermIdentity className="sidebarIcon" />, path: "/patients" },
      ],
    },
    {
      title: "Booking",
      items: [
        { name: "Booking", icon: <PermIdentity className="sidebarIcon" />, path: "/bookings" },
      ],
    },
    {
      title: "",
      items: [
        { name: "Payment", icon: <FontAwesomeIcon className="sidebarIcon" icon={faUserDoctor} />, path: "/payment" },
      ],
    },
    {
      title: "Notifications",
      items: [
        { name: "Notifications", icon: <MailOutline className="sidebarIcon" />, path: "/notification" },
        { name: "Feedback", icon: <DynamicFeed className="sidebarIcon" />, path: "/feedback" },
        { name: "chat", icon: <ChatBubbleOutline className="sidebarIcon" />, path: "/chat" },
      ],
    }
  ];
  
  return (

    <div className="sidebar  fixed">
      <div className="sidebarWrapper">
        <img src={logo} alt='' className='logo'/>
        {sidebarData.map((menu, index) => (
          <div key={index} className="sidebarMenu">
            <h3 className="sidebarTitle">{menu.title}</h3>
            <ul className="sidebarList">
              {menu.items.map((item, idx) => (
                <Link  key={idx} to={item.path} className="link" onClick={() => setCurrentPage(menu.title)}>
                  <li className="sidebarListItem">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar2;