import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginFailure, loginStart, loginSuccess } from '../../AuthContext/AuthReducer'
import axios from 'axios'
import { AuthContext } from '../../AuthContext/AuthContext'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { Google } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//import logosvg from '../../loginsvg.svg'
import logoin from '../../login.png'
import { validateEmail } from '../../Utilities/AuthUitilitiy'
const Login = () => { 
  const [identifier, setIdentifier] = useState(''); // State to store either email or username
  const [password,setPassword]=useState()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const emailRef=useRef()
  const passwordRef=useRef()

  const navigate=useNavigate()
  const {dispatch,isFetching}=useContext(AuthContext)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const login = async (user, dispatch) => {
    dispatch(loginStart());

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", user);
      dispatch(loginSuccess(res.data));
      console.log("in login code", res.data);
    } catch (err) {
      dispatch(loginFailure());
      console.log("Error:", err);
    }
  };  

const handlelogin=async(e)=>{
    e.preventDefault();
    setIsSubmitting(true); // Disable the button and indicate submission in progress

        // Determine if the input is an email using validateEmail utility
    const input = emailRef.current.value.trim();
    const isEmail = validateEmail(input);

    if (!input || (!isEmail && input.length < 3)) {
      console.log("Please enter a valid email or username.");
      setIsSubmitting(false); // Re-enable the button
      return;
    }
    setIdentifier(input); // Store email or username in state
    setPassword(passwordRef.current.value);
    try{
      if (isEmail) {
        login({ email: identifier, password }, dispatch);
        console.log("email");
      } else {
        login({ userName: identifier, password }, dispatch);
        console.log("username",identifier);
      }
    }catch(err){
      console.log(err);
    } finally {
      setIsSubmitting(false); // Re-enable the button after login attempt
    }
  }


  return (
    <div className='login'>
        
        <div className='left'>
        {/* Place your logo here */}
        <img src={logoin} alt="Logo" className="logo" />
      </div>
      <div className='right'>
            <div className='right-box'>
                  <h1>please login to your account</h1>
                  <form>
                    <div className="input-group">
                      <label htmlFor="emailOrUsername">Username or Email</label>
                      <input ref={emailRef} id="emailOrUsername" type="text" className='inputs' placeholder="Enter your email or username" />
                    </div>                     
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper inputs">
                          <input ref={passwordRef} id="password" type={passwordVisible ? "text" : "password"} className="inputs" placeholder="Password" />
                          <button type="button" onClick={togglePasswordVisibility} className="toggle-visibility">
                            {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </button>
                        </div>
                      </div>                 

                      <button type='submit' onClick={(e)=>handlelogin(e)} className='button' disabled={isSubmitting}>
                        {isFetching ? 'Loading...' : 'Sign In'}
                      </button>
                    </form>

                    <div className='otherSign'>
                      <span className="signWith">Or Sign With</span>
                      <div className="icons">
                          <FacebookIcon className='icon face'/>
                          <Google className='icon google'/>
                          <XIcon className='icon x'/>
                      </div>
                    </div>

                  <h2>Dont have an Account ?<Link to="/register" className='span'>Sign UP</Link></h2>
            
            </div>
        </div>
    </div>
  )
}

export default Login