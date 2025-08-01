# 🚑 SanjeevaniRural Med - Rural Healthcare Platform

A comprehensive healthcare platform designed to bring modern medical services to rural communities through mobile diagnostics, telemedicine, and AI-powered health assistance.

## 🌟 Features

### 🏠 **Homepage**
- Service search and booking functionality
- Portal access for different user roles
- Emergency assistance access

### 👨‍⚕️ **Doctor Dashboard**
- Patient management and vitals tracking
- Live teleconsultation with call/chat features
- AI-powered risk assessment
- Quick prescription management
- Diagnostic scan uploads
- Patient reports and analytics

### 🏥 **Nurse Dashboard**
- Field nurse vitals entry
- Real-time van location tracking
- Emergency alerts and response
- Patient visit scheduling
- Diagnostic uploads and notes

### 👨‍💼 **Admin Dashboard**
- User management (Patients, Doctors, Nurses)
- Van fleet tracking and management
- Emergency feed monitoring
- Analytics and reporting
- System status monitoring

### 📅 **Booking System**
- Diagnostic vans booking
- Telemedicine consultations
- Health pods appointments
- Emergency services

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/sanjeevaniruralmed.git

# Navigate to project directory
cd sanjeevaniruralmed

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🌐 Deployment

### Netlify Deployment
This project is configured for easy deployment on Netlify:

1. **Connect to GitHub**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**: Configure any required environment variables
4. **Deploy**: Netlify will automatically deploy your app

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting service
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── contexts/           # React contexts
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── DoctorDashboard.tsx
│   ├── FieldNurseDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── PatientDashboard.tsx
│   ├── BookingPages.tsx
│   └── EmergencyPage.tsx
├── styles/             # CSS files
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎯 Key Features

### 🔍 **Smart Search**
- Service-based search functionality
- Location-aware booking
- Real-time filtering

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface

### 🔐 **Role-Based Access**
- Patient portal
- Doctor portal
- Nurse portal
- Admin portal

### 🚨 **Emergency Services**
- GPS location tracking
- Emergency alerts
- Ambulance dispatch
- Real-time status updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Healthcare professionals for domain expertise
- Rural communities for inspiration
- Open source community for tools and libraries

## 📞 Support

For support, email support@sanjeevanirural.com or create an issue in this repository.

---

**Made with ❤️ for Rural Healthcare** 