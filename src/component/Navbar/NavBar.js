import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Notifications, Search } from '@mui/icons-material';
import './Navbar.scss';
import { logout } from '../../AuthContext/AuthReducer';
import { AuthContext } from '../../AuthContext/AuthContext';
import axios from 'axios';
import { useFetch } from '../../hooks/useFetch';

const NavBar = ({ user }) => {
  const { dispatch } = useContext(AuthContext);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [activeButton,setActiveButton]=useState("")
  const navigate = useNavigate();
  console.log("patient",user);
  const profileRef = useRef(null);
   //Custom hook to fetch wallet balance
  const { data: walletData, loading: walletLoading, error: walletError } = useFetch(
    `http://localhost:4000/wallets?user_id=${user?.id || ''}` // Use user?.id to safely access nested property
  );

  useEffect(() => {
    if (walletData && walletData.length > 0) {
      setWalletBalance(walletData[0].balance.toFixed(2));
    }
  }, [walletData]);

  useEffect(() => {
    if (walletError) {
      console.error('Error fetching wallet balance:', walletError);
    }
  }, [walletError]);

  const handleCaregiverClick = () => {
    if (user) {
      window.open('http://localhost:3000/', '_blank');
      } else {
      alert('Please login to sign up as a caregiver');
    }
  };

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
  };

  const toggleProfile = () => {
    setProfileOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <nav className="nav">
      <div className='container'>
        <div className='left'>
          <Link to="/" className='link'>
            <span>Home</span>
          </Link>
          <Link to={user ? "/main/booking" : '/login'} className='link'>
            <span>Main</span>
          </Link>
          <Link to={user ? "/wallet" : '/login'} className='link'>
            <span>My Wallet</span>
          </Link>
          {user ? (
            <div onClick={handleCaregiverClick} className='link'>
              <span>Sign as caregiver</span>
            </div>
          ) : null}
        </div>
        <div className='right'>
        <Search className="icon search-icon" onClick={toggleSearch} />
          {searchOpen && (
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              onBlur={() => setSearchOpen(false)}
              autoFocus
            />
          )}
          {user ? (
            <>
      
              <div className='balance'>
                <span>{`Balance: ${walletLoading ? 'Loading...' : `$${walletBalance}`}`}</span>
              </div>
              <div className='profile icon' onClick={toggleProfile} ref={profileRef}>
                <img src={user.profilePic} alt='Profile' />
                {profileOpen && (
                  <div className='option'>
                    <div className='header'><span>{`${user.Fname} ${user.Lname}`}</span></div>
                    <Link className='span' to='/settings'>Settings</Link>
                    <div className='span' onClick={handleLogout}>Logout</div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={`link login-btn ${activeButton === 'login' ? 'active' : ''}`} onClick={() => handleButtonClick('login')}>
                <span>Login</span>
              </Link>
              <Link to="/register" className={`link register-btn ${activeButton === 'register' ? 'active' : ''}`} onClick={() => handleButtonClick('register')}>
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
