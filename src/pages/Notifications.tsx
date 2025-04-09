import { useState } from 'react';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = () => {
    toast.success('Notifications saved successfully!');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">
        Notification Settings
      </h2>
      <p className="text-gray-600 mt-2">
        Choose how you receive notifications.
      </p>

      <div className="mt-6 space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <span className="text-gray-700">Email Notifications</span>
          <button
            onClick={() => toggleNotification('email')}
            className={`relative w-12 h-6 rounded-full transition ${
              notifications.email ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                notifications.email ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <span className="text-gray-700">SMS Notifications</span>
          <button
            onClick={() => toggleNotification('sms')}
            className={`relative w-12 h-6 rounded-full transition ${
              notifications.sms ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                notifications.sms ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <span className="text-gray-700">Push Notifications</span>
          <button
            onClick={() => toggleNotification('push')}
            className={`relative w-12 h-6 rounded-full transition ${
              notifications.push ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                notifications.push ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </label>
      </div>

      <button
        onClick={handleSaveChanges}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Notifications;
