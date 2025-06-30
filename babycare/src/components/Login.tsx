import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserThunk, sendCode, verifyCode } from '../redux/UserSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id, email, userExists, loading, error, isVerified } = useSelector((state: RootState) => state.user);
    const [inputId, setInputId] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [codeSent, setCodeSent] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userExists === false) {
            navigate('/register');
        } else if (userExists === true && !codeSent) {
            dispatch(sendCode(inputEmail)).then(() => setCodeSent(true));
        }
    }, [userExists, inputEmail, codeSent, dispatch, navigate]);

    useEffect(() => {
        if (isVerified) {
            navigate('/userDashboard');
        }
    }, [isVerified, navigate]);

    const handleUserExistance = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(checkUserThunk({ id: inputId, email: inputEmail }));
    };

    const handleCodeValidation = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        dispatch(verifyCode({ email: inputEmail, otp: otpCode }));
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
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f4fafd' }}>
            <div className="card" style={{ width: '400px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)', backgroundColor: '#fff' }}>
                <h1 className="text-center mt-4" style={{ color: '#1976d2' }}>התחברות</h1>
                <div className="card-body">
                    {!codeSent ? (
                        <form onSubmit={handleUserExistance}>
                            <div className="mb-3">
                                <label className="form-label">תעודת זהות:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="הכנס תעודת זהות"
                                    value={inputId}
                                    onChange={(e) => setInputId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">אימייל:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="הכנס אימייל"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginRight: '10px' }}>שלח לי קוד אימות</button>
                                <Link to="/register" className="btn btn-outline-primary">הרשמה</Link>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleCodeValidation}>
                            <label className="form-label">קוד אימות:</label>
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
                        </form>
                    )}
                    {(error || message) && <div className="alert alert-danger text-center mt-3">{error || message}</div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
