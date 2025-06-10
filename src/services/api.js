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

// Auth services
export const authService = {
  login: async (email, password) => {
    // Simulate frontend-only login
    if (!email || !password) {
      throw { response: { data: { message: 'Email and password are required' } } };
    }
    // For demo, treat any email/password as valid
    let user = { email, role: email.includes('ngo') ? 'ngo' : 'restaurant', name: 'Demo User' };
    const token = 'mock-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  register: async (userData) => {
    // Simulate frontend-only registration
    if (!userData.email || !userData.password) {
      throw { response: { data: { message: 'Email and password are required' } } };
    }
    let user = { ...userData, role: userData.role || 'restaurant', name: userData.name || 'Demo User' };
    const token = 'mock-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
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
    const response = await api.post('/donations', donationData);
    return response.data;
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