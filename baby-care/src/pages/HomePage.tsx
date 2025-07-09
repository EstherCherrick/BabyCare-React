import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const navigateToPersonalArea = () => {
    navigate('/login'); // Navigate to the personal area (login page)
  };
   const navigateToWorkersDashboard = () => {
    navigate('/workers');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ fontSize: '2.5em', color: '#333' }}>ברוכים הבאים לטיפת חלב</h1>
      <p style={{ fontSize: '1.2em', color: '#666' }}>מרפאה להתפתחות התינוק שלכם</p>
      <button 
        onClick={navigateToPersonalArea} >
        אזור אישי
      </button>
       <button onClick={navigateToWorkersDashboard} style={{ marginRight: '10px' }}>
          ניהול עובדים
        </button>
    </div>
  );
};

export default Home;
