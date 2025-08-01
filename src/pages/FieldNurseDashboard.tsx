import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/MockAuthContext.tsx';
import { 
  Heart, 
  Upload, 
  MapPin, 
  AlertTriangle,
  Settings,
  Home,
  Users,
  Truck,
  Camera,
  Activity,
  Navigation,
  Thermometer,
  Stethoscope
} from 'lucide-react';

const FieldNurseDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [vitals, setVitals] = useState({
    bp: '',
    temp: '',
    spo2: '',
    heartRate: ''
  });
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'van-tracker', label: 'Van Tracker', icon: Truck },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const todayMetrics = [
    { label: 'Patients Visited Today', value: '18', icon: Users, color: 'blue' },
    { label: 'Reports Uploaded', value: '12', icon: Upload, color: 'green' },
    { label: 'Emergencies Handled', value: '2', icon: AlertTriangle, color: 'red' },
    { label: 'Distance Covered', value: '45km', icon: Navigation, color: 'purple' }
  ];

  const nextVisits = [
    { village: 'Ranchi Village', time: '2:00 PM', patients: 8, distance: '12 km' },
    { village: 'Gumla Township', time: '4:30 PM', patients: 6, distance: '18 km' },
    { village: 'Khunti Area', time: '6:00 PM', patients: 4, distance: '8 km' }
  ];

  const handleVitalChange = (field, value) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  const handleEmergencyCall = () => {
    alert('Calling emergency services...');
  };

  const handleAlertHospital = () => {
    alert('Alert sent to nearest hospital!');
  };

  const getRiskLevel = () => {
    // Simple risk assessment based on vitals
    if (!vitals.bp || !vitals.temp || !vitals.spo2 || !vitals.heartRate) {
      return { level: 'Unknown', color: 'gray', message: 'Please enter all vitals' };
    }
    
    const bp = vitals.bp.split('/');
    const systolic = parseInt(bp[0]) || 0;
    const temp = parseFloat(vitals.temp) || 0;
    const spo2 = parseInt(vitals.spo2) || 0;
    const hr = parseInt(vitals.heartRate) || 0;

    if ((systolic > 140) || (temp > 100) || (spo2 < 95) || (hr > 100)) {
      return { level: 'High', color: 'red', message: 'Immediate attention required' };
    } else if ((systolic > 130) || (temp > 99) || (spo2 < 98) || (hr > 90)) {
      return { level: 'Medium', color: 'yellow', message: 'Monitor closely' };
    } else {
      return { level: 'Low', color: 'green', message: 'Vitals within normal range' };
    }
  };

  const risk = getRiskLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex">
      {/* Sidebar */}
      <div className="w-64 sidebar-glass min-h-screen p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Heart className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">Nurse Portal</span>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id 
                    ? 'bg-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-white/50'
                } ${item.id === 'emergency' ? 'text-red-600' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 transition-all"
        >
          Back to Home
        </button>
        
        <button 
          onClick={async () => {
            try {
              await logout();
              navigate('/');
            } catch (error) {
              console.error('Logout error:', error);
            }
          }}
          className="mt-2 w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-all"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Field Nurse Dashboard</h1>
            <p className="text-gray-600">Welcome back, Nurse Sunita</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-800 text-sm">On Duty</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-800">📍 Ranchi District</p>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {todayMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vitals Entry Panel */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Patient Vitals Entry</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Activity className="inline w-4 h-4 mr-2" />
                      Blood Pressure (mmHg)
                    </label>
                    <input
                      type="text"
                      placeholder="120/80"
                      value={vitals.bp}
                      onChange={(e) => handleVitalChange('bp', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Thermometer className="inline w-4 h-4 mr-2" />
                      Temperature (°F)
                    </label>
                    <input
                      type="number"
                      placeholder="98.6"
                      value={vitals.temp}
                      onChange={(e) => handleVitalChange('temp', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Heart className="inline w-4 h-4 mr-2" />
                      Heart Rate (bpm)
                    </label>
                    <input
                      type="number"
                      placeholder="72"
                      value={vitals.heartRate}
                      onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Stethoscope className="inline w-4 h-4 mr-2" />
                      SpO2 (%)
                    </label>
                    <input
                      type="number"
                      placeholder="98"
                      value={vitals.spo2}
                      onChange={(e) => handleVitalChange('spo2', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
              </div>

              {/* AI Risk Assessment */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">AI Risk Assessment</h4>
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-${risk.color}-500`}></div>
                  <span className={`font-semibold text-${risk.color}-800`}>Risk Level: {risk.level}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{risk.message}</p>
              </div>

              <button 
                onClick={() => {
                  if (vitals.bp && vitals.temp && vitals.spo2 && vitals.heartRate) {
                    alert('Vitals saved and report generated successfully!');
                  } else {
                    alert('Please fill in all vitals before saving.');
                  }
                }}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold glow-button"
              >
                Save Vitals & Generate Report
              </button>
            </div>

            {/* Upload Diagnostic Scan */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Diagnostic Scan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Take Photo</p>
                  <button 
                    onClick={() => {
                      setShowCameraModal(true);
                      setTimeout(() => setShowCameraModal(false), 2000);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Open Camera
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Upload Document</p>
                  <button 
                    onClick={() => {
                      setShowUploadModal(true);
                      setTimeout(() => setShowUploadModal(false), 2000);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes/Observations
                </label>
                <textarea
                  placeholder="Enter patient observations, symptoms, and notes..."
                  className="w-full p-3 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Van Location Map */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Van Location</h3>
              
              <div className="bg-blue-100 rounded-lg h-32 flex items-center justify-center mb-4">
                <div className="text-center text-blue-800">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Live Location Tracking</p>
                  <p className="text-xs">📍 Near Ranchi Hospital</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">ETA to next location:</span>
                <span className="font-semibold text-gray-800">15 mins</span>
              </div>
            </div>

            {/* Next Visits */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Visits</h3>
              
              <div className="space-y-3">
                {nextVisits.map((visit, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800">{visit.village}</h4>
                      <span className="text-sm text-gray-600">{visit.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{visit.patients} patients</span>
                      <span>{visit.distance}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  setShowScheduleModal(true);
                  setTimeout(() => setShowScheduleModal(false), 2000);
                }}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm"
              >
                View Full Schedule
              </button>
            </div>

            {/* Emergency Alert */}
            <div className="glass-card rounded-2xl p-6 bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="text-red-600 w-6 h-6" />
                <h3 className="text-lg font-semibold text-red-800">Emergency Alert</h3>
              </div>
              
              <p className="text-red-700 text-sm mb-4">
                Quick access to emergency services and protocols
              </p>

              <div className="space-y-2">
                <button 
                  onClick={handleEmergencyCall}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm pulse-glow"
                >
                  Call Emergency Services
                </button>
                <button 
                  onClick={handleAlertHospital}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm"
                >
                  Alert Nearest Hospital
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <Camera className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Camera Active</h2>
            <p className="text-gray-600 mb-6">Taking diagnostic photo...</p>
            <div className="animate-pulse">
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <Upload className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Uploading Files</h2>
            <p className="text-gray-600 mb-6">Processing medical documents...</p>
            <div className="animate-pulse">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Full Schedule</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-blue-800">Today</h3>
                <p className="text-sm text-blue-600">8:00 AM - Ranchi Village (12 patients)</p>
                <p className="text-sm text-blue-600">2:00 PM - Gumla Township (8 patients)</p>
                <p className="text-sm text-blue-600">6:00 PM - Khunti Area (6 patients)</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-green-800">Tomorrow</h3>
                <p className="text-sm text-green-600">9:00 AM - Simdega (10 patients)</p>
                <p className="text-sm text-green-600">3:00 PM - Lohardaga (7 patients)</p>
              </div>
            </div>
            <button 
              onClick={() => setShowScheduleModal(false)}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Emergency Call</h2>
            <p className="text-gray-600 mb-6">Connecting to emergency services...</p>
            <div className="animate-pulse">
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldNurseDashboard;