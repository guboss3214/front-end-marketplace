import { useState } from 'react';
import toast from 'react-hot-toast';

const Privacy = () => {
  const [settings, setSettings] = useState({
    showProfile: true,
    allowMessages: false,
    dataCollection: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Privacy Settings</h2>
      <p className="text-gray-600 mt-2">
        Control how your information is shared and stored.
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Show my profile to others</span>
          <button
            onClick={() => toggleSetting('showProfile')}
            className={`relative w-12 h-6 rounded-full transition ${
              settings.showProfile ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                settings.showProfile ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Allow direct messages</span>
          <button
            onClick={() => toggleSetting('allowMessages')}
            className={`relative w-12 h-6 rounded-full transition ${
              settings.allowMessages ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                settings.allowMessages ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Allow data collection</span>
          <button
            onClick={() => toggleSetting('dataCollection')}
            className={`relative w-12 h-6 rounded-full transition ${
              settings.dataCollection ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                settings.dataCollection ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>
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

export default Privacy;
