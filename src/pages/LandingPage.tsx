import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/MockAuthContext';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Truck, 
  Video, 
  Building, 
  AlertCircle,
  Stethoscope,
  Heart,
  Shield,
  Users,
  Globe,
  Star,
  X,
  LogIn,
  UserPlus
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState('');
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    portal: '' 
  });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    {
      icon: Truck,
      title: 'Diagnostic Vans',
      description: 'Mobile medical units bringing advanced diagnostics to your village',
      color: 'from-blue-500 to-cyan-500',
      path: '/booking/diagnostic-vans'
    },
    {
      icon: Video,
      title: 'Telemedicine',
      description: 'Connect with specialist doctors via video consultation',
      color: 'from-green-500 to-teal-500',
      path: '/booking/telemedicine'
    },
    {
      icon: Building,
      title: 'Health Pods',
      description: 'Modular health stations for primary care services',
      color: 'from-purple-500 to-pink-500',
      path: '/booking/health-pods'
    },
    {
      icon: AlertCircle,
      title: 'Emergency Help',
      description: '24/7 emergency assistance and ambulance services',
      color: 'from-red-500 to-orange-500',
      path: '/emergency'
    }
  ];

  const dashboardOptions = [
    {
      title: 'Patient Portal',
      description: 'Access your health records, book appointments, chat with doctors',
      icon: Users,
      path: '/patient-dashboard',
      color: 'from-blue-500 to-cyan-500',
      value: 'patient'
    },
    {
      title: 'Doctor Portal',
      description: 'Manage patients, conduct teleconsults, issue prescriptions',
      icon: Stethoscope,
      path: '/doctor-dashboard',
      color: 'from-green-500 to-teal-500',
      value: 'doctor'
    },
    {
      title: 'Field Nurse Portal',
      description: 'Upload vitals, track van locations, handle emergencies',
      icon: Heart,
      path: '/nurse-dashboard',
      color: 'from-purple-500 to-pink-500',
      value: 'nurse'
    },
    {
      title: 'Admin Portal',
      description: 'Analytics, user management, van tracking, emergency monitoring',
      icon: Shield,
      path: '/admin-dashboard',
      color: 'from-orange-500 to-red-500',
      value: 'admin'
    }
  ];

  const handleLogin = async () => {
    if (loginCredentials.email && loginCredentials.password && selectedPortal) {
      setIsLoading(true);
      setLoginError('');
      
      try {
        await login(loginCredentials.email, loginCredentials.password);
        setShowLoginModal(false);
        setLoginCredentials({ email: '', password: '' });
        setSelectedPortal('');
        
        // Navigate based on portal
        switch (selectedPortal) {
          case 'patient':
            navigate('/patient-dashboard');
            break;
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'nurse':
            navigate('/nurse-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            break;
        }
      } catch (error) {
        setLoginError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegister = async () => {
    if (registerData.name && registerData.email && registerData.password && registerData.portal) {
      if (registerData.password !== registerData.confirmPassword) {
        setRegisterError('Passwords do not match!');
        return;
      }
      
      if (registerData.password.length < 6) {
        setRegisterError('Password must be at least 6 characters long!');
        return;
      }
      
      setIsLoading(true);
      setRegisterError('');
      
      try {
        await signup(registerData.email, registerData.password, registerData.name, registerData.portal);
        setShowRegisterModal(false);
        setRegisterData({ name: '', email: '', password: '', confirmPassword: '', portal: '' });
        
        // Navigate based on portal
        switch (registerData.portal) {
          case 'patient':
            navigate('/patient-dashboard');
            break;
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'nurse':
            navigate('/nurse-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            break;
        }
      } catch (error) {
        setRegisterError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearchServices = () => {
    // Navigate to services page with search parameters
    navigate('/booking', { 
      state: { 
        service: searchQuery, 
        location: location, 
        date: selectedDate 
      } 
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5875730/pexels-photo-5875730.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-cyan-800/60 to-blue-900/70"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="glass-card rounded-2xl p-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Heart className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">HealthRural</span>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="glass-card px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-lg text-white glow-button flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 floating-animation">
            Care That Reaches
            <br />
            <span className="gradient-text">Every Village</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Bringing modern healthcare to rural communities through mobile diagnostics, 
            telemedicine, and AI-powered health assistance
          </p>

          {/* Search Bar */}
          <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Service type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-blue-300 w-5 h-5" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button 
                onClick={handleSearchServices}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-lg text-white font-semibold glow-button"
              >
                Search Services
              </button>
            </div>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(service.path)}
                  className="glass-card rounded-2xl p-6 text-center cursor-pointer card-hover group"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-blue-100 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>

          {/* Dashboard Access Section */}
          <div className="glass-card rounded-3xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Access Healthcare Portals</h2>
            <p className="text-blue-100 mb-8">Choose your role to access the appropriate dashboard</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    onClick={() => navigate(option.path)}
                    className="neomorphic rounded-2xl p-6 cursor-pointer card-hover group bg-white/10 backdrop-blur-lg border border-white/20"
                  >
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                    <p className="text-blue-100 text-sm">{option.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: '10,000+', label: 'Patients Served', icon: Users },
              { number: '500+', label: 'Villages Covered', icon: Globe },
              { number: '50+', label: 'Medical Vans', icon: Truck },
              { number: '98%', label: 'Satisfaction Rate', icon: Star }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="glass-card rounded-2xl p-6 text-center">
                  <Icon className="text-blue-300 w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => navigate('/patient-dashboard')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-12 py-4 rounded-2xl text-white text-xl font-semibold glow-button shadow-2xl"
          >
            Book a Service Now
          </button>
        </div>
      </main>

      {/* Floating Medical Icons */}
      <div className="absolute top-20 left-10 opacity-20">
        <Heart className="text-white w-16 h-16 floating-animation" style={{animationDelay: '0s'}} />
      </div>
      <div className="absolute top-40 right-20 opacity-20">
        <Stethoscope className="text-white w-12 h-12 floating-animation" style={{animationDelay: '1s'}} />
      </div>
      <div className="absolute bottom-40 left-20 opacity-20">
        <Shield className="text-white w-14 h-14 floating-animation" style={{animationDelay: '2s'}} />
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Login</h2>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portal</label>
                <select
                  value={selectedPortal}
                  onChange={(e) => setSelectedPortal(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Portal</option>
                  <option value="patient">Patient Portal</option>
                  <option value="doctor">Doctor Portal</option>
                  <option value="nurse">Field Nurse Portal</option>
                  <option value="admin">Admin Portal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginCredentials.email}
                  onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter password"
                />
              </div>
              
              {loginError && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {loginError}
                </div>
              )}
              
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Register</h2>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portal</label>
                <select
                  value={registerData.portal}
                  onChange={(e) => setRegisterData({...registerData, portal: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Portal</option>
                  <option value="patient">Patient Portal</option>
                  <option value="doctor">Doctor Portal</option>
                  <option value="nurse">Field Nurse Portal</option>
                  <option value="admin">Admin Portal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm password"
                />
              </div>
              
              {registerError && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {registerError}
                </div>
              )}
              
              <button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;