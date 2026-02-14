# Backend Integration Setup Guide

## Overview
This frontend has been integrated with the Flask backend API for skin cancer detection analysis.

## Prerequisites
- Node.js 18+ (required for Vite 5.x)
- Backend API running on `http://localhost:2500`

## Installation

### 1. Install Dependencies
```bash
npm install axios
```

### 2. Environment Setup
The `.env` file has been created with the default API URL:
```
VITE_API_URL=http://localhost:2500
```

For production, update `.env.production` with your production API URL.

### 3. Start Backend
Make sure the Flask backend is running:
```bash
cd C:\Anjali\mysite
python api.py
```

The backend should be running on `http://localhost:2500`

### 4. Start Frontend
```bash
npm run dev
```

## What's Been Integrated

### New Files Created

1. **`src/types/api.types.ts`**
   - TypeScript interfaces for all API responses
   - `AnalysisResult`, `ErrorResponse`, `Classification`, etc.

2. **`src/config/api.ts`**
   - API configuration (endpoints, file limits, severity colors)
   - File validation helper function
   - Format helpers

3. **`src/services/api.service.ts`**
   - Complete API service layer with axios
   - Methods: `healthCheck()`, `analyzeImage()`, `getClassificationInfo()`, `getImageUrl()`
   - Automatic retry logic
   - Request/response interceptors
   - Upload progress tracking

4. **`.env` and `.env.production`**
   - Environment configuration for API URLs

### Modified Files

1. **`src/pages/SkinSense.tsx`**
   - Integrated real API calls replacing mock implementation
   - Added state management for results, errors, and upload progress
   - File validation before upload
   - Beautiful results display with:
     - Diagnosis and confidence
     - Severity-based color coding
     - Uploaded image display
     - Description and recommendations
     - All probabilities in expandable section
   - Error handling with user-friendly messages
   - Toast notifications for success/error states
   - Upload progress indicator

## Features

### ✅ File Upload
- Drag & drop or click to browse
- File type validation (PNG, JPG, GIF)
- File size validation (max 10MB)
- Image preview before analysis

### ✅ Analysis
- Upload to backend with progress tracking
- Real-time progress percentage
- Loading states with spinner
- Automatic result display

### ✅ Results Display
- Diagnosis name and confidence score
- Severity level with color coding:
  - 🟢 None (Green)
  - 🔵 Low (Blue)
  - 🟡 Moderate (Yellow)
  - 🟠 High (Orange)
  - 🔴 Critical (Red)
- Analyzed image display
- Detailed description
- Medical recommendations
- All classification probabilities

### ✅ Error Handling
- Network errors
- File validation errors
- Server errors (400, 413, 500, 503)
- User-friendly error messages
- Retry capability

### ✅ UI Enhancements
- Toast notifications (success/error)
- Smooth animations
- Progress indicators
- "New Analysis" button to reset

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Check backend status |
| `/api/analyze` | POST | Upload and analyze image |
| `/api/info` | GET | Get classification information |
| `/api/images/{filename}` | GET | Retrieve uploaded images |

## Testing Checklist

- [ ] Backend is running on port 2500
- [ ] Frontend starts without errors
- [ ] Can upload valid image files
- [ ] Invalid files are rejected with error message
- [ ] Analysis shows loading state with progress
- [ ] Results display correctly after analysis
- [ ] Severity colors match the diagnosis
- [ ] Uploaded image is displayed
- [ ] All probabilities are shown in expandable section
- [ ] Error messages display for failures
- [ ] Toast notifications appear
- [ ] "New Analysis" button resets the form

## Troubleshooting

### Backend Not Running
**Error:** "Unable to connect to the server"
**Solution:** Start the Flask backend: `python api.py`

### CORS Issues
**Error:** CORS policy error in browser console
**Solution:** Backend is already configured for CORS. Check if backend is running.

### File Upload Fails
**Error:** "File size too large" or "Invalid file type"
**Solution:** 
- Ensure file is PNG, JPG, or GIF
- File size must be under 10MB

### Node.js Version Error
**Error:** `ERR_REQUIRE_ESM`
**Solution:** Upgrade to Node.js 18+ or higher

### Axios Not Found
**Error:** `Cannot find module 'axios'`
**Solution:** Run `npm install axios`

## Architecture

```
┌─────────────────────┐
│   SkinSense.tsx     │  ← User Interface
│   (React Component) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  api.service.ts     │  ← API Service Layer
│  (Axios HTTP)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Flask Backend     │  ← Python API
│   (TensorFlow ML)   │
└─────────────────────┘
```

## File Structure

```
src/
├── types/
│   └── api.types.ts          # TypeScript interfaces
├── config/
│   └── api.ts                # API configuration
├── services/
│   └── api.service.ts        # API service layer
└── pages/
    └── SkinSense.tsx         # Main upload/analysis page
```

## Next Steps

1. **Install axios**: `npm install axios`
2. **Upgrade Node.js** to version 18+ if you haven't already
3. **Start backend**: `python api.py` from `C:\Anjali\mysite`
4. **Start frontend**: `npm run dev`
5. **Test**: Upload an image and verify results

## Optional Enhancements

Consider adding:
- [ ] Result history in localStorage
- [ ] Download results as PDF
- [ ] Share results functionality
- [ ] Comparison with previous analyses
- [ ] Health check indicator in header
- [ ] Offline mode support

## Support

If you encounter any issues:
1. Check backend logs: `C:\Anjali\mysite\api.py`
2. Check browser console for errors
3. Verify environment variables in `.env`
4. Ensure all dependencies are installed

---

**Integration Complete! 🎉**

Ready to test once you:
1. Upgrade Node.js to 18+
2. Install axios
3. Start backend server
