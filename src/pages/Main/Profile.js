import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../AuthContext/AuthContext';
import { convertToBase64 } from '../../Utilities/convert';
import { useFetch } from '../../hooks/useFetch';

const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [profileImage, setProfileImage] = useState(user.profilePic);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [department, setDepartment] = useState('الرعاية الطبية');
  const [city, setCity] = useState('ادكو');
  const [editingField, setEditingField] = useState(null);

  const { data: region, loading: centerLoading, error: centerError } = useFetch(`http://localhost:4000/Regions?id=${user.region_id}`);
  
  useEffect(() => {
    if (region && region.name_en) {
      setDepartment(region.name_en);
    }
  }, [region]);

  useEffect(() => {
    if (editingField === 'Fname') {
      firstNameRef.current.focus();
    } else if (editingField === 'Lname') {
      lastNameRef.current.focus();
    } else if (editingField === 'email') {
      emailRef.current.focus();
    } else if (editingField === 'phone') {
      phoneRef.current.focus();
    }
  }, [editingField]);

  const handleClickOutside = (e) => {
    if (
      (firstNameRef.current && !firstNameRef.current.contains(e.target)) &&
      (lastNameRef.current && !lastNameRef.current.contains(e.target)) &&
      (emailRef.current && !emailRef.current.contains(e.target)) &&
      (phoneRef.current && !phoneRef.current.contains(e.target))
    ) {
      setEditingField(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsUpdated(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await convertToBase64(file);
      setProfileImage(base64);
      setIsUpdated(true);
    } else {
      alert('Please upload an image file.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/users/${user.id}`, {
        ...updatedUser,
        imgprofile: profileImage,
      });
      alert('Profile updated successfully');
      setIsUpdated(false);
      setIsEditing(false);
      setEditingField(null);
    } catch (error) {
      console.error('Error updating the profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/users/${user.id}`);
        alert('Account deleted successfully');
        logout();
        navigate('/login');
      } catch (error) {
        console.error('Error deleting the account:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl profile-page bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 space-y-6">
      <div className="w-full relative mb-6">
        <div className="w-full bg-blue-600 h-48 rounded-t-lg"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-24">
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="profileImageUpload" />
          <label htmlFor="profileImageUpload">
            <img
              className="bg-gray-200 border border-gray-300 h-36 w-36 rounded-full shadow-md cursor-pointer"
              src={profileImage || "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjA2N3wwfDF8c2VhcmNofDh8fHBlZGVhdGxpc3xlbnwwfHx8fDE2MjUxNDYxNDc&ixlib=rb-1.2.1&q=80&w=1080"}
              alt={`${updatedUser.name}'s Avatar`}
            />
          </label>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-10 md:text-left space-y-6">
        <div className=" text-2xl font-semibold text-gray-800 flex flex-col md:flex-row justify-center md:justify-start items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
          {editingField === 'Fname' ? (
            <input ref={firstNameRef} type="text" name="Fname" value={updatedUser.Fname} onChange={handleInputChange} onBlur={() => setEditingField(null)} className="border-b-2 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out p-2 text-center md:text-left w-full md:w-auto" style={{ width: '200px' }} />
          ) : (
            <span onClick={() => setEditingField('Fname')} className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out w-full md:w-auto text-center md:text-left" style={{ width: '200px' }}>
              {updatedUser.Fname || 'First Name'}
            </span>
          )}
          {editingField === 'Lname' ? (
            <input ref={lastNameRef} type="text" name="Lname" value={updatedUser.Lname} onChange={handleInputChange} onBlur={() => setEditingField(null)} className="border-b-2 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out p-2 text-center md:text-left w-full md:w-auto" style={{ width: '200px' }} />
          ) : (
            <span onClick={() => setEditingField('Lname')} className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out w-full md:w-auto text-center md:text-left" style={{ width: '200px' }}>
              {updatedUser.Lname || 'Last Name'}
            </span>
          )}
        </div>

        <div className="text-sm mt-4 text-gray-800 flex flex-col md:flex-row justify-center md:justify-start items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
          <div className=" text-lg font-semibold text-blue-500">Department : </div>
          <div className="text-xl text-gray-600 hover:text-blue-500 cursor-pointer" onClick={() => alert('Special UI/UX for Department')}>
            {department}
          </div>
        </div>

        <div className="text-sm mt-4 text-gray-800 flex flex-col md:flex-row justify-center md:justify-start items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
          <div className="text-lg font-semibold text-blue-500">City :</div>
          <div className=" text-xl text-gray-600 hover:text-blue-500 cursor-pointer" onClick={() => alert('Special UI/UX for City')}>
            {city}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="pt-4">
        <div className="mb-1 text-lg font-semibold text-gray-800">Contact Information</div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center bg-gray-100 hover:bg-gray-300 p-2 rounded-md shadow-sm space-x-2" style={{ width: '300px' }}>
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
            {editingField === 'email' ? (
              <input ref={emailRef} type="text" name="email" value={updatedUser.email} onChange={handleInputChange} onBlur={() => setEditingField(null)} className="text-lg text-gray-900 border-b-2 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out" style={{ flex: 1 }} />
            ) : (
              <p onClick={() => setEditingField('email')} className="text-lg text-gray-900 cursor-pointer m-0 p-0" style={{ flex: 1 }}>
                {updatedUser.email || "example@example.com"}
              </p>
            )}
          </div>
          <div className="flex items-center bg-gray-100 hover:bg-gray-300 p-2 rounded-md shadow-sm space-x-2" style={{ width: '300px' }}>
            <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
            {editingField === 'phone' ? (
              <input ref={phoneRef} type="number" name="phone" value={updatedUser.phone} onChange={handleInputChange} onBlur={() => setEditingField(null)} className="text-lg text-gray-900 border-b-2 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out" style={{ flex: 1 }} />
            ) : (
              <p onClick={() => setEditingField('phone')} className="text-lg text-gray-900 cursor-pointer m-0 p-0" style={{ flex: 1 }}>
                {updatedUser.phone || "0123456789"}
              </p>
            )}
          </div>
          <div className="flex items-center bg-gray-100 hover:bg-gray-300 p-2 rounded-md shadow-sm space-x-2" style={{ width: '300px' }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
            <p className="text-lg text-gray-900 m-0 " style={{ flex: 1 }}>
              {updatedUser.region || 'Region'}
            </p>
          </div>
          <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm space-x-2" style={{ width: '300px' }}>
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
            <p className="text-lg text-gray-900 m-0" style={{ flex: 1 }}>
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out ${
          isEditing || isUpdated ? '' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={!isEditing && !isUpdated}
      >
        {isEditing ? 'Save Changes' : 'Edit Profile'}
      </button>

      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
