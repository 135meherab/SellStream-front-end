import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import otp_img from "../assets/otp_img.png"
// import { Routes, Route, Link } from 'react-router-dom';
import {useAddotpMutation} from "../features/password_forget/password_top";
import { toast } from "react-toastify";
import '../Components/css/page.css'


const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const[AddOtp, { isLoading, error: responseError }] = useAddotpMutation();

  useEffect(() => {
    if (responseError) {
      setError(responseError.data.error);
      toast.error(responseError.data.error);
    }
 
  }, [responseError]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '') {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };
  const handleVerify = async () => {
    const otpCode = otp.join('');
    try {
      await AddOtp({ otp: otpCode }).unwrap();
      toast.success("OTP verified successfully");
      navigate('/new_password/'); // Redirect to password reset page
    } catch (err) {
      setError(err.data.error)
    }
  };

 
  return (
    <div className="otp-bg min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16">
      <div className="otp_card rounded-lg  flex justify-between p-6  shadow-lg relative">
        <div className="otp_image flex justify-items-center justify-center m-auto">
          <img src={otp_img} alt="" />
        </div>
        <div className="otp-verificaton w-80  p-8  rounded-lg shadow-lg  pt-20   m-auto  border ">
          <h2 className="text-2xl font-semibold text-center mb-4">OTP Verification</h2>
          <p className="text-center mb-6">Enter OTP Code sent to your mail</p>
          <div className="flex justify-center mb-6 ">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                maxLength="1"
                className={`otp_input  w-10 h-10 border border-gray-300 text-center text-lg mx-1 rounded ${digit ? 'bg-gray-200' : 'bg-white'}`}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
    
        <button
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded"
          onClick={handleVerify}
        >
          Verify & Proceed
        </button>
        <p className="text-center mt-4">
          Didn’t receive OTP code? <button className="text-blue-500 underline">Resend Code</button>
        </p>
      </div>
      </div>
    </div>
  );
};

export default OTPVerification;