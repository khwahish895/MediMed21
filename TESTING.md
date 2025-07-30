# Testing Guide

## Mock Authentication

The application now uses a mock authentication system for development and testing. This allows you to test all features without setting up Firebase.

## Test Users

You can use these pre-configured test accounts:

### Patient Portal
- **Email:** patient@test.com
- **Password:** 123456
- **Role:** Patient

### Doctor Portal
- **Email:** doctor@test.com
- **Password:** 123456
- **Role:** Doctor

### Field Nurse Portal
- **Email:** nurse@test.com
- **Password:** 123456
- **Role:** Nurse

### Admin Portal
- **Email:** admin@test.com
- **Password:** 123456
- **Role:** Admin

## How to Test

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Open your browser and go to:** http://localhost:5173

3. **Test Registration:**
   - Click "Register"
   - Fill in any details
   - Select a role
   - Use any email/password combination
   - The system will create a new mock user

4. **Test Login:**
   - Click "Login"
   - Use one of the test accounts above
   - Select the appropriate portal
   - You'll be redirected to the correct dashboard

5. **Test Role-Based Access:**
   - Try accessing different dashboards with different user roles
   - Admin users can access all dashboards
   - Other users are restricted to their specific dashboard

## Features to Test

### Landing Page
- ✅ Login/Register modals
- ✅ Portal selection
- ✅ Service booking navigation
- ✅ Emergency page navigation

### Patient Dashboard
- ✅ Book appointments
- ✅ Upload medical files
- ✅ Chat with doctors
- ✅ AI symptom checker
- ✅ Video/phone calls
- ✅ Download prescriptions
- ✅ Logout functionality

### Doctor Dashboard
- ✅ View patient list
- ✅ Start teleconsults
- ✅ Issue prescriptions
- ✅ View recent reports
- ✅ Logout functionality

### Field Nurse Dashboard
- ✅ Enter patient vitals
- ✅ Upload files
- ✅ Track van locations
- ✅ View schedule
- ✅ Emergency alerts
- ✅ Logout functionality

### Admin Dashboard
- ✅ View analytics
- ✅ User management
- ✅ Van tracking
- ✅ Emergency feed
- ✅ Logout functionality

### Booking System
- ✅ Diagnostic Vans booking
- ✅ Telemedicine booking
- ✅ Health Pods booking
- ✅ Success confirmations

### Emergency Page
- ✅ GPS location detection
- ✅ Ambulance calling
- ✅ Status updates
- ✅ Emergency form submission

## Switching to Real Firebase

When you're ready to use real Firebase authentication:

1. **Update the import in App.tsx:**
   ```javascript
   import { AuthProvider } from './contexts/AuthContext'; // Instead of MockAuthContext
   ```

2. **Update all other files to use the real AuthContext**

3. **Set up Firebase project and update config.js with real credentials**

4. **Test with real Firebase authentication**

## Troubleshooting

### Common Issues:

1. **"Cannot find module" errors:**
   - Make sure all dependencies are installed: `npm install`

2. **Authentication not working:**
   - Check browser console for errors
   - Clear localStorage if needed
   - Try using the test accounts above

3. **Build errors:**
   - Run `npm run lint` to check for code issues
   - Run `npm run build` to test the build

4. **Development server not starting:**
   - Check if port 5173 is available
   - Try `npm run dev -- --port 3000` to use a different port

## Mock Data

The application uses mock data for:
- User authentication
- Patient records
- Doctor information
- Nurse schedules
- Emergency alerts
- Booking confirmations

All data is stored in memory and will reset when you refresh the page (except for logged-in user session which is stored in localStorage). 