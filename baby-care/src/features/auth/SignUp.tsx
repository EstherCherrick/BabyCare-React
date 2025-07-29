import React, { useState } from "react";
import { useRegisterMutation } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/authSlice";
import OtpVerification from "./OtpVerification";
import '../../styles/login.css';
import '../../styles/global.css';

const SignUp: React.FC = () => {
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    id: 0,
    babyId: "",
    name: "",
    birthdate: "",
    gender: false,
    fatherName: "",
    motherName: "",
    address: "",
    phone: "",
    email: "",
    weight: 0.0,
    height: 0.0,
  });
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gender" ? value === "true" : name === "weight" || name === "height" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register({
        id: formData.id,
        babyId: formData.babyId,
        name: formData.name,
        birthdate: formData.birthdate,
        motherName: formData.motherName,
        fatherName: formData.fatherName,
        parentPhone: formData.phone,
        parentEmail: formData.email,
        address: formData.address,
        weight: formData.weight,
        height: formData.height,
        gender: formData.gender,
      }).unwrap();

      if (response.token) {
        dispatch(setCredentials({ user: formData.email, token: response.token, userType: "regularUser" }));
        setMessage("קוד אימות נשלח אליך ברגעים אלו");
        setIsOtpVisible(true);
      }
    } catch (err: any) {
      setError(err.data?.message || "Registration error.");
    }
  };

  return (
    <div className="signup-card">
      
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input name="babyId" onChange={handleChange} placeholder="Baby ID" required />
          <input name="name" onChange={handleChange} placeholder="Name" required />
        </div>
        <div className="form-row">
          <input name="birthdate" type="date" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} value={formData.gender ? "true" : "false"} required>
            <option value="" disabled>בחר מגדר</option>
            <option value="true">זכר</option>
            <option value="false">נקבה</option>
          </select>
        </div>
        <div className="form-row">
          <input name="fatherName" onChange={handleChange} placeholder="Father's Name" required />
          <input name="motherName" onChange={handleChange} placeholder="Mother's Name" required />
        </div>
        <div className="form-row">
          <input name="address" onChange={handleChange} placeholder="Address" required />
          <input name="phone" onChange={handleChange} placeholder="Phone" required />
        </div>
        <div className="form-row">
          <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
          <input name="weight" type="number" step="0.01" onChange={handleChange} placeholder="Weight" required />
        </div>
        <div className="form-row">
          <input name="height" type="number" step="0.01" onChange={handleChange} placeholder="Height" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
            {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      {isOtpVisible && <OtpVerification email={formData.email} />}
      <p><Link to="/login">sign in</Link></p>    
       </div>
  );
};

export default SignUp;
