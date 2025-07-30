import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowLeft,
  Truck,
  Heart,
  Activity,
  Navigation,
  X
} from 'lucide-react';

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showGPSModal, setShowGPSModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    emergency: '',
    location: '',
    description: ''
  });

  const emergencyTypes = [
    'Cardiac Emergency', 
    'Accident/Trauma', 
    'Breathing Difficulty', 
    'Severe Pain', 
    'Unconscious', 
    'Bleeding', 
    'Poisoning',
    'Other'
  ];

  const handleEmergencySubmit = () => {
    setIsEmergencyActive(true);
    // Here you would typically send the emergency request to backend
  };

  const handleGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setCurrentLocation(location);
          setPatientInfo({...patientInfo, location: location});
          setShowGPSModal(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleCallAmbulance = () => {
    setShowCallModal(true);
    // Simulate calling ambulance
    setTimeout(() => {
      setShowCallModal(false);
    }, 3000);
  };

  const handleUpdateStatus = () => {
    setShowStatusModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-red-600 hover:text-red-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {!isEmergencyActive ? (
          /* Emergency Form */
          <div className="glass-card rounded-3xl p-8 bg-white/90 backdrop-blur-lg border-2 border-red-200">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center pulse-glow">
                <AlertTriangle className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-red-800">Emergency Assistance</h1>
                <p className="text-red-600">Get immediate medical help</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                  <input
                    type="text"
                    required
                    value={patientInfo.name}
                    onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                    className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    required
                    value={patientInfo.age}
                    onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                    className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Type *</label>
                <select
                  required
                  value={patientInfo.emergency}
                  onChange={(e) => setPatientInfo({...patientInfo, emergency: e.target.value})}
                  className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400"
                >
                  <option value="">Select emergency type</option>
                  {emergencyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    value={patientInfo.location}
                    onChange={(e) => setPatientInfo({...patientInfo, location: e.target.value})}
                    className="flex-1 p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400"
                    placeholder="Enter current location"
                  />
                  <button 
                    onClick={handleGPSLocation}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg flex items-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>GPS</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={patientInfo.description}
                  onChange={(e) => setPatientInfo({...patientInfo, description: e.target.value})}
                  className="w-full p-3 border border-red-200 rounded-lg h-24 focus:ring-2 focus:ring-red-400 focus:border-red-400"
                  placeholder="Describe the emergency situation, symptoms, and any relevant details..."
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={handleEmergencySubmit}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-lg font-semibold pulse-glow flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>Send Emergency Request</span>
                </button>
                <button 
                  onClick={handleCallAmbulance}
                  className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Emergency Hotline</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Emergency Active Status */
          <div className="space-y-6">
            {/* Status Card */}
            <div className="glass-card rounded-3xl p-8 bg-red-50/90 backdrop-blur-lg border-2 border-red-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <AlertTriangle className="text-white w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-red-800 mb-2">Emergency Request Active</h2>
                <p className="text-red-600 mb-4">Help is on the way. Stay calm and follow any instructions given.</p>
                <div className="text-sm text-red-700">
                  <p>Request ID: #EMG2024-001</p>
                  <p>Time: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            {/* Ambulance Tracking */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Truck className="w-6 h-6 text-red-500" />
                <span>Ambulance Status</span>
              </h3>
              
              <div className="bg-red-50 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-red-800">Ambulance #AMB-001</h4>
                    <p className="text-red-600 text-sm">Driver: Ramesh Kumar</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-800">ETA: 8 minutes</p>
                    <p className="text-red-600 text-sm">Distance: 3.2 km</p>
                  </div>
                </div>
                
                <div className="w-full bg-red-200 rounded-full h-3 mb-2">
                  <div className="bg-red-500 h-3 rounded-full" style={{width: '65%'}}></div>
                </div>
                <p className="text-red-700 text-sm">En route to your location</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-800">Response Time</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">00:03:24</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-800">Current Location</span>
                  </div>
                  <p className="text-sm text-gray-600">Main Road, near Ranchi Hospital</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-800">Medical Team</span>
                  </div>
                  <p className="text-sm text-gray-600">Paramedic on board</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Instructions</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-800">Stay with the patient and keep them calm</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-800">Keep the patient's airway clear and monitor breathing</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-800">Prepare to flag down the ambulance when it arrives</p>
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleCallAmbulance}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Ambulance Driver</span>
              </button>
              <button 
                onClick={handleUpdateStatus}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2"
              >
                <Activity className="w-5 h-5" />
                <span>Update Patient Status</span>
              </button>
            </div>
          </div>
        )}

        {/* GPS Modal */}
        {showGPSModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Location Found</h2>
                <button 
                  onClick={() => setShowGPSModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Navigation className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-800">GPS Coordinates</span>
                  </div>
                  <p className="text-green-700 font-mono">{currentLocation}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-blue-800">Estimated Address</span>
                  </div>
                  <p className="text-blue-700">Main Road, Ranchi, Jharkhand</p>
                </div>
                
                <button 
                  onClick={() => setShowGPSModal(false)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold"
                >
                  Use This Location
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call Modal */}
        {showCallModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Calling Ambulance</h2>
              <p className="text-gray-600 mb-6">Connecting to emergency services...</p>
              <div className="animate-pulse">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        )}

        {/* Status Update Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Update Patient Status</h2>
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Condition</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400">
                    <option value="">Select condition</option>
                    <option value="stable">Stable</option>
                    <option value="improving">Improving</option>
                    <option value="critical">Critical</option>
                    <option value="unconscious">Unconscious</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-400"
                    placeholder="Describe any changes in patient condition..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowStatusModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowStatusModal(false)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;