import React, { useState } from 'react';

const Profile = () => {
  // Mock user data - in a real app, this would come from an API or context
  
  const [user, setUser] = useState({
    id: 123,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    userType: 'restaurant', // or 'ngo'
    organizationName: 'Green Garden Restaurant',
    address: '123 Main St, Eco City',
    bio: 'Family owned restaurant specializing in fresh, locally sourced food. We are committed to reducing our food waste and giving back to the community.',
    profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
      newDonationAlerts: true,
      pickupReminders: true,
      marketingEmails: false
    },
    serviceArea: '5 km',
    preferredPickupTimes: ['Morning', 'Evening'],
    registeredDate: 'January 15, 2023',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [name]: checked
      }
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call to update profile
    setTimeout(() => {
      setUser(formData);
      setIsEditing(false);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      
      // Hide message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }, 1000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: 'New passwords do not match.', type: 'danger' });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters long.', type: 'danger' });
      return;
    }
    
    // Simulate API call to update password
    setTimeout(() => {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setMessage({ text: 'Password updated successfully!', type: 'success' });
      
      // Hide message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }, 1000);
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4 mb-lg-0">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <div className="mb-3">
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="rounded-circle img-thumbnail" 
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              </div>
              <h5 className="fw-bold">{user.name}</h5>
              <p className="text-muted mb-0">{user.organizationName}</p>
              <p className="badge bg-primary mt-2">{user.userType === 'restaurant' ? 'Restaurant' : 'NGO'}</p>
              
              <div className="border-top mt-3 pt-3">
                <p className="small text-muted mb-0">Member since</p>
                <p>{user.registeredDate}</p>
              </div>
            </div>
            
            <div className="list-group list-group-flush">
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-user me-3"></i> Profile Information
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <i className="fas fa-lock me-3"></i> Security Settings
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <i className="fas fa-bell me-3"></i> Notification Preferences
              </button>
              {user.userType === 'restaurant' && (
                <button 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'donations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('donations')}
                >
                  <i className="fas fa-gift me-3"></i> Donation History
                </button>
              )}
              {user.userType === 'ngo' && (
                <button 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'pickups' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pickups')}
                >
                  <i className="fas fa-truck me-3"></i> Pickup History
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-lg-9">
          {message.text && (
            <div className={`alert alert-${message.type} alert-dismissible fade show mb-4`} role="alert">
              {message.text}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setMessage({ text: '', type: '' })}
                aria-label="Close"
              ></button>
            </div>
          )}
          
          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <div className="card border-0 shadow">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Profile Information</h5>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
              <div className="card-body">
                {isEditing ? (
                  <form onSubmit={handleProfileSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          id="phone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="organizationName" className="form-label">Organization Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="organizationName" 
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="address" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">About</label>
                      <textarea 
                        className="form-control" 
                        id="bio" 
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    
                    {user.userType === 'ngo' && (
                      <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label htmlFor="serviceArea" className="form-label">Service Area Radius</label>
                          <select 
                            className="form-select" 
                            id="serviceArea" 
                            name="serviceArea"
                            value={formData.serviceArea}
                            onChange={handleInputChange}
                          >
                            <option value="2 km">2 km</option>
                            <option value="5 km">5 km</option>
                            <option value="10 km">10 km</option>
                            <option value="15 km">15 km</option>
                            <option value="20 km">20 km</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="row mb-4">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h6 className="text-muted mb-1">Full Name</h6>
                        <p className="mb-0">{user.name}</p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-muted mb-1">Email Address</h6>
                        <p className="mb-0">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="row mb-4">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h6 className="text-muted mb-1">Phone Number</h6>
                        <p className="mb-0">{user.phone}</p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-muted mb-1">Organization Name</h6>
                        <p className="mb-0">{user.organizationName}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h6 className="text-muted mb-1">Address</h6>
                      <p className="mb-0">{user.address}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h6 className="text-muted mb-1">About</h6>
                      <p className="mb-0">{user.bio}</p>
                    </div>
                    
                    {user.userType === 'ngo' && (
                      <div className="mb-4">
                        <h6 className="text-muted mb-1">Service Area</h6>
                        <p className="mb-0">Within {user.serviceArea} radius</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <div className="card border-0 shadow">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Security Settings</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="currentPassword" 
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="newPassword" 
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <div className="form-text">Password must be at least 8 characters long.</div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Change Password</button>
                  </div>
                </form>
                
                <hr className="my-4" />
                
                <div>
                  <h6 className="fw-bold mb-3">Connected Accounts</h6>
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary">
                      <i className="fab fa-google me-2"></i> Connect with Google
                    </button>
                    <button className="btn btn-outline-primary">
                      <i className="fab fa-facebook-f me-2"></i> Connect with Facebook
                    </button>
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <div>
                  <h6 className="text-danger mb-3">Danger Zone</h6>
                  <button className="btn btn-outline-danger">Deactivate Account</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Preferences Tab */}
          {activeTab === 'notifications' && (
            <div className="card border-0 shadow">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Notification Preferences</h5>
              </div>
              <div className="card-body">
                <form>
                  <h6 className="mb-3">Communication Channels</h6>
                  <div className="mb-3 form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="emailNotifications" 
                      name="emailNotifications"
                      checked={formData.notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label className="form-check-label" htmlFor="emailNotifications">
                      Email Notifications
                    </label>
                  </div>
                  
                  <div className="mb-4 form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="smsNotifications" 
                      name="smsNotifications"
                      checked={formData.notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label className="form-check-label" htmlFor="smsNotifications">
                      SMS Notifications
                    </label>
                  </div>
                  
                  <h6 className="mb-3">Notification Types</h6>
                  <div className="mb-3 form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="newDonationAlerts" 
                      name="newDonationAlerts"
                      checked={formData.notificationSettings.newDonationAlerts}
                      onChange={handleNotificationChange}
                    />
                    <label className="form-check-label" htmlFor="newDonationAlerts">
                      {user.userType === 'restaurant' ? 'Donation Request Alerts' : 'New Donation Alerts'}
                    </label>
                  </div>
                  
                  <div className="mb-3 form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="pickupReminders" 
                      name="pickupReminders"
                      checked={formData.notificationSettings.pickupReminders}
                      onChange={handleNotificationChange}
                    />
                    <label className="form-check-label" htmlFor="pickupReminders">
                      Pickup Reminders
                    </label>
                  </div>
                  
                  <div className="mb-4 form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="marketingEmails" 
                      name="marketingEmails"
                      checked={formData.notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                    />
                    <label className="form-check-label" htmlFor="marketingEmails">
                      Marketing Emails & Updates
                    </label>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={handleProfileSubmit}
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Donation History Tab (for Restaurants) */}
          {activeTab === 'donations' && user.userType === 'restaurant' && (
            <div className="card border-0 shadow">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Donation History</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Date</th>
                        <th>Food Items</th>
                        <th>Quantity</th>
                        <th>NGO</th>
                        <th>Status</th>
                        <th>Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Mock donation history data */}
                      <tr>
                        <td>June 15, 2023</td>
                        <td>Mixed vegetables, Pasta, Bread</td>
                        <td>5 kg</td>
                        <td>Food For All</td>
                        <td><span className="badge bg-success">Completed</span></td>
                        <td>15 people fed</td>
                      </tr>
                      <tr>
                        <td>June 14, 2023</td>
                        <td>Rice, Curry, Salad</td>
                        <td>7 kg</td>
                        <td>Helping Hands</td>
                        <td><span className="badge bg-success">Completed</span></td>
                        <td>20 people fed</td>
                      </tr>
                      <tr>
                        <td>June 10, 2023</td>
                        <td>Sandwiches, Fruit Basket</td>
                        <td>4 kg</td>
                        <td>Community Shelter</td>
                        <td><span className="badge bg-success">Completed</span></td>
                        <td>12 people fed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Pickup History Tab (for NGOs) */}
          {activeTab === 'pickups' && user.userType === 'ngo' && (
            <div className="card border-0 shadow">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Pickup History</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Date</th>
                        <th>Restaurant</th>
                        <th>Food Items</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>People Helped</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Mock pickup history data */}
                      <tr>
                        <td>June 17, 2023</td>
                        <td>Royal Spice</td>
                        <td>Bread, Pasta, Salad</td>
                        <td>6 kg</td>
                        <td><span className="badge bg-success">Completed</span></td>
                        <td>18</td>
                      </tr>
                      <tr>
                        <td>June 15, 2023</td>
                        <td>Green Garden Restaurant</td>
                        <td>Rice, Curry, Mixed Vegetables</td>
                        <td>10 kg</td>
                        <td><span className="badge bg-success">Completed</span></td>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>June 12, 2023</td>
                        <td>Sunshine Café</td>
                        <td>Sandwiches, Pastries, Fruit Salad</td>
                        <td>5 kg</td>
                        <td><span className="badge bg-success">Completed</span></td>
                        <td>15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 