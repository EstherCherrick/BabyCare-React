import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from './authApi';
import { setTokenToCookie, setUserToCookie } from '../../utils/cookies';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();
    const [formData, setFormData] = useState({
        id: 0,
        babyId: '',
        name: '',
        birthdate: '',
        gender: false,
        fatherName: '',
        motherName: '',
        address: '',
        phone: '',
        email: '',
        weight: 0.0,
        height: 0.0,
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'gender' ? value === 'true' : name === 'weight' || name === 'height' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await register({
                id: formData.id, // שליחת id
                babyId: formData.babyId,
                name: formData.name,
                birthdate: formData.birthdate,
                motherName: formData.motherName, // שינוי שם למבנה הנדרש
                fatherName: formData.fatherName,
                parentPhone: formData.phone, // שינוי שם למבנה הנדרש
                parentEmail: formData.email, // שינוי שם למבנה הנדרש
                address: formData.address,
                weight: formData.weight,
                height: formData.height,
                gender: formData.gender, // שליחת מגדר
            }).unwrap();

            if (response.token) {
                setTokenToCookie(response.token);
                setUserToCookie(formData.email);
                navigate(`/otp-verification/${formData.email}`);
             } else {
            setError("Registration failed. Please try again.");
        }
    } catch (err: any) {
        setError(err.data?.message || "Registration error."); // Improved error handling
    }

    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input name="babyId" onChange={handleChange} placeholder="Baby ID" required />
                <input name="name" onChange={handleChange} placeholder="Name" required />
                <input name="birthdate" type="date" onChange={handleChange} required />
                <select name="gender" onChange={handleChange} value={formData.gender ? 'true' : 'false'} required>
                    <option value="" disabled>בחר מגדר</option>
                    <option value="true">זכר</option>
                    <option value="false">נקבה</option>
                </select>
                <input name="fatherName" onChange={handleChange} placeholder="Father's Name" required />
                <input name="motherName" onChange={handleChange} placeholder="Mother's Name" required />
                <input name="address" onChange={handleChange} placeholder="Address" required />
                <input name="phone" onChange={handleChange} placeholder="Phone" required />
                <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
                <input name="weight" type="number" step="0.01" onChange={handleChange} placeholder="Weight" required />
                <input name="height" type="number" step="0.01" onChange={handleChange} placeholder="Height" required />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;
