import axios  from "axios";

const api=axios.create({
    baseURL: "https://localhost:7047/api"
});

//functions for login and registration
const checkUser=(id:string,email:string)=>{
   return api.post(`/Login/checkUser?id=${id}&email=${encodeURIComponent(email)}`)
};

const sendVerificationCode=(email:string)=>{
    return api.post(`/Login/sendVarificationCode?email=${encodeURIComponent(email)}`);
};

const validateCode=(email:string, otp:string)=>{
    return api.post(`/Login/validate?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
};

const register=(data:any)=>{
    return api.post(`/Babies/addBaby`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export { checkUser, sendVerificationCode, validateCode, register };