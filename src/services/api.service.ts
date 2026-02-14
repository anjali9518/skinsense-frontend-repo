/**
 * API Service Layer for Skin Cancer Detection Application
 * Handles all HTTP requests to the Flask backend API
 */

import axios, { AxiosError, AxiosProgressEvent } from 'axios';
import { API_CONFIG } from '@/config/api';
import type {
  AnalysisResult,
  ErrorResponse,
  ClassificationInfoResponse,
  HealthCheckResponse,
  UploadProgress,
} from '@/types/api.types';

/**
 * Create axios instance with default configuration
 */
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Accept': 'application/json',
  },
});

/**
 * Request interceptor for logging and error handling
 */
api.interceptors.request.use(
  (config) => {
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for logging and error handling
 */
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.url}`, response.data);
    }
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error(`❌ API Error: ${error.config?.url}`, error.response?.data);
    }

    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data;
      return Promise.reject({
        message: errorData?.error || 'An error occurred',
        status: error.response.status,
        data: errorData,
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'Unable to connect to the server. Please check your connection.',
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: -1,
      });
    }
  }
);

/**
 * API Service Object with all API methods
 */
export const apiService = {
  /**
   * Health Check
   * @returns Promise with health status
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      const response = await api.get<HealthCheckResponse>(API_CONFIG.ENDPOINTS.HEALTH);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Health check failed');
    }
  },

  /**
   * Analyze Image
   * @param file - Image file to analyze
   * @param onProgress - Optional callback for upload progress
   * @returns Promise with analysis results
   */
  async analyzeImage(
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<AnalysisResult> {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Make request with progress tracking
      const response = await api.post<AnalysisResult>(
        API_CONFIG.ENDPOINTS.ANALYZE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (onProgress && progressEvent.total) {
              const loaded = progressEvent.loaded;
              const total = progressEvent.total;
              const percentage = Math.round((loaded * 100) / total);
              
              onProgress({
                loaded,
                total,
                percentage,
              });
            }
          },
        }
      );

      return response.data;
    } catch (error: any) {
      // Handle specific error codes
      if (error.status === 400) {
        throw new Error(error.data?.error || 'Invalid file format or no file provided');
      } else if (error.status === 413) {
        throw new Error('File size too large. Maximum size is 10MB');
      } else if (error.status === 500) {
        throw new Error('Server error during analysis. Please try again');
      } else if (error.status === 503) {
        throw new Error('Analysis service unavailable. Please try again later');
      }
      
      throw new Error(error.message || 'Failed to analyze image');
    }
  },

  /**
   * Get Classification Information
   * @returns Promise with all classification details
   */
  async getClassificationInfo(): Promise<ClassificationInfoResponse> {
    try {
      const response = await api.get<ClassificationInfoResponse>(API_CONFIG.ENDPOINTS.INFO);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch classification information');
    }
  },

  /**
   * Get Image URL
   * @param filename - Filename returned from analysis
   * @returns Full URL to the image
   */
  getImageUrl(filename: string): string {
    const base = API_CONFIG.BASE_URL || '';
    return `${base}${API_CONFIG.ENDPOINTS.IMAGES}/${filename}`;
  },

  /**
   * Retry Helper - Retry a function multiple times with delay
   * @param fn - Function to retry
   * @param retries - Number of retry attempts
   * @param delay - Delay between retries in ms
   */
  async retry<T>(
    fn: () => Promise<T>,
    retries: number = API_CONFIG.RETRY_ATTEMPTS,
    delay: number = API_CONFIG.RETRY_DELAY
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries <= 0) {
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry with one less attempt
      return this.retry(fn, retries - 1, delay * 2); // Exponential backoff
    }
  },
};

/**
 * Export axios instance for advanced usage
 */
export { api };

/**
 * Export default apiService
 */
export default apiService;
