

import React, { useState } from 'react';
import './AppointmentBooking.css'; // ייבוא קובץ ה-CSS

const AppointmentBooking = () => {
    const [patientName, setPatientName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    const handleSubmit = async () => {
   
        const appointmentData = { patientName, appointmentDate, appointmentTime };

        try {
            const response = await fetch('https://your-api-url/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // כאן תוכל להוסיף התנהגות לאחר ההצלחה, כמו רענון הרשימה או הודעת הצלחה
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="appointment-booking">
            <h2>קביעת תור חדש</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="שם המטופל" 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={appointmentDate} 
                    onChange={(e) => setAppointmentDate(e.target.value)} 
                    required 
                />
                <input 
                    type="time" 
                    value={appointmentTime} 
                    onChange={(e) => setAppointmentTime(e.target.value)} 
                    required 
                />
                <button type="submit">קבע תור</button>
            </form>
        </div>
    );
};

export default AppointmentBooking;
