import React, { useState, useEffect } from 'react';
import './Booking.scss';
import BookingItem from '../../component/bookingItem/BookingItem';
import Loading from '../../component/loading/Loading';
import { useFetch } from '../../hooks/useFetch';
import axios from 'axios';

const Booking = () => {
  const { data: bookingsData, loading: bookingLoading, error: bookingError } = useFetch('http://localhost:4000/bookings');
  const { data: caregiversData, loading: caregiverLoading, error: caregiverError } = useFetch('http://localhost:4000/caregivers');

  const [bookings, setBookings] = useState([]);
  const [caregiverImages, setCaregiverImages] = useState({});
  const [caregiverNames, setCaregiverNames] = useState({});

  useEffect(() => {
    if (bookingsData) {
      setBookings(bookingsData);
    }
  }, [bookingsData]);

  useEffect(() => {
    if (caregiversData) {
      const images = {};
      const names = {};
      caregiversData.forEach(caregiver => {
        images[caregiver.id] = caregiver.profile_image;
        names[caregiver.id] = caregiver.name;
      });
      setCaregiverImages(images);
      setCaregiverNames(names);

    }
  }, [caregiversData]);

  const renderBookingItems = (status) => {
    return bookings
      .filter((item) => item.approval_status === status)
      .map((item) => (
        <BookingItem
          key={item.id}
          status={item.approval_status}
          data={item}
          caregiverImage={caregiverImages[item.caregiver_id]}
          caregiverName={caregiverNames[item.caregiver_id]}
        />
      ));
  };

  if (bookingLoading || caregiverLoading) return <div className='booking-page'> <Loading/> </div>;
  if (bookingError || caregiverError) return <div>Error: {bookingError?.message || caregiverError?.message}</div>;

  return (
    <div className='booking-page'>
      <div className='booking-header'>
        <p>Booking</p>
        <div className='location-change'></div>
      </div>
      <div className='booking-content'>
        <div className='booking-status-section'>
          <h3>Accepted</h3>
          <div className='booking-status-items'>{renderBookingItems('accepted')}</div>
        </div>
        <div className='booking-status-section'>
          <h3>Pending</h3>
          <div className='booking-status-items'>{renderBookingItems('pending')}</div>
        </div>
        <div className='booking-status-section'>
          <h3>Rejected</h3>
          <div className='booking-status-items'>{renderBookingItems('rejected')}</div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
