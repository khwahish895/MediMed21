# Healthcare Rural Application

A comprehensive healthcare application designed to provide accessible healthcare services to rural villages. The application includes multiple portals for patients, doctors, field nurses, and administrators.

## Features

### 🏥 Multi-Portal System
- **Patient Portal**: Book appointments, upload medical files, chat with doctors, AI symptom checker
- **Doctor Portal**: Manage patients, conduct teleconsults, issue prescriptions
- **Field Nurse Portal**: Enter patient vitals, upload files, track van locations, handle emergencies
- **Admin Portal**: Analytics, user management, van tracking, emergency monitoring

### 🔐 Firebase Authentication
- Secure user registration and login
- Role-based access control
- Protected routes based on user roles
- User data stored in Firestore

### 🚑 Emergency Services
- GPS location detection
- Ambulance calling simulation
- Emergency status updates
- Real-time emergency alerts

### 📱 Booking System
- Diagnostic Vans booking
- Telemedicine appointments
- Health Pods services
- Real-time booking confirmations

## Firebase Setup (For Production)

When you're ready to deploy with real Firebase authentication:

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "healthcare-rural")
4. Follow the setup wizard

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save changes

### 3. Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users
5. Click "Done"

### 4. Get Firebase Configuration
1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app with a nickname
5. Copy the configuration object

### 5. Update Firebase Config
1. Open `src/firebase/config.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 6. Switch to Real Authentication
1. Update `src/App.tsx` to use real AuthContext:
   ```javascript
   import { AuthProvider } from './contexts/AuthContext'; // Instead of MockAuthContext
   ```
2. Update all other files to import from `AuthContext` instead of `MockAuthContext`
3. Test with real Firebase authentication

### 7. Set Up Firestore Rules
In Firebase Console, go to Firestore Database > Rules and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Quick Start (Mock Authentication)

The application comes with a mock authentication system for immediate testing:

### Test Accounts:
- **Patient:** patient@test.com / 123456
- **Doctor:** doctor@test.com / 123456  
- **Nurse:** nurse@test.com / 123456
- **Admin:** admin@test.com / 123456

### Testing:
1. Click "Login" on the landing page
2. Use any of the test accounts above
3. Select the appropriate portal
4. Explore all features without Firebase setup

See `TESTING.md` for detailed testing instructions.

## Usage

### Registration
1. Click "Register" on the landing page
2. Fill in your details and select your role (Patient, Doctor, Nurse, Admin)
3. Click "Register" to create your account

### Login
1. Click "Login" on the landing page
2. Enter your email and password
3. Select your portal type
4. Click "Login" to access your dashboard

### Role-Based Access
- **Patients**: Can book appointments, upload files, chat with doctors
- **Doctors**: Can manage patients, conduct teleconsults, issue prescriptions
- **Nurses**: Can enter vitals, upload files, track vans, handle emergencies
- **Admins**: Can access all portals and manage the entire system

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase** - Authentication and database
- **React Router** - Client-side routing
- **Lucide React** - Icons
- **Vite** - Build tool

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx
├── contexts/
│   └── AuthContext.jsx
├── firebase/
│   └── config.js
├── pages/
│   ├── AdminDashboard.tsx
│   ├── BookingPages.tsx
│   ├── DoctorDashboard.tsx
│   ├── EmergencyPage.tsx
│   ├── FieldNurseDashboard.tsx
│   ├── LandingPage.tsx
│   └── PatientDashboard.tsx
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

## Security Features

- ✅ Protected routes based on user roles
- ✅ Firebase Authentication
- ✅ Secure password requirements
- ✅ Role-based access control
- ✅ Automatic logout on route protection
- ✅ Error handling for authentication failures

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

4. Deploy:
```bash
firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository. 