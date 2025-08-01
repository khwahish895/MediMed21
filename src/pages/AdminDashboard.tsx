import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/MockAuthContext.tsx';

import { 
  Shield, 
  Users, 
  Truck, 
  Phone, 
  AlertTriangle,
  Settings,
  Home,
  BarChart3,
  MapPin,
  FileText,
  Bell,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedTab, setSelectedTab] = useState('patients');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'vans', label: 'Vans', icon: Truck },
    { id: 'teleconsult-logs', label: 'Teleconsult Logs', icon: Phone },
    { id: 'appointments', label: 'Appointments', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'ai-reports', label: 'AI Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const kpis = [
    { label: 'Total Patients', value: '2,847', icon: Users, color: 'blue', change: '+12%' },
    { label: 'Active Vans', value: '23', icon: Truck, color: 'green', change: '+2' },
    { label: 'Daily Consults', value: '156', icon: Phone, color: 'purple', change: '+8%' },
    { label: 'SOS Alerts Today', value: '3', icon: AlertTriangle, color: 'red', change: '-2' }
  ];

  const vanData = [
    { id: 'VAN001', driver: 'Rajesh Kumar', zone: 'Ranchi North', status: 'Active', patients: 12, eta: '15 mins', location: 'Ranchi Village' },
    { id: 'VAN002', driver: 'Priya Sharma', zone: 'Gumla West', status: 'En Route', patients: 8, eta: '32 mins', location: 'Moving to Khunti' },
    { id: 'VAN003', driver: 'Amit Singh', zone: 'Khunti East', status: 'Maintenance', patients: 0, eta: 'N/A', location: 'Service Center' }
  ];

  const userData = {
    patients: [
      { name: 'Rahul Sharma', age: 32, location: 'Ranchi', lastVisit: '2024-12-15', status: 'Active' },
      { name: 'Priya Devi', age: 45, location: 'Gumla', lastVisit: '2024-12-14', status: 'Active' },
      { name: 'Amit Kumar', age: 28, location: 'Khunti', lastVisit: '2024-12-13', status: 'Inactive' }
    ],
    doctors: [
      { name: 'Dr. Priya Sharma', specialty: 'General Medicine', patients: 45, rating: 4.8, status: 'Available' },
      { name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', patients: 32, rating: 4.9, status: 'Busy' },
      { name: 'Dr. Sunita Rao', specialty: 'Pediatrics', patients: 28, rating: 4.7, status: 'Available' }
    ],
    nurses: [
      { name: 'Nurse Sunita', zone: 'Ranchi', patients: 18, reports: 12, status: 'On Duty' },
      { name: 'Nurse Kavita', zone: 'Gumla', patients: 15, reports: 10, status: 'On Duty' },
      { name: 'Nurse Rekha', zone: 'Khunti', patients: 12, reports: 8, status: 'Off Duty' }
    ]
  };

  const emergencyAlerts = [
    { id: 1, patient: 'Ramesh Yadav', type: 'Cardiac Emergency', time: '10:30 AM', status: 'Responding', responder: 'VAN001' },
    { id: 2, patient: 'Sita Devi', type: 'Accident', time: '11:45 AM', status: 'Resolved', responder: 'VAN002' },
    { id: 3, patient: 'Mohan Singh', type: 'Breathing Issue', time: '2:15 PM', status: 'Pending', responder: 'Assigning...' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': case 'Available': case 'On Duty': case 'Resolved': return 'text-green-600 bg-green-100';
      case 'Busy': case 'En Route': case 'Responding': return 'text-yellow-600 bg-yellow-100';
      case 'Inactive': case 'Off Duty': case 'Maintenance': case 'Pending': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleViewAllAlerts = () => {
    alert('Opening all emergency alerts...');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex">
      {/* Sidebar */}
      <div className="w-64 sidebar-glass min-h-screen p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">Admin Portal</span>
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
                    ? 'bg-orange-500 text-white shadow-lg' 
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
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Healthcare System Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">System Status</p>
              <p className="font-semibold text-green-600">All Systems Operational</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${kpi.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    kpi.change.includes('+') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{kpi.label}</p>
                <p className="text-3xl font-bold text-gray-800">{kpi.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analytics Panel */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Analytics Dashboard</h3>
              
              {/* Chart Placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 h-48 flex items-center justify-center">
                  <div className="text-center text-blue-600">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Appointments/Week</p>
                    <p className="text-sm">Line Graph by Region</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 h-48 flex items-center justify-center">
                  <div className="text-center text-green-600">
                    <Users className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Doctor:Nurse Ratio</p>
                    <p className="text-sm">Pie Chart Distribution</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 rounded-lg p-6 h-32 flex items-center justify-center">
                <div className="text-center text-purple-600">
                  <Activity className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Illness Heatmap by Village</p>
                </div>
              </div>
            </div>

            {/* User Management Table */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
                <div className="flex space-x-2">
                  {['patients', 'doctors', 'nurses'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${
                        selectedTab === tab 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {selectedTab === 'patients' && (
                        <>
                          <th className="text-left py-3 text-gray-600">Name</th>
                          <th className="text-left py-3 text-gray-600">Age</th>
                          <th className="text-left py-3 text-gray-600">Location</th>
                          <th className="text-left py-3 text-gray-600">Last Visit</th>
                          <th className="text-left py-3 text-gray-600">Status</th>
                        </>
                      )}
                      {selectedTab === 'doctors' && (
                        <>
                          <th className="text-left py-3 text-gray-600">Name</th>
                          <th className="text-left py-3 text-gray-600">Specialty</th>
                          <th className="text-left py-3 text-gray-600">Patients</th>
                          <th className="text-left py-3 text-gray-600">Rating</th>
                          <th className="text-left py-3 text-gray-600">Status</th>
                        </>
                      )}
                      {selectedTab === 'nurses' && (
                        <>
                          <th className="text-left py-3 text-gray-600">Name</th>
                          <th className="text-left py-3 text-gray-600">Zone</th>
                          <th className="text-left py-3 text-gray-600">Patients</th>
                          <th className="text-left py-3 text-gray-600">Reports</th>
                          <th className="text-left py-3 text-gray-600">Status</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(userData as any)[selectedTab].map((user: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 font-medium text-gray-800">{user.name}</td>
                        <td className="py-4 text-gray-600">
                          {selectedTab === 'patients' && user.age}
                          {selectedTab === 'doctors' && user.specialty}
                          {selectedTab === 'nurses' && user.zone}
                        </td>
                        <td className="py-4 text-gray-600">
                          {selectedTab === 'patients' && user.location}
                          {selectedTab === 'doctors' && user.patients}
                          {selectedTab === 'nurses' && user.patients}
                        </td>
                        <td className="py-4 text-gray-600">
                          {selectedTab === 'patients' && user.lastVisit}
                          {selectedTab === 'doctors' && `⭐ ${user.rating}`}
                          {selectedTab === 'nurses' && user.reports}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Van Tracker Map */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Van Tracker</h3>
              
              <div className="bg-blue-100 rounded-lg h-48 flex items-center justify-center mb-4">
                <div className="text-center text-blue-800">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Live Van Locations</p>
                  <p className="text-sm">Interactive Map View</p>
                </div>
              </div>

              <div className="space-y-3">
                {vanData.map((van, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{van.id}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(van.status)}`}>
                        {van.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Driver: {van.driver}</p>
                    <p className="text-sm text-gray-600">Zone: {van.zone}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>{van.patients} patients</span>
                      <span>ETA: {van.eta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Feed */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Feed</h3>
              
              <div className="space-y-3">
                {emergencyAlerts.map((alert) => (
                  <div key={alert.id} className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800">{alert.patient}</h4>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <p className="text-sm text-red-600 mb-2">{alert.type}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      <span className="text-gray-600">{alert.responder}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleViewAllAlerts}
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
              >
                View All Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;