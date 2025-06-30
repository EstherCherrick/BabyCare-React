import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faHeartbeat, faClipboardList,faUser,faInfoCircle,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import logo from '../../public/logo-tipat-halav.svg';

const Home: React.FC = () => {
    return (
<div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center">
      <img src={logo} alt="טיפת חלב" className="logo" />
      <span className="navbar-brand ms-2 fw-bold" style={{fontSize: '1.5rem', color: '#81c784'}}>טיפת חלב</span>
    </div>
    <ul className="navbar-nav flex-row">
      <li className="nav-item mx-2">
        <Link to="/login" className="nav-link">
          <FontAwesomeIcon icon={faUser} /> אזור אישי
        </Link>
      </li>
      <li className="nav-item mx-2">
        <Link to="/contact" className="nav-link">
          <FontAwesomeIcon icon={faEnvelope} /> צור קשר
        </Link>
      </li>
      <li className="nav-item mx-2">
        <Link to="/about" className="nav-link">
          <FontAwesomeIcon icon={faInfoCircle} /> עלינו
        </Link>
      </li>
    </ul>
  </nav>
    
            <h1 className="text-center mt-4">ברוכים הבאים לטיפת חלב</h1>
            <p className="text-center">מרפאה להתפתחות התינוק שלכם</p>

            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faBaby} size="3x" />
                            <h5 className="card-title mt-3">מעקב התפתחותי</h5>
                            <p className="card-text">מעקב אחרי התפתחות התינוק בכל שלב</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faHeartbeat} size="3x" />
                            <h5 className="card-title mt-3">בריאות התינוק</h5>
                            <p className="card-text">שירותים רפואיים לתינוקות בכל גיל</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faClipboardList} size="3x" />
                            <h5 className="card-title mt-3">מידע והכוונה</h5>
                            <p className="card-text">מידע חשוב להורים על התפתחות תינוקות</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
