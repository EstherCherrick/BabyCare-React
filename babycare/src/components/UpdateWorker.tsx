import React, { useState } from 'react';
import axios from 'axios';
import './UpdateWorker.css';

const UpdateWorker = () => {
    const [worker, setWorker] = useState({
        workerId: '',
        name: '',
        birthdate: '',
        phone: '',
        email: '',
        workerType: '',
        startDate: '',
        experience: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWorker({ ...worker, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`/api/WorkerManagement/${worker.workerId}`, worker);
            alert('העובד עודכן בהצלחה!');
        } catch (error) {
            console.error('Error updating worker', error);
        }
    };

    return (
        <div className="update-worker">
            <h2>עדכון עובד</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="workerId" placeholder="מזהה עובד" onChange={handleChange} />
                <input type="text" name="name" placeholder="שם" onChange={handleChange} />
                <input type="text" name="phone" placeholder="טלפון" onChange={handleChange} />
                <input type="email" name="email" placeholder="אימייל" onChange={handleChange} />
                <input type="text" name="workerType" placeholder="סוג עובד" onChange={handleChange} />
                <input type="date" name="birthdate" placeholder="תאריך לידה" onChange={handleChange} />
                <input type="date" name="startDate" placeholder="תאריך התחלה" onChange={handleChange} />
                <input type="number" name="experience" placeholder="ניסיון" onChange={handleChange} />
                <button type="submit">עדכן עובד</button>
            </form>
        </div>
    );
};

export default UpdateWorker;
