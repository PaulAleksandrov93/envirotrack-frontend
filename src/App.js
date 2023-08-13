import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ParametersListPage from './pages/ParametersListPage';
import ParametersPage from './pages/ParametersPage';

function App() {
  return (
    <Router>
      <div className="container root">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<ParametersListPage />} />
            <Route path="/parameter/:id" element={<ParametersPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;






