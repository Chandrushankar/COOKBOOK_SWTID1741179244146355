import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notifications: true,
    darkMode: document.documentElement.getAttribute('data-theme') === 'dark'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update here
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences</p>
      </div>

      <div className="settings-container">
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <h3>Profile Settings</h3>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-section">
            <h3>Preferences</h3>
            
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                Enable Email Notifications
              </label>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleChange}
                />
                Dark Mode
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Account Actions</h3>
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button type="button" className="delete-account-button">
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 