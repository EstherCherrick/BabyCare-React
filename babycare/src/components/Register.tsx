import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, sendCode, verifyCode } from '../redux/UserSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [babyId, setBabyId] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [motherName, setMotherName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [parentPhone, setParentPhone] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [address, setAddress] = useState('');
    const [weight, setWeight] = useState<number | 0>();
    const [height, setHeight] = useState<number | 0>();
    const [gender, setGender] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [codeSent, setCodeSent] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error, isRegistered, isVerified } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (isRegistered && !codeSent) {
            dispatch(sendCode(parentEmail)).then(() => setCodeSent(true));
        }
    }, [isRegistered, parentEmail, codeSent, dispatch]);

    useEffect(() => {
        if (isVerified) {
            navigate('/userDashboard');
        }
    }, [isVerified, navigate]);

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGender(value === 'male');
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        const userData = {
            id: 0,
            babyId,
            name,
            birthdate,
            motherName,
            fatherName,
            parentPhone,
            parentEmail,
            address,
            weight,
            height,
            gender,
        };
        dispatch(registerUser(userData));
    };

    const handleCodeValidation = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        dispatch(verifyCode({ email: parentEmail, otp: otpCode }));
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = event.clipboardData.getData('Text').split('');
        if (pastedData.length === 6) {
            setOtp(pastedData);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">הרשמה</h2>
            {!codeSent ? (
                <form onSubmit={handleSignUp} className="row g-3">
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="תעודת זהות"
                            value={babyId}
                            onChange={(e) => setBabyId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="שם"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="date"
                            className="form-control"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="שם האם"
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="שם האב"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="טלפון הורה"
                            value={parentPhone}
                            onChange={(e) => setParentPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="אימייל הורה"
                            value={parentEmail}
                            onChange={(e) => setParentEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="כתובת"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="משקל"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="גובה"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <select className="form-select" onChange={handleGenderChange} required>
                            <option value="">בחר מגדר</option>
                            <option value="male">זכר</option>
                            <option value="female">נקבה</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'נרשם...' : 'הרשמה'}
                        </button>
                    </div>
                    {error && (
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    )}
                </form>
            ) : (
                <form onSubmit={handleCodeValidation}>
                    <label className="form-label">קוד אימות שנשלח למייל:</label>
                    <div className="d-flex justify-content-between mb-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                className="form-control text-center"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onPaste={handlePaste}
                                style={{ width: '50px', margin: '0 5px' }}
                            />
                        ))}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" disabled={loading}>אמת קוד</button>
                    </div>
                    {error && (
                        <div className="alert alert-danger text-center mt-3">{error}</div>
                    )}
                </form>
            )}
        </div>
    );
};

export default Register;
