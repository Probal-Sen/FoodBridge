import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error('Network error. Please check your connection.');
    }
    
    // Handle API errors
    const message = error.response?.data?.message || 'An unexpected error occurred';
    console.error('API error:', message);
    throw error;
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    // Simulate frontend-only login
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    // For demo, treat any email/password as valid
    let user = { email, role: email.includes('ngo') ? 'ngo' : 'restaurant', name: 'Demo User' };
    const token = 'mock-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Dispatch custom event for login
    window.dispatchEvent(new CustomEvent('userLogin', { detail: { user } }));
    
    return { token, user };
  },

  register: async (userData) => {
    // Simulate frontend-only registration
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }
    let user = { ...userData, role: userData.role || 'restaurant', name: userData.name || 'Demo User' };
    const token = 'mock-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Dispatch custom event for login
    window.dispatchEvent(new CustomEvent('userLogin', { detail: { user } }));
    
    return { token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Donation services
export const donationService = {
  getAllDonations: async () => {
    const response = await api.get('/donations');
    return response.data;
  },

  getDonationById: async (id) => {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  },

  createDonation: async (donationData) => {
    // Format the donation data
    const formattedData = {
      foodType: donationData.foodType,
      foodDescription: donationData.foodItems,
      quantity: Number(donationData.quantity),
      quantityUnit: donationData.quantityUnit,
      estimatedMeals: donationData.estimatedMeals ? Number(donationData.estimatedMeals) : null,
      pickupDate: donationData.pickupDate,
      pickupWindow: `${donationData.pickupStartTime} - ${donationData.pickupEndTime}`,
      allergenInfo: donationData.allergenInfo || null,
      dietaryInfo: donationData.dietaryInfo || null,
      additionalInfo: donationData.additionalInfo || null,
      restaurantId: JSON.parse(localStorage.getItem('user'))?.id
    };

    try {
      const response = await api.post('/donations', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },

  updateDonation: async (id, updateData) => {
    const response = await api.patch(`/donations/${id}`, updateData);
    return response.data;
  },
};

// Profile services
export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.patch('/profile', profileData);
    return response.data;
  },
};

// Contact services
export const contactService = {
  sendContact: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
};

export default api; 