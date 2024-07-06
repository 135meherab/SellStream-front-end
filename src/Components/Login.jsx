import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Example with FontAwesome icons


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
      if (result.data.error) {
        // If login fails due to incorrect credentials or other reasons
        setError('Invalid username or password');
        toast.error(result.data.error);
      }
    } catch (error) {
      // Handle other unexpected errors
      setError('Logging Problem');
      toast.error('Logging Problem');
    }
  };


useEffect(() => {
  if (responseError?.data) {
    setError(responseError.error); 
    toast.error(responseError.error);
    
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
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">User Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <div className='relative'>
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
              <FontAwesomeIcon icon={showPassword ? faEye: faEyeSlash } />
            </button>
          </div>
        </div>
        <button disabled={isLoading} type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-80">
          Login
        </button>
  
        {error && <p className='text-red-500 text-center'>{error}</p>}
  
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
          Don't have an account?{' '}
          <a href="/sign_up" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
      </form>
    </div>
  </div>
  
  );
  
};

export default Login;
