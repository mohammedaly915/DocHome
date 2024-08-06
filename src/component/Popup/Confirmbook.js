import React, { useState } from 'react';
import './BookingConfirmationPopup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingConfirmationPopup = ({ isOpen, onClose, doctor, services, user }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for booking submission
    const bookingData = {
      user_id: user.id,
      services: services.map(service => ({ id: service.id, name: service.name, price: service.price })),
      caregiver_id: doctor.id,
      location: doctor.location,
      total_price: services.reduce((total, service) => total + service.price, 0),
      booking_date: selectedDate,
      start_date: `${selectedDate}T${selectedTime}`,
      end_date: `${selectedDate}T${selectedTime}`,
      phone_number: user.phone, // Assuming user.phone exists
      approval_status: 'pending',
      finished: false
    };

    setLoading(true);

    try {
      // Send booking data to server
      const res = await axios.post('http://localhost:4000/bookings', bookingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Booking Confirmed:', res.data);
      setLoading(false);
      navigate('/main'); // Redirect to main page after successful booking
    } catch (error) {
      setError('Failed to submit booking.');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="booking-popup-overlay">
      <div className="booking-popup">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Confirm Your Booking</h2>
        <div className="doctor-info">
          <img src={doctor.image} alt={doctor.name} />
          <h3>{doctor.name}</h3>
        </div>
        <div className="selected-services">
          <h3>Selected Services</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>{service.name} - ${service.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="date-time-picker">
            <label>
              Select Date:
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </label>
            <label>
              Select Time:
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="confirm-button"
            disabled={!selectedDate || !selectedTime || loading}
          >
            {loading ? 'Loading...' : 'Confirm Booking'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default BookingConfirmationPopup;
