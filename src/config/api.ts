/**
 * API Configuration for Skin Cancer Detection Application
 * Centralizes all API-related constants and configuration
 */

export const API_CONFIG = {
  /**
   * Base URL for the API server
   * - In development: uses environment variable or defaults to localhost:2500
   * - In production: should be set via VITE_API_URL environment variable
   */
  BASE_URL: import.meta.env.VITE_API_URL || '',

  /**
   * API Endpoints
   */
  ENDPOINTS: {
    HEALTH: '/api/health',
    ANALYZE: '/api/analyze',
    INFO: '/api/info',
    IMAGES: '/api/images',
  },

  /**
   * File Upload Configuration
   */
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  ALLOWED_EXTENSIONS: ['.png', '.jpg', '.jpeg', '.gif'],

  /**
   * Request Configuration
   */
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second

  /**
   * Severity Color Mapping
   */
  SEVERITY_COLORS: {
    none: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-500',
      glow: 'shadow-green-500/20',
    },
    low: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-500',
      glow: 'shadow-blue-500/20',
    },
    moderate: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-500',
      glow: 'shadow-yellow-500/20',
    },
    high: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-500',
      glow: 'shadow-orange-500/20',
    },
    critical: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-500',
      glow: 'shadow-red-500/20',
    },
  },
} as const;

/**
 * Validate if a file meets the upload requirements
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > API_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${API_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    };
  }

  // Check file type
  if (!API_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a PNG, JPG, or GIF image',
    };
  }

  return { valid: true };
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
