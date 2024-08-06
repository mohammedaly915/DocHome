import React, { useEffect, useState } from 'react';
import logo from '../footer/logo1Dochome.png';
import HomeIcon from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import Notifications from '@mui/icons-material/Notifications';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MasksIcon from '@mui/icons-material/Masks';
import SettingsIcon from '@mui/icons-material/Settings';
import './Side.scss';
import { useNavigate } from 'react-router-dom';
import { Chat, Settings } from '@mui/icons-material';

const SideBar = ({ setPage, page ,sidebar }) => {
    const [expanded, setExpanded] = useState(false);
    const [activePage, setActivePage] = useState(page);
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger the expanded state after a delay to simulate the logo reveal
        setTimeout(() => {
            setExpanded(true);
        }, 1000); // Adjust the delay as needed
    }, []);

    const handleNavigate = (page) => {
        setActivePage(page);
        navigate(page);
    };

    return (
        <div className={`sidebar fixed ${expanded ? 'expanded' : ''} ${sidebar? '' :'imshow'}`}>
            <div className='logo'>
                <div className='semi_circle'>
                    <img src={logo} alt='' />
                </div>
            </div>
            <div className='menu'>
                <div onClick={() => handleNavigate("booking")} className={`booking-icon icon ${activePage === "booking" ? "active" : ""}`}>
                    <MedicalServicesIcon />
                    <p>Booking</p>
                </div>
                <div onClick={() => handleNavigate("profile")} className={`profile icon ${activePage === "profile" ? "active" : ""}`}>
                    <People />
                    <p>Profile</p>
                </div>
                <div onClick={() => handleNavigate("doctor")} className={`caregiver icon ${activePage === "caregiver" ? "active" : ""}`}>
                    <MasksIcon />
                    <p>Caregivers</p>
                </div>
            </div>
            <div className={`setting ${activePage === "setting" ? "active" : ""}`} onClick={() => handleNavigate("setting")}>
                <Settings />
                <p>Settings</p>
            </div>
        </div>
    );
}

export default SideBar;
