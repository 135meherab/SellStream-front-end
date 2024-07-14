import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import { useAddemailMutation } from "../features/password_forget/password_top";
import { toast } from "react-toastify";


const Emailinput = () =>{

    const [email,setEmail] = useState('');
    const [error, setError] = useState('');
    const[AddEmail, { isLoading, error: responseError }] = useAddemailMutation();
    const navigate = useNavigate();
   
  
     //set error
    useEffect(() => {
    if (responseError) {
      setError(responseError.data.error);
      // toast.error(responseError.data.error);
    }
 
  }, [responseError]);
  // console.log(error)

  const handleCancel = () => {
    navigate(-1);
  };
  const handleEmailSubmit =async (e) =>{
    e.preventDefault();
    try{
      const response = await AddEmail({ email }).unwrap();
      toast.success(response.message)
    }catch(err){
        setError(err.data.error)
        toast.error(err.data.error)
      }

  };
  
  return (

    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Forgot Password</h2>
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div >
          <label htmlFor="username" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name = 'email'
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            required
          />
        </div>
        <button type="button" onClick={handleCancel} className="p-4 mr-2 bg-primary text-white py-1 rounded-md hover:bg-opacity-80">
            Cancel
          </button>
        <button disabled={isLoading} type="submit" className="p-4 bg-primary text-white py-1 rounded-md hover:bg-opacity-80">
          Submit
        </button>
  
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
 
);
};
export default Emailinput;