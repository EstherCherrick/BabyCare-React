import React from 'react';
import AppointmentPage from './pages/AppointmentPage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkerManagementPage from './pages/WorkerManagementPage';
import AddWorker from './components/AddWorker';
import UpdateWorker from './components/UpdateWorker';



function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to BabyCare</h1>
        <Routes>
          <Route path="/" element={<WorkerManagementPage />} />
          <Route path="/add-worker" element={<AddWorker />} />
          <Route path="/update-worker" element={<UpdateWorker />} />
        </Routes>
        <AppointmentPage />
      </div>
    </Router>
  );
}

export default App;
