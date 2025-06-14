import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, use relative path
  : 'http://localhost:5000/api';  // In development, use local server

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
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data.message || 'An error occurred';
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw error;
    }
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Dispatch custom event for login
      window.dispatchEvent(new CustomEvent('userLogin', { detail: { user } }));
      
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('Attempting registration with:', userData);
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Dispatch custom event for login
      window.dispatchEvent(new CustomEvent('userLogin', { detail: { user } }));
      
      return { token, user };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Donation services
export const donationService = {
  getAllDonations: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDonations);
      }, 1000);
    });
  },

  getDonationById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const donation = mockDonations.find(d => d.id === parseInt(id));
        if (donation) {
          resolve(donation);
        } else {
          reject(new Error('Donation not found'));
        }
      }, 1000);
    });
  },

  createDonation: async (donationData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDonation = {
          id: mockDonations.length + 1,
          ...donationData,
          status: 'available'
        };
        mockDonations.push(newDonation);
        resolve(newDonation);
      }, 1000);
    });
  },

  updateDonation: async (id, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDonations.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
          mockDonations[index] = { ...mockDonations[index], ...updateData };
          resolve(mockDonations[index]);
        } else {
          reject(new Error('Donation not found'));
        }
      }, 1000);
    });
  }
};

// Profile services
export const profileService = {
  getProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        resolve(user);
      }, 1000);
    });
  },

  updateProfile: async (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 1000);
    });
  }
};

// Contact services
export const contactService = {
  sendContact: async (contactData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Message sent successfully' });
      }, 1000);
    });
  }
};

export default api; 