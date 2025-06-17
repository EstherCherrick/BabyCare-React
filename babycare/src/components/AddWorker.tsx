import React, { useState } from 'react';
import axios from 'axios';
import './AddWorker.css';



//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault(); // מונע את השליחה הברירת מחדל של הטופס
//         try {
//             await axios.post('/api/WorkerManagement', worker);
//             alert('עובד נוסף בהצלחה!');
//         } catch (error) {
//             console.error('Error adding worker', error);
//         }
//     };

//     return (
//         <div className="add-worker">
//             <h2>הוספת עובד</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="name" placeholder="שם" onChange={handleChange} />
//                 <input type="text" name="role" placeholder="תפקיד" onChange={handleChange} />
//                 <button type="submit">הוסף עובד</button>
//             </form>
//         </div>
//     );
// };

const AddWorker = () => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // מונע את השליחה הברירת מחדל של הטופס
        try {
            await axios.post('http://localhost:5234/api/WorkerManagement', worker);
            alert('עובד נוסף בהצלחה!');
        } catch (error) {
            console.error('Error adding worker', error);
        }
    };
    // const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const response = await fetch('/api/WorkerManagement', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(worker),
    //     });
        
    //     if (response.ok) {
    //         // טיפול בהצלחה
    //         console.log('Worker added successfully');
    //     } else {
    //         // טיפול בשגיאה
    //         console.error('Error adding worker:', response.statusText);
    //     }
    // };

    return (
        <form onSubmit={handleSubmit} className="add-worker-form">
            <h1>הוסף עובד</h1>
            <input type="text" placeholder="workerId" required onChange={(e) => setWorker({ ...worker, workerId: e.target.value })} />
            <input type="text" placeholder="שם" required onChange={(e) => setWorker({ ...worker, name: e.target.value })} />
            <input type="date" placeholder="תאריך לידה" required onChange={(e) => setWorker({ ...worker, birthdate: e.target.value })} />
            <input type="text" placeholder="טלפון" required onChange={(e) => setWorker({ ...worker, phone: e.target.value })} />
            <input type="email" placeholder="אימייל" required onChange={(e) => setWorker({ ...worker, email: e.target.value })} />
            <input type="text" placeholder="סוג עובד" required onChange={(e) => setWorker({ ...worker, workerType: e.target.value })} />
            <input type="date" placeholder="תאריך התחלה" required onChange={(e) => setWorker({ ...worker, startDate: e.target.value })} />
            <input type="number" placeholder="ניסיון" required onChange={(e) => setWorker({ ...worker, experience: parseInt(e.target.value) })} />
            <button type="submit">שמור</button>
        </form>
    );
};

export default AddWorker;
