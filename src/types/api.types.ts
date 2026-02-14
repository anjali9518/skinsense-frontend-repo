/**
 * API Type Definitions for Skin Cancer Detection Application
 * Based on Flask Backend API Specification
 */

export interface AnalysisResult {
  success: boolean;
  diagnosis: string;
  diagnosis_class: number;
  confidence: number;
  severity: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  description: string;
  recommendation: string;
  probabilities: Record<string, number>;
  image: {
    filename: string;
    original_filename: string;
    url: string;
    upload_time: string;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: string;
}

export interface Classification {
  id: number;
  name: string;
  severity: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  description: string;
  recommendation: string;
}

export interface ClassificationInfoResponse {
  success: boolean;
  classifications: Classification[];
}

export interface HealthCheckResponse {
  status: string;
  model_loaded: boolean;
  timestamp: string;
  version: string;
}

export type ApiResponse<T> = T | ErrorResponse;

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
