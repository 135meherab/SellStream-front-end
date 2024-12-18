import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {  useAddpasswordMutation } from "../../features/password_forget/password_top";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import newpassword_img from "../../assets/new_password.png"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Example with FontAwesome icons

const Newpassword = ({email}) =>{
    // const [email,setEmail] = useState();
    const [password,setPassword] = useState('');
    const [confirm_password,setConfirm_password] = useState('');
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const[Addpassword, { isLoading, error: responseError }] = useAddpasswordMutation();
    const navigate = useNavigate();

     //set error
     useEffect(() => {
      if (responseError) {
        setError(responseError.data.error);
        toast.error(responseError.data.error);
      }
    }, [responseError]);

    const handleConfirmPasswordChange = (e) => {
      setConfirm_password(e.target.value);
      if (e.target.value !== password && password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    };

    const handlePasswordChange = async (e) => {
      e.preventDefault();
      try {
        const response = await Addpassword({email:email, new_password: password, confirm_new_password: confirm_password }).unwrap();
        // Handle successful password change here, e.g., redirect or show a success message.
        toast.success(response.message);
        navigate('/login/');
      } catch (err) {
        // Handle error if needed, though responseError should cover this.
        // console.log(err)
        setError(err.data?.error || 'An error occurred');
      }
    };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};
  return(
    <div className="min-h-screen login-bg flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="newpassword-card  shadow-md rounded-lg p-8 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Create New password</h2>
      <div className='newpassword-c  flex justify-between items-center '>
        <div className='newpassword-img'>
          <img src={newpassword_img} alt="" />
        </div>
      <div className='w-80'>
        <form onSubmit={handlePasswordChange} >
        <div className="mb-3 relative">
          <label htmlFor="password" className=" text-gray-700">New Password</label>
          <div className="relative"> 
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            required
            autoComplete="current-password"
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
        <div className="mb-5 relative">
          <label htmlFor="password" className="block text-gray-700">Confirm New Password</label>
          <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirm_password"
            value={confirm_password}
            onChange={handleConfirmPasswordChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            required
            autoComplete="confirm_password"
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
          {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
        </div>
        <button disabled={isLoading} type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-80">
          Submit
        </button>
  
        {/* {error && <p className='text-red-500 text-center'>{error}</p>} */}
  
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75">
            <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291l-2.829 2.828A10 10 0 0012 22v-2a8 8 0 01-6-2.709z"></path>
            </svg>
            <p className='text-primary font-bold'>Please wait 1 second to 1 minute...</p>
          </div>
        )}
        
      </form>
    </div>
      </div>
    </div>
  </div>
  )
}


export default Newpassword;