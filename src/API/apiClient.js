// src/API/apiClient.js

import { BASE_URL } from '../Config/config';
import Cookies from 'js-cookie';

class APIClient {
  constructor() {
    if (!APIClient.instance) {
      this.baseURL = BASE_URL;
      this.defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      APIClient.instance = this;
    }
    return APIClient.instance;
  }

  async request(endpoint, options = {}) {
    const token = Cookies.get('auth_token');

    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include', // for sending cookies (optional)
      });

      const contentType = response.headers.get('content-type');
      let data = null;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const error = new Error(
          typeof data === 'string' ? data : data?.message || 'Request failed'
        );
        error.status = response.status;
        error.responseData = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error('❌ API Error:', error.message);
      throw error;
    }
  }

  get(url, options = {}) {
    return this.request(url, {
      method: 'GET',
      ...options,
    });
  }

  post(url, data = {}, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  put(url, data = {}, options = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete(url, options = {}) {
    return this.request(url, {
      method: 'DELETE',
      ...options,
    });
  }
}

const apiClient = new APIClient();
Object.freeze(apiClient);

export default apiClient;
