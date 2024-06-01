import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useLoginWithGoogleMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import google from '../assets/google.png'
import fb from '../assets/fb.jpg'
import GoogleLogin from 'react-google-login';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
const [login, {data, isLoading, error: responseError}] = useLoginMutation()
const [loginWithGoogle] = useLoginWithGoogleMutation()

const handleLogin = async(e) => {
  e.preventDefault();
  setError('');

 try  {
  login({ username, password });
  
 }catch(error){
  setError(error) || 'Logging Problem';
  toast.error(error);
 }

 };
 const handleGoogleLoginSuccess = async (response) => {
  const { tokenId } = response;
  try {
    await loginWithGoogle({ tokenId });
  } catch (error) {
    setError(error.message || 'Google Login Problem');
    toast.error(error.message);
  }
};

const handleGoogleLoginFailure = (error) => {
  setError('Google Login Failed');
  toast.error('Google Login Failed');
};

useEffect(() => {
  if (responseError?.data) {
    setError(responseError.error); 
    
  }
  if (data?.token){
    let token = localStorage.getItem('auth')
    dispatch(userLoggedIn({token: token}))
    navigate('/dashboard/main')
    // navigate('/home')
  toast.success('Login successful!');

  }
}, [data, navigate, responseError, dispatch]);
    
  


  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login</h2>
        <form onSubmit={handleLogin}>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button disabled={isLoading} type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-80">Login</button>
          <div className="login flex space-x-3 justify-center items-center my-5">
            {/* <div className="google cursor-pointer  " >
            <GoogleLogin
              clientId="AIzaSyCVoRi6LYNzjE64_8uN_4jpcnEYWRZht6A"
              buttonText="Login with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <div className="google cursor-pointer" onClick={renderProps.onClick}>
                  <img src={google} alt="google icon" width='40px'/>
                </div>
              )}
            />
            </div> */}
            <div className="google cursor-pointer ">
              <img src={fb} alt="fb icon" width='40px'/>
            </div>
          </div>
          {
            error !== '' && <p className='text-red-500 text-center'>{error}</p> 
          }
          {
            isLoading && <p className='text-green-500 bg-green-200 text-center'>Loading...</p>
          }

        </form>
      </div>
    </div>
  );
};

export default Login;
