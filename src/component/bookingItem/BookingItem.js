import React, { useState, useEffect } from 'react';
import Event from '@mui/icons-material/Event';
import Check from '@mui/icons-material/Check';
import TimerIcon from '@mui/icons-material/Timer';
import './BookingItem.scss';

const BookingItem = ({ status, data, caregiverImage }) => {
  const [itemStatus, setItemStatus] = useState('');

  useEffect(() => {
    switch (status) {
      case 'rejected':
        setItemStatus('reject-button');
        break;
      case 'accepted':
        setItemStatus('accept-button');
        break;
      case 'pending':
        setItemStatus('pending-button');
        break;
      default:
        setItemStatus('');
    }
  }, [status]);

  const calculateTimeLeft = () => {
    const now = new Date();
    const createdAt = new Date(data.created_at);
    const timeLeft = now - createdAt;
    const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));
    return hoursLeft > 0 ? `${hoursLeft} hrs` : 'Expired';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`booking-item ${itemStatus}`}>
      <div className='doc-name'>
        <img src={caregiverImage} alt={data.caregiver_name} />
        <span>{data.caregiver_name}</span>
      </div>
      <div className='booking-info'>
        <div className='specs'>
          <p>Services:</p>
          <ul>
            {data.services.map(service => (
              <li key={service.id}>{service.name}</li>
            ))}
          </ul>
        </div>
        <div className='date'>
          <div className='day'>
            <Event />
            <span>{formatDate(data.start_date)}</span>
          </div>
          <span>{formatTime(data.start_date)} - {formatTime(data.end_date)}</span>
        </div>
        <div className='total-price'>
          <p>Total Price: ${data.total_price}</p>
        </div>
        {status === 'pending' && (
          <div className='time-left'>
            <TimerIcon />
            <span>{calculateTimeLeft()}</span>
          </div>
        )}
      </div>
      <div className={`booking-status ${itemStatus}`}>
        <Check />
        <span>{status}</span>
      </div>
    </div>
  );
};

export default BookingItem;
