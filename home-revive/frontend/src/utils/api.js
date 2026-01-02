//const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api';


// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to get user data from localStorage
const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  signup: async (userData) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  oauthGoogle: async (credential) => {
    return apiCall('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    });
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },
};

// Orders API calls
export const ordersAPI = {
  createOrder: async (orderData) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getUserOrders: async (userId) => {
    return apiCall(`/orders/${userId}`);
  },

  updateOrderStatus: async (orderId, status) => {
    return apiCall(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Reviews API calls
export const reviewsAPI = {
  createReview: async (reviewData) => {
    return apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  getServiceReviews: async (serviceId) => {
    return apiCall(`/reviews/${serviceId}`);
  },

  getAllReviews: async () => {
    return apiCall('/reviews');
  },

  deleteReview: async (reviewId) => {
    return apiCall(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  },
};

// Utility functions for localStorage
export const authUtils = {
  setAuthData: (userData, token) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  },
  updateUserPoints: (newPoints) => {
    const data = getUserData();
    if (data) {
      const updated = { ...data, points: newPoints };
      localStorage.setItem('userData', JSON.stringify(updated));
    }
  },

  clearAuthData: () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },

  getCurrentUser: () => {
    return getUserData();
  },
};
