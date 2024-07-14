
import React, { useState, useEffect } from 'react';
import { useAddUserMutation } from '../features/user/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import singup_img from "../assets/sign_up.png"
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Example with FontAwesome icons

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError,setEmailError] = useState('')
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [addUser, { isLoading, error: responseError }] = useAddUserMutation();
  const navigate = useNavigate(); // Include navigate for navigation

  const handleUsernameChange = (e) =>{
    const {value} = e.target;
    if (value.includes(' ')){
      setUsernameError('Username should not contain spaces.');
    }
    else{
      setUsernameError(''); // Clear the error when there are no spaces
    }
    setUsername(value);
  }
  
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password && password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    if (responseError) {
      setError(responseError.data.error);
    }
  }, [responseError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.includes(' ')){
      setError('Username should not contain spaces.')
      toast.error('Username should not contain spaces.')
      return
    }
    if (!email.endsWith(".com")) {
      setEmailError("Email must end with .com");
      return;
    } 
    if (password !== confirm_password) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    const newUser = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirm_password
    };
    
    try {
      await addUser(newUser).unwrap();
     
      toast.success('Registration successful. Check your mail for confirmation');
      setError('');
      navigate('/login'); // Navigate to login page after successful signup
    } catch (err) {
        setError(err.data?.error || 'An error occurred');
        toast.error(err.data?.error || 'An error occurred');
    }
  };
  const togglePasswordVisibility = (field) => {
    if ( field === "password"){
      setShowPassword(!showPassword);
    }
    else if(field === "confirm_password"){
      setShowConfirmPassword(!showConfirmPassword)
    }
  };
  // bg-gray-700
  return (
    <div className=" signup_bg flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-4 pb-4">
      <div className="signup_card  p-8 rounded-lg shadow-lg   relative">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>} {/* Display error */}
        <div className='signup_crd flex justify-center items-center'>
          <div className='sign_img flex  justify-center'>
            <img src={singup_img} alt="" />
          </div>
          <div className='input-form  lg:w-96 lg:pl-4 sm:pl-2 sm:w-96'>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className=" text-gray-700 text-sm font-bold "
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              {usernameError && <p className="text-red-500 text-xs italic">{usernameError}</p>}
            </div>
            <div className="mb-3">
              <label
                className=" text-gray-700 text-sm font-bold "
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                id="firstname"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className=" text-gray-700 text-sm font-bold"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                id="lastname"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className=" text-gray-700 text-sm font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>
            <div className="mb-3 relative ">
              <label
                className=" text-gray-700 text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <div className='relative '>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2"
                onClick={() => togglePasswordVisibility('password')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <FontAwesomeIcon icon={showPassword ? faEye: faEyeSlash } />
              </button>
              </div>
            </div>
            <div className="mb-3 relative">
            <label
                className=" text-gray-700 text-sm font-bold "
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className='relative'>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={handleConfirmPasswordChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2"
                onClick={() => togglePasswordVisibility('confirm_password')}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEye: faEyeSlash } />
              </button>
              </div>
              {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
              >
                Sign Up
              </button>
              
            </div>
                {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75">
                  <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291l-2.829 2.828A10 10 0 0012 22v-2a8 8 0 01-6-2.709z"></path>
                  </svg>
                  <p className='text-primary font-bold'>Please wait 1 second to 1 minute...</p>
                </div>
              )}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
};

export default SignUp;

