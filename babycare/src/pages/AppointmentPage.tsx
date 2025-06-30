import React from 'react';
import AppointmentBooking from '../components/AppointmentBooking';


import './AppointmentPage.css'; // ייבוא קובץ ה-CSS

const AppointmentPage = () => {
    return (
        <div className="appointment-page">
            <AppointmentBooking />
        </div>
    );
};

export default AppointmentPage;


