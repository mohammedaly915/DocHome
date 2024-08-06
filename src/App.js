import './App.scss';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NewPassword from './component/PasswordVerify/NewPassword';
import Region from './pages/Auth/Region';
import Verification from './component/PasswordVerify/Verification';
import ForgetPassword from './pages/Auth/ForgetPassword';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Home from './pages/home/Home';
import Policy from './pages/policy/Policy';
import Feedback from './pages/feedback/Feedback';
import Chat from './pages/chat/Chat';
import Doctor from './pages/Main/Doctor';
import DoctorChec from './pages/DoctorCheque/DoctorChec';
import { useContext } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import SettingsPage from './pages/Main/SettingsPage';
import Wallet from './pages/wallet/Wallet';
import NavBar from './component/Navbar/NavBar';
import Caregiverss from './component/Categories/Caregiver'
import Service from './pages/Services/Service';


const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="region" element={<Region />} />
    </Routes>
  );
};
function App() {
  //const navigate =useNavigate()
  const {user} =useContext(AuthContext)
  const patient =user? user.data :null;
    
  return (

    <div className="App">
    <NavBar  user={patient? patient.user :null}/>
    <Routes>
    <Route path='/' element={<Home user={patient? patient.user :null}/>}/>
    <Route path="register/*" element={patient ? <Navigate to='/'/> :<Register/>} />
    <Route path='/login/*' element={patient? <Navigate to='/'/> :<Login/>}/>
    <Route path="/region" element={<Region/>} />
    <Route path='login/forget/*' element={<ForgetPassword/>}/>
    <Route path='login/forget/verifyaccount' element={<Verification/>}/>
    <Route path='login/forget/newpassowrd' element={<NewPassword/>}/>
    <Route path='/policy_and_priavicy' element={<Policy/>}/>
    {
      user&&
      <>
      <Route path='category/stuff/:category_id/*' element={<Caregiverss/>}/>
      <Route path='category/stuff/service/*' element={<Service/>} />
      <Route path='category/stuff/service/appointment' element={<DoctorChec user={patient? patient.user :null}/>}/>
      <Route path='category/stuff/service/feeback' element={<Feedback/>}/>
        <Route path='/main/*' element={<Main user={patient? patient.user :null}/>}/>
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='Doctor' element={<Doctor/>}/>
        <Route path='chat' element={<Chat/>}/>
        <Route path="setting/*" element={<SettingsRoutes />} />

      </>
    }
    </Routes>
    </div>
  );
}

export default App;
