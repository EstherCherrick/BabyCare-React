// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout as logoutAction } from "../app/authSlice";
// import { useLogoutMutation } from "../api/authApi";
// import { RootState } from "../app/store";

// const Home: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [logout] = useLogoutMutation();
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   const userType = useSelector((state: RootState) => state.auth.userType);

//   const navigateToPersonalArea = () => {
//     if (isAuthenticated) {
//       if (userType === "regularUser") navigate("/user-dashboard");
//       else if (userType === "worker") navigate("/worker-dashboard");
//       else if (userType === "admin") navigate("/admin-dashboard");
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout({}).unwrap();
//       dispatch(logoutAction());
//       alert("Logout successful.");
//     } catch (error) {
//       alert("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>ברוכים הבאים לטיפת חלב</h1>
//       <p>מרפאה להתפתחות התינוק שלכם</p>
//       <button onClick={navigateToPersonalArea}>אזור אישי</button>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };
// // export default Home;
// import React from 'react';
// import '../styles/home.css'; // Assuming you have a CSS file for styles
// import babyGif from '../assets/baby.gif'; // Direct import

// interface Service {
//   title: string;
//   description: string;
//   imagePath: string;
// }

// const services: Service[] = [
//   {
//     title: 'מעקב התפתחותי',
//     description: 'שירות זה מספק מידע על התפתחות התינוק שלך בכל שלב.',
//     imagePath: babyGif,
//   },
//   {
//     title: 'חיסונים',
//     description: 'מידע על חיסונים חיוניים לתינוקות ולילדים.',
//     imagePath: babyGif,
//   },
//   {
//     title: 'ייעוץ תזונתי',
//     description: 'עצות על תזונה נכונה ובריאה לתינוקות.',
//     imagePath: babyGif,
//   },
//   {
//     title: 'ייעוץ שינה',
//     description: 'עזרה בהקניית הרגלי שינה בריאים לתינוקות.',
//     imagePath: babyGif,
//   },
// ];

// const Home: React.FC = () => {
//   return (
//     <div className="homepage-container">
//       <h1>ברוכים הבאים למרפאת התינוקות שלנו</h1>
//       <div className="services">
//         {services.map((service, index) => (
//           <div className="service-card" key={index}>
//             <img src={service.imagePath} alt={service.title} className="service-image" />
//             <h2>{service.title}</h2>
//             <p>{service.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;import React from "react";import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../app/authSlice";
import { useLogoutMutation } from "../api/authApi";
import { RootState } from "../app/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faSyringe, faOtter, faCarriageBaby } from '@fortawesome/free-solid-svg-icons';
import { JSX } from "react";
import { useNavigate } from "react-router-dom";

interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
}

const services: Service[] = [
  {
    title: 'מעקב התפתחותי',
    description: 'שירות זה מספק מידע על התפתחות התינוק שלך בכל שלב.',
    icon: <FontAwesomeIcon icon={faBaby} size="3x" />,
  },
  {
    title: 'חיסונים',
    description: 'מידע על חיסונים חיוניים לתינוקות ולילדים.',
    icon: <FontAwesomeIcon icon={faSyringe} size="3x" />,
  },
  {
    title: 'ייעוץ תזונתי',
    description: 'עצות על תזונה נכונה ובריאה לתינוקות.',
    icon: <FontAwesomeIcon icon={faOtter} size="3x" />, // Updated to baby bottle
  },
  {
    title: 'ייעוץ שינה',
    description: 'עזרה בהקניית הרגלי שינה בריאים לתינוקות.',
    icon: <FontAwesomeIcon icon={faCarriageBaby} size="3x" />, // Updated to cradle
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userType = useSelector((state: RootState) => state.auth.userType);

  const navigateToPersonalArea = () => {
    if (isAuthenticated) {
      if (userType === "regularUser") navigate("/user-dashboard");
      else if (userType === "worker") navigate("/worker-dashboard");
      else if (userType === "admin") navigate("/admin-dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(logoutAction());
      alert("Logout successful.");
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="homepage-container">
      <div className="navbar">
        <button className="signin-button" onClick={navigateToPersonalArea}>
          {isAuthenticated ? "אזור אישי" : "התחבר"}
        </button>
        {isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
      <div className="services">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
