import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Video, Building, CheckCircle } from 'lucide-react';

const BookingWrapper = ({ children, title, icon: Icon }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Icon className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
              <p className="text-gray-600">Book your healthcare service</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const DiagnosticVansBooking = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    location: '',
    testType: '',
    date: '',
    timeSlot: '',
    patientDetails: ''
  });

  // Pre-fill form with search parameters
  useEffect(() => {
    if (location.state) {
      setBookingData(prev => ({
        ...prev,
        location: location.state.location || '',
        date: location.state.date || ''
      }));
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
  <BookingWrapper title="Diagnostic Vans" icon={Truck}>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your diagnostic van appointment has been successfully booked.</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter your location"
              value={bookingData.location}
              onChange={(e) => setBookingData({...bookingData, location: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Required Test</label>
            <select 
              value={bookingData.testType}
              onChange={(e) => setBookingData({...bookingData, testType: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select test type</option>
              <option value="Blood Tests">Blood Tests</option>
              <option value="X-ray">X-ray</option>
              <option value="ECG">ECG</option>
              <option value="Ultrasound">Ultrasound</option>
              <option value="MRI">MRI</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
          <input
            type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
            <select 
              value={bookingData.timeSlot}
              onChange={(e) => setBookingData({...bookingData, timeSlot: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select time</option>
              <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
              <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
              <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient Details</label>
        <textarea
          placeholder="Patient name, age, medical history, special requirements..."
            value={bookingData.patientDetails}
            onChange={(e) => setBookingData({...bookingData, patientDetails: e.target.value})}
          className="w-full p-3 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-blue-400"
            required
        />
      </div>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-lg font-semibold glow-button">
        Book Diagnostic Van
      </button>
      </form>
  </BookingWrapper>
);
};

const TelemedicineBooking = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    symptoms: ''
  });

  // Pre-fill form with search parameters
  useEffect(() => {
    if (location.state) {
      setBookingData(prev => ({
        ...prev,
        date: location.state.date || ''
      }));
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
  <BookingWrapper title="Telemedicine" icon={Video}>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your telemedicine consultation has been successfully booked.</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
            <select 
              value={bookingData.specialty}
              onChange={(e) => setBookingData({...bookingData, specialty: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select specialty</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Doctor</label>
            <select 
              value={bookingData.doctor}
              onChange={(e) => setBookingData({...bookingData, doctor: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Any available doctor</option>
              <option value="Dr. Priya Sharma (General)">Dr. Priya Sharma (General)</option>
              <option value="Dr. Rajesh Kumar (Cardiology)">Dr. Rajesh Kumar (Cardiology)</option>
              <option value="Dr. Sunita Rao (Pediatrics)">Dr. Sunita Rao (Pediatrics)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400"
              required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <select 
              value={bookingData.time}
              onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms/Reason for Consultation</label>
        <textarea
          placeholder="Describe your symptoms or reason for consultation..."
            value={bookingData.symptoms}
            onChange={(e) => setBookingData({...bookingData, symptoms: e.target.value})}
          className="w-full p-3 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-green-400"
            required
        />
      </div>

        <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-lg font-semibold glow-button">
        Book Telemedicine Consultation
      </button>
      </form>
  </BookingWrapper>
);
};

const HealthPodsBooking = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    location: '',
    serviceType: '',
    date: '',
    timeSlot: '',
    patientInfo: ''
  });

  // Pre-fill form with search parameters
  useEffect(() => {
    if (location.state) {
      setBookingData(prev => ({
        ...prev,
        location: location.state.location || '',
        date: location.state.date || ''
      }));
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
  <BookingWrapper title="Health Pods" icon={Building}>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your health pod appointment has been successfully booked.</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pod Location</label>
            <select 
              value={bookingData.location}
              onChange={(e) => setBookingData({...bookingData, location: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select location</option>
              <option value="Ranchi Village Square">Ranchi Village Square</option>
              <option value="Gumla Community Center">Gumla Community Center</option>
              <option value="Khunti School Grounds">Khunti School Grounds</option>
              <option value="Simdega Market Area">Simdega Market Area</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <select 
              value={bookingData.serviceType}
              onChange={(e) => setBookingData({...bookingData, serviceType: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select service</option>
              <option value="General Health Checkup">General Health Checkup</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Blood Pressure Monitoring">Blood Pressure Monitoring</option>
              <option value="Diabetes Screening">Diabetes Screening</option>
              <option value="Health Counseling">Health Counseling</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
            <select 
              value={bookingData.timeSlot}
              onChange={(e) => setBookingData({...bookingData, timeSlot: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select time</option>
              <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
              <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient Information</label>
        <textarea
          placeholder="Patient name, age, specific health concerns..."
            value={bookingData.patientInfo}
            onChange={(e) => setBookingData({...bookingData, patientInfo: e.target.value})}
          className="w-full p-3 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-purple-400"
            required
        />
      </div>

        <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold glow-button">
        Book Health Pod Appointment
      </button>
      </form>
  </BookingWrapper>
);
};

const BookingPages = () => {
  return (
    <Routes>
      <Route path="diagnostic-vans" element={<DiagnosticVansBooking />} />
      <Route path="telemedicine" element={<TelemedicineBooking />} />
      <Route path="health-pods" element={<HealthPodsBooking />} />
    </Routes>
  );
};

export default BookingPages;