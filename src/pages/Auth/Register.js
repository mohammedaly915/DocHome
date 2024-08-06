import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoin from '../../login.png';
import { validateEmail, validatePassword } from '../../Utilities/AuthUitilitiy';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Auth.scss'; // Make sure to import your updated SCSS file
import { Google } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUser] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    containsNumber: false,
    containsLowercase: false,
    containsUppercase: false,
    containsSpecial: false,
    minLength: false,
  });
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  useEffect(() => {
    console.log(`Remember ${isPolicyAccepted}`);
  }, [isPolicyAccepted]);

  const handleCheckboxChange = (event) => {
    setIsPolicyAccepted(event.target.checked);
    console.log(isPolicyAccepted);
  };

  const handlePasswordChange = async (value) => {
    setPassword(value);
    const validationResults = await validatePassword(value);
    Promise.allSettled(Object.values(validationResults)).then((results) => {
      const updatedValidation = {
        containsNumber: results[0].status === 'fulfilled',
        containsLowercase: results[1].status === 'fulfilled',
        containsUppercase: results[2].status === 'fulfilled',
        containsSpecial: results[3].status === 'fulfilled',
        minLength: results[4].status === 'fulfilled',
      };
      setPasswordValidation(updatedValidation);
    });
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setFirstName(firstNameRef.current.value);
    setLastName(lastNameRef.current.value);
    setUser(userNameRef.current.value);
    setEmail(emailRef.current.value);
    setPhone(phoneRef.current.value);
    setPassword(passwordRef.current.value);
    setConfirm(confirmRef.current.value);

    if (!firstName || !lastName || !userName || !email || !phone || !password || !confirm) {
      console.log('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      console.log('Invalid email format.');
      return;
    }

    const passwordValidationResult = Object.values(passwordValidation).every((v) => v === true);
    if (!passwordValidationResult) {
      console.log('Password does not meet the requirements.');
      return;
    }

    if (password !== confirm) {
      console.log('Passwords do not match.');
      return;
    }

    navigate('/region', { state: { Fname:firstName, Lname:lastName, userName, email, phone, password} });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmVisibility = () => {
    setConfirmVisible(!confirmVisible);
  };

  return (
    <div className="register">
      <div className="left">
        <form>
          <div className="name-inputs">
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input ref={firstNameRef} id="firstName" type="text" className="inputs" placeholder="First Name" />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input ref={lastNameRef} id="lastName" type="text" className="inputs" placeholder="Last Name" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="userName">User Name</label>
            <input ref={userNameRef} id="userName" type="text" className="inputs" placeholder="User Name" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} id="email" type="email" className="inputs" placeholder="Email" />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input ref={phoneRef} id="phone" type="number" className="inputs" placeholder="Phone" />
          </div>
          <div className="input-wrapper">
              <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper inputs">
                    <input ref={passwordRef} id="password" type={passwordVisible ? "text" : "password"} className="inputs" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} />
                    <button type="button" onClick={togglePasswordVisibility} className="toggle-visibility">
                      {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                </div>
              {password && (
                <div className="validation-icons">
                  <div className="validation-item">
                    <span>Number</span>
                    {passwordValidation.containsNumber ? <CheckIcon className="check-icon" /> : <CloseIcon className="close-icon" />}
                  </div>
                  <div className="validation-item">
                    <span>Lowercase</span>
                    {passwordValidation.containsLowercase ? <CheckIcon className="check-icon" /> : <CloseIcon className="close-icon" />}
                  </div>
                  <div className="validation-item">
                    <span>Uppercase</span>
                    {passwordValidation.containsUppercase ? <CheckIcon className="check-icon" /> : <CloseIcon className="close-icon" />}
                  </div>
                  <div className="validation-item">
                    <span>Special Character</span>
                    {passwordValidation.containsSpecial ? <CheckIcon className="check-icon" /> : <CloseIcon className="close-icon" />}
                  </div>
                  <div className="validation-item">
                    <span>Minimum Length</span>
                    {passwordValidation.minLength ? <CheckIcon className="check-icon" /> : <CloseIcon className="close-icon" />}
                  </div>
                </div>
              )}
          </div>
          <div className="input-group">         
            <label htmlFor="confirm">Confirm Password</label>
            <div className="password-wrapper inputs">
              <input ref={confirmRef} id="confirm" type={confirmVisible ? "text" : "password"} className="inputs" placeholder="Confirm Password" />
              <button type="button" onClick={toggleConfirmVisibility} className="toggle-visibility">
                {confirmVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
          </div>
          <div className="checkBox">
            <input onClick={(e) => handleCheckboxChange(e)} type="checkbox" className="agree" id="agree" name="agree" />
            <label htmlFor="agree">I agree to <Link className='link' to="/policy_and_privacy">the terms and conditions</Link></label>
          </div>
          <button onClick={(e) => handleFinish(e)} className="button">Sign Up</button>
        </form>
      </div>
      <div className="right">
        <h1>Create An Account</h1>
        <img src={logoin} alt="Logo" className="logo" />
        <div className='otherSign'>
          <span className="signWith">Or Sign With</span>
          <div className="icons">
              <FacebookIcon className='icon face'/>
              <Google className='icon google'/>
              <XIcon className='icon x'/>
          </div>
        </div>
        <h2>I have an account <Link to="/login" className="span">Sign IN</Link></h2>
      </div>
    </div>
  );
};

export default Register;
