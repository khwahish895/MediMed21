import React, { createContext, useContext, useState, useEffect } from 'react';

const MockAuthContext = createContext();

export const useAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Mock users for development
  const mockUsers = [
    { email: 'patient@test.com', password: '123456', name: 'John Patient', role: 'patient' },
    { email: 'doctor@test.com', password: '123456', name: 'Dr. Sarah Smith', role: 'doctor' },
    { email: 'nurse@test.com', password: '123456', name: 'Nurse Mary', role: 'nurse' },
    { email: 'admin@test.com', password: '123456', name: 'Admin User', role: 'admin' }
  ];

  // Mock signup function
  const signup = async (email, password, name, role) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create mock user
      const newUser = {
        uid: Date.now().toString(),
        email,
        displayName: name,
        role
      };

      // Add to mock users
      mockUsers.push({ email, password, name, role });

      setCurrentUser(newUser);
      setUserRole(role);
      
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // Mock login function
  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const mockUser = {
        uid: Date.now().toString(),
        email: user.email,
        displayName: user.name,
        role: user.role
      };

      setCurrentUser(mockUser);
      setUserRole(user.role);
      
      return mockUser;
    } catch (error) {
      throw error;
    }
  };

  // Mock logout function
  const logout = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserRole(user.role);
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mockUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mockUser');
    }
  }, [currentUser]);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    loading
  };

  return (
    <MockAuthContext.Provider value={value}>
      {!loading && children}
    </MockAuthContext.Provider>
  );
}; 