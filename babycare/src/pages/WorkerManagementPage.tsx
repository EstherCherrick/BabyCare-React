import React from 'react';
import { Link } from 'react-router-dom';
import './WorkerManagementPage.css'

const WorkerManagementPage = () => {
    return (
        <div className="worker-management">
            <h1>ניהול עובדים</h1>
            <ul>
                <li><Link to="/add-worker">הוספת עובד</Link></li>
                <li><Link to="/update-worker">עדכון עובד</Link></li>
                <li><Link to="/delete-worker">מחיקת עובד</Link></li>
                <li><Link to="/view-workers">צפייה בעובדים</Link></li>
            </ul>
        </div>
    );
};

export default WorkerManagementPage;
