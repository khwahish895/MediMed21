import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/MockAuthContext';
import { 
  Stethoscope, 
  Users, 
  Pill, 
  Video, 
  FileText,
  Settings,
  Home,
  MessageCircle,
  Search,
  X
} from 'lucide-react';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showTeleconsultModal, setShowTeleconsultModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    medicine: '',
    dosage: '',
    duration: '',
    instructions: ''
  });


  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'teleconsult', label: 'Teleconsult', icon: Video },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const todayStats = [
    { label: 'Patients Today', value: '24', icon: Users, color: 'blue' },
    { label: 'Prescriptions Issued', value: '18', icon: Pill, color: 'green' },
    { label: 'Live Consults', value: '3', icon: Video, color: 'purple' },
    { label: 'Pending Reports', value: '7', icon: FileText, color: 'orange' }
  ];

  const patients = [
    {
      id: 1,
      name: 'Rahul Sharma',
      age: 32,
      condition: 'Hypertension',
      urgency: 'Medium',
      lastVisit: '2024-12-15',
      vitals: { bp: '140/90', temp: '98.6°F', hr: '85 bpm', spo2: '98%' },
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300&h=300'
    },
    {
      id: 2,
      name: 'Priya Devi',
      age: 45,
      condition: 'Diabetes',
      urgency: 'High',
      lastVisit: '2024-12-14',
      vitals: { bp: '130/85', temp: '99.1°F', hr: '92 bpm', spo2: '96%' },
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      age: 28,
      condition: 'Migraine',
      urgency: 'Low',
      lastVisit: '2024-12-13',
      vitals: { bp: '120/80', temp: '98.4°F', hr: '78 bpm', spo2: '99%' },
      image: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=300&h=300'
    }
  ];

  const recentReports = [
    { patient: 'Rahul Sharma', type: 'Blood Test', date: '2024-12-15', status: 'Reviewed' },
    { patient: 'Priya Devi', type: 'ECG', date: '2024-12-14', status: 'Pending' },
    { patient: 'Amit Kumar', type: 'MRI Scan', date: '2024-12-13', status: 'Reviewed' }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStartTeleconsult = () => {
    if (selectedPatient) {
      setShowTeleconsultModal(true);
    }
  };

  const handleAddPrescription = () => {
    setShowPrescriptionModal(true);
  };

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    setShowPrescriptionModal(false);
    alert('Prescription added successfully!');
    setPrescriptionData({ medicine: '', dosage: '', duration: '', instructions: '' });
  };

  const handleSaveNotes = () => {
    alert('Consultation notes saved successfully!');
  };

  const handleUploadFile = () => {
    alert('File uploaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex">
      {/* Sidebar */}
      <div className="w-64 sidebar-glass min-h-screen p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
            <Stethoscope className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">Doctor Portal</span>
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
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-white/50'
                }`}
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
            <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. Priya Sharma</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-800 text-sm">Available</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Today</p>
              <p className="font-semibold text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Today's Patients</h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <Search className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {patients.map((patient) => (
                  <div 
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all card-hover ${
                      selectedPatient?.id === patient.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(patient.urgency)}`}>
                            {patient.urgency}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Age: {patient.age} • {patient.condition}</p>
                        <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teleconsult Panel */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Live Teleconsult</h3>
              
              {selectedPatient ? (
                <div className="space-y-4">
                  <div className="bg-black rounded-lg h-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-12 h-12 mx-auto mb-2" />
                      <p>Video consultation with</p>
                      <p className="font-semibold">{selectedPatient.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-600">Blood Pressure</p>
                      <p className="font-semibold text-blue-800">{selectedPatient.vitals.bp}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs text-red-600">Heart Rate</p>
                      <p className="font-semibold text-red-800">{selectedPatient.vitals.hr}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-600">Temperature</p>
                      <p className="font-semibold text-green-800">{selectedPatient.vitals.temp}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-purple-600">SpO2</p>
                      <p className="font-semibold text-purple-800">{selectedPatient.vitals.spo2}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={handleStartTeleconsult}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Start Call</span>
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      placeholder="Consultation notes..."
                      value={consultationNotes}
                      onChange={(e) => setConsultationNotes(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg h-20 focus:ring-2 focus:ring-green-400"
                    />
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleUploadFile}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm"
                      >
                        Upload File
                      </button>
                      <button 
                        onClick={handleSaveNotes}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a patient to start teleconsultation</p>
                </div>
              )}
            </div>

            {/* Quick Prescription Tool */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Prescription</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Medicine name..."
                  value={prescriptionData.medicine}
                  onChange={(e) => setPrescriptionData({...prescriptionData, medicine: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={prescriptionData.dosage}
                    onChange={(e) => setPrescriptionData({...prescriptionData, dosage: e.target.value})}
                    className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={prescriptionData.duration}
                    onChange={(e) => setPrescriptionData({...prescriptionData, duration: e.target.value})}
                    className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <button 
                  onClick={handleAddPrescription}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm"
                >
                  Add to Prescription
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mt-8">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Reports</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600">Patient</th>
                    <th className="text-left py-3 text-gray-600">Report Type</th>
                    <th className="text-left py-3 text-gray-600">Date</th>
                    <th className="text-left py-3 text-gray-600">Status</th>
                    <th className="text-left py-3 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 font-medium text-gray-800">{report.patient}</td>
                      <td className="py-4 text-gray-600">{report.type}</td>
                      <td className="py-4 text-gray-600">{report.date}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          report.status === 'Reviewed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-500 hover:text-blue-600 text-sm">
                          View Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Prescription</h2>
              <button 
                onClick={() => setShowPrescriptionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handlePrescriptionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                <input
                  type="text"
                  value={prescriptionData.medicine}
                  onChange={(e) => setPrescriptionData({...prescriptionData, medicine: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    value={prescriptionData.dosage}
                    onChange={(e) => setPrescriptionData({...prescriptionData, dosage: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={prescriptionData.duration}
                    onChange={(e) => setPrescriptionData({...prescriptionData, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  value={prescriptionData.instructions}
                  onChange={(e) => setPrescriptionData({...prescriptionData, instructions: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-green-400"
                  placeholder="Special instructions for the patient..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
              >
                Add to Prescription
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Teleconsult Modal */}
      {showTeleconsultModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Live Teleconsult</h2>
              <button 
                onClick={() => setShowTeleconsultModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Video Call Active</p>
                  <p className="text-sm">with {selectedPatient?.name}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold">
                  End Call
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;