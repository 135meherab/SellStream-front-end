import  {  useState } from 'react';



const UserModal = ({ isOpen, onClose, onSubmit }) => {
 
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 


const handleSubmit = async(e) => {

    e.preventDefault();
    
    const newUser = {
      username: userName,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword
    };
    
    onSubmit(newUser)
    console.log(newUser)
   onClose()
   
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add User</h3>
          
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">User Name</label>
              <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
          </div>
        <div className="flex justify-between items-center">
        <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
        </div>
          <div className="flex justify-between items-center">
          <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="email" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          </div>
           
           
          
                  
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-around items-center"> 
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80">Confirm</button>
            <button onClick={onClose} type="button" className="mt-3 w-full sm:mt-0 sm:w-auto bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-opacity-80">Cancel</button>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default UserModal;
