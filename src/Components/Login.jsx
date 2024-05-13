import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';




const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const history = useHistory();



  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch('https://sellstream.onrender.com/ad/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // const data = await response.json();

      if (response.ok) {
        // const token = data.token;
        // localStorage.setItem('token', token);
        // history.push('/');
      } else {
        console.log('something went wrong!')
        // setError(data.message); 
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-80">Login</button>
        
          {/* {error? <p>{error}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
