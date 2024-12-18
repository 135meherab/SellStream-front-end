import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';
import login_img from "../assets/Login.png"
// import '../Components/css/page.css'
// import {Emailinput} from './forget_password_otp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Example with FontAwesome icons
import axios from 'axios';


const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [login, {data, isLoading, error: responseError}] = useLoginMutation()


const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({ username, password });
      console.log(result)
      if (result.error) {
        // If login fails due to incorrect credentials or other reasons
        setError('Invalid username or password');
        toast.error(error || result.error.data.error);
      }
    } catch (error) {
      // Handle other unexpected errors
      setError('Logging Problem');
      // toast.error('Logging Problem');
    }
  };


useEffect(() => {
  if (responseError) {
    setError(responseError.data.error); 
    toast.error(responseError.data.error);
    
  }
  if (data?.token){
    const { token, user_info } = data;
    localStorage.setItem('auth', token);
    localStorage.setItem('user_info', JSON.stringify(user_info));


    dispatch(userLoggedIn({token, user_info}));
    if (user_info?.role === 'isadmin') {
      navigate('/admin-dashboard/main');
    } else if (user_info?.role === 'isbranch') {
      navigate('/branch-dashboard/main');
    } else if (user_info?.role === 'isowner') {
      navigate('/shop-dashboard/main');
    } else {
      navigate('/login');
    }

    toast.success('Login successful!');
  }
}, [data, navigate, responseError, dispatch]);
    
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};
  


  return (
    <div className="min-h-screen login-bg flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="login-card shadow-md rounded-lg p-8 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login</h2>
      <div className="login-c flex justify-between items-center">
        <div className="login-img">
          <img src={login_img} alt="Login illustration" />
        </div>
        <div className="w-80">
          <div className="flex justify-center gap-2 mb-4">
            <button
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80"
              onClick={() => {
                setUserName('Shamim01');
                setPassword('12345@##');
              }}
            >
              Click Login for User
            </button>
            <button
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80"
              onClick={() => {
                setUserName('Rony.Electronics.Jamuna.Electronics');
                setPassword('hpyjEtDN');
              }}
            >
              Click Login for Branch
            </button>
            {/* <button
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80"
              onClick={() => {
                setUserName('admin');
                setPassword('admin');
              }}
            >
              Click Login for Admin
            </button> */}
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="text-gray-700">
                User Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div className="mb-5 relative">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => togglePasswordVisibility('password')}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-80"
            >
              Login
            </button>
  
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75">
                <svg
                  className="animate-spin h-10 w-10 text-primary mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291l-2.829 2.828A10 10 0 0012 22v-2a8 8 0 01-6-2.709z"
                  ></path>
                </svg>
                <p className="text-primary font-bold">
                  Please wait 1 second to 1 minute...
                </p>
              </div>
            )}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm mb-1">
                Don't have an account?{' '}
                <a
                  href="/sign_up"
                  className="text-primary font-bold hover:underline"
                >
                  Sign Up
                </a>
              </p>
              <a
                className="hover:underline text-sm text-gray-600"
                href="/forget_password/"
              >
                Forgotten password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  
  );
  
};

export default Login;
