import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/MockAuthContext.tsx';
import { 
  User, 
  AlertTriangle, 
  Calendar, 
  Upload, 
  MessageCircle, 
  Brain,
  FileText,
  Settings,
  Home,
  Heart,
  Download,
  Phone,
  Video,
  X,
  Send
} from 'lucide-react';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [showPhoneCallModal, setShowPhoneCallModal] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [bookingData, setBookingData] = useState({
    specialty: '',
    date: '',
    time: '',
    reason: ''
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'ai-help', label: 'AI Help', icon: Brain },
    { id: 'emergency', label: 'SOS', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const recentDoctors = [
    { name: 'Dr. Priya Sharma', specialty: 'General Medicine', lastConsult: '2 days ago', rating: 4.8, image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300' },
    { name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', lastConsult: '1 week ago', rating: 4.9, image: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300' },
    { name: 'Dr. Sunita Rao', specialty: 'Pediatrics', lastConsult: '2 weeks ago', rating: 4.7, image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300' }
  ];

  interface Prescription {
    medicine: string;
    doctor: string;
    date: string;
    status: 'Active' | 'Completed';
  }

  const prescriptions: Prescription[] = [
    { medicine: 'Paracetamol 500mg', doctor: 'Dr. Priya Sharma', date: '2024-12-15', status: 'Active' },
    { medicine: 'Vitamin D3', doctor: 'Dr. Rajesh Kumar', date: '2024-12-10', status: 'Completed' },
    { medicine: 'Iron Tablets', doctor: 'Dr. Sunita Rao', date: '2024-12-08', status: 'Active' }
  ];

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBookingModal(false);
    // Show success message
    alert('Appointment booked successfully!');
  };

  const handleUploadFile = () => {
    setShowUploadModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
    setShowUploadModal(false);
    alert('Files uploaded successfully!');
  };

  const handleChatWithDoctor = () => {
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add message to chat
      setChatMessage('');
    }
  };

  const handleAISymptomChecker = () => {
    setShowAIModal(true);
  };

  const handleAnalyzeSymptoms = () => {
    // Simulate AI analysis
    setAiResponse('Based on your symptoms, you may have a mild respiratory infection. I recommend:\n\n1. Rest and hydration\n2. Over-the-counter pain relievers\n3. Monitor symptoms for 48 hours\n4. Contact a doctor if symptoms worsen\n\nThis is not a medical diagnosis. Please consult a healthcare professional.');
  };

  const handleVideoCall = () => {
    setShowVideoCallModal(true);
  };

  const handlePhoneCall = () => {
    setShowPhoneCallModal(true);
  };

  const handleDownloadPrescription = (prescription: Prescription) => {
    // Simulate download
    alert(`Downloading prescription for ${prescription.medicine}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex">
      {/* Sidebar */}
      <div className="w-64 sidebar-glass min-h-screen p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Heart className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">SanjeevaniRural Med</span>
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
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.id === 'emergency' ? 'text-red-500' : ''}`} />
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
            <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
            <p className="text-gray-600">Manage your health and appointments</p>
          </div>
          <button 
            onClick={() => navigate('/emergency')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full pulse-glow flex items-center space-x-2 font-semibold"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>SOS Emergency</span>
          </button>
        </div>

        {/* Welcome Card */}
        <div className="glass-card rounded-2xl p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome back, Rahul</h2>
              <p className="text-gray-600">Age: 32 years • Last visit: 3 days ago</p>
              <p className="text-sm text-gray-500">📍 Ranchi, Jharkhand</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Book Appointment */}
          <div className="glass-card rounded-2xl p-6 card-hover">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="text-blue-500 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">Book Appointment</h3>
            </div>
            <div className="space-y-4">
              <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
                <option>Select Specialty</option>
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
              </select>
              <input
                type="date"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
              <button 
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold glow-button"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Upload Medical Reports */}
          <div className="glass-card rounded-2xl p-6 card-hover">
            <div className="flex items-center space-x-3 mb-4">
              <Upload className="text-green-500 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">Upload Medical Reports</h3>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Drag & drop files here</p>
              <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
              <button 
                onClick={handleUploadFile}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Chat with Doctor */}
          <div className="glass-card rounded-2xl p-6 card-hover">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">Chat with Doctor</h3>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 h-32 mb-4 overflow-y-auto">
              <div className="text-sm text-gray-600">
                <p className="mb-2"><strong>Dr. Priya:</strong> How are you feeling today?</p>
                <p><strong>You:</strong> Much better, thank you doctor.</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              <button 
                onClick={handleChatWithDoctor}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Symptom Checker */}
          <div className="glass-card rounded-2xl p-6 card-hover">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="text-orange-500 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">AI Symptom Checker</h3>
            </div>
            <div className="space-y-4">
              <textarea
                placeholder="Describe your symptoms..."
                className="w-full p-3 border border-gray-200 rounded-lg h-20 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <button 
                onClick={handleAISymptomChecker}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold glow-button"
              >
                Analyze Symptoms
              </button>
              <div className="text-sm text-gray-500 text-center">
                <span className="inline-flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Risk Level: Low
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Consulted Doctors */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Recently Consulted Doctors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentDoctors.map((doctor, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 card-hover">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{doctor.lastConsult}</span>
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{doctor.rating}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button 
                    onClick={handleVideoCall}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm flex items-center justify-center space-x-1"
                  >
                    <Video className="w-4 h-4" />
                    <span>Video Call</span>
                  </button>
                  <button 
                    onClick={handlePhoneCall}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded text-sm"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* E-Prescriptions */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">E-Prescriptions</h3>
            <button className="text-blue-500 hover:text-blue-600 flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Download All</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-600">Medicine</th>
                  <th className="text-left py-3 text-gray-600">Doctor</th>
                  <th className="text-left py-3 text-gray-600">Date</th>
                  <th className="text-left py-3 text-gray-600">Status</th>
                  <th className="text-left py-3 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 font-medium text-gray-800">{prescription.medicine}</td>
                    <td className="py-4 text-gray-600">{prescription.doctor}</td>
                    <td className="py-4 text-gray-600">{prescription.date}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        prescription.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button 
                        onClick={() => handleDownloadPrescription(prescription)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select 
                  value={bookingData.specialty}
                  onChange={(e) => setBookingData({...bookingData, specialty: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Specialty</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <select 
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <textarea
                  value={bookingData.reason}
                  onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-400"
                  placeholder="Describe your symptoms or reason for visit..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upload Medical Files</h2>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Drag & drop files here or click to browse</p>
                <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer inline-block">
                  Choose Files
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Chat with Dr. Priya</h2>
              <button 
                onClick={() => setShowChatModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                    <p>Hello doctor, I have a question about my medication.</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                    <p>Hello! I'm here to help. What's your question?</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Symptom Checker Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">AI Symptom Checker</h2>
              <button 
                onClick={() => setShowAIModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe your symptoms</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your symptoms in detail..."
                />
              </div>
              
              <button 
                onClick={handleAnalyzeSymptoms}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold"
              >
                Analyze Symptoms
              </button>
              
              {aiResponse && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">AI Analysis Result:</h3>
                  <p className="text-orange-700 whitespace-pre-line">{aiResponse}</p>
                  <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm">
                    <Download className="w-4 h-4 inline mr-2" />
                    Download Prescription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Call Modal */}
      {showVideoCallModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Video Call</h2>
            <p className="text-gray-600 mb-6">Connecting to Dr. Priya Sharma...</p>
            <div className="animate-pulse">
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto"></div>
            </div>
            <button 
              onClick={() => setShowVideoCallModal(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Phone Call Modal */}
      {showPhoneCallModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Phone Call</h2>
            <p className="text-gray-600 mb-6">Calling Dr. Priya Sharma...</p>
            <div className="animate-pulse">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
            </div>
            <button 
              onClick={() => setShowPhoneCallModal(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;