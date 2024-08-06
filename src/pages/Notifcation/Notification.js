import React, { useState, useEffect } from 'react';
import Loading from '../../component/loading/LoadingSkeleton';
import { sampleNotifications } from '../../data';


const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-white min-h-screen rounded-md mt-[90px] ml-[250px]">
            <h1 className="text-2xl font-bold mb-4 text-[#376B95]">Notifications</h1>
      <Loading />
      </div>

    );
  }

  return (
    <div className="p-4 bg-white min-h-screen rounded-md mt-[90px] ml-[250px]">
      <h1 className="text-2xl font-bold mb-4 text-[#376B95]">Notifications</h1>
      {notifications && notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="text-lg">No notifications found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className={`p-4 rounded shadow transition duration-300 cursor-pointer ${notification.status === 'unread' ? 'bg-[#376B91]  text-white' : 'bg-white'} hover:bg-[#376B90] `}>
              <div className="flex items-center space-x-4">
                <img src={notification.sender.avatar} alt={notification.sender.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm  text-gray font-semibold">{notification.title}</p>
                  <p className="text-xs text-white text-gray-600">{notification.message}</p>
                  <p className="text-xs  text-gray-400">{new Date(notification.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
