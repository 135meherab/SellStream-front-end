import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { useAddemailMutation, useAddotpMutation, useAddpasswordMutation } from "../features/password_forget/password_top";

const Otp = () =>{

    const [otp,setOTp] = useState('');
    const [error, setError] = useState('');

    const[Addemai] = useAddemailMutation();
    const[Addotp] = useAddotpMutation();
    const[Addpasswordi] = useAddpasswordMutation();

     //set error
    useEffect(() => {
    if (responseError) {
      setError(responseError.error);
      toast.error(error);
    }
 
  }, [responseError,  error]);
}