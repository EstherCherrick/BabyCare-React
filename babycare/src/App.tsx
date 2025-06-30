import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import Home from './components/Home';
import UserDashboard from './components/UserDashboard';
import Register from './components/Register';
import Footer from './components/Footer';
import '../src/styles/global.css';
import AppointmentPage from './pages/AppointmentPage';
import './App.css';
import WorkerManagementPage from './pages/WorkerManagementPage';
import AddWorker from './components/AddWorker';
import UpdateWorker from './components/UpdateWorker';



const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
