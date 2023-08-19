import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import ParametersListPage from './pages/ParametersListPage';
import ParametersPage from './pages/ParametersPage';

function App() {
  const isAuthenticated = false;
  return (
    <Router>
      <div className="container root">
        <div className="app">
          <AuthProvider>
            <Header />
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <ParametersListPage /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/parameter/:id" element={<ParametersPage />} />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;






