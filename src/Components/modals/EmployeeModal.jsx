import  {  useState } from 'react';
import { useGetBranchesQuery } from '../../features/shop/shopApi';



const EmployeeModal = ({ isOpen, onClose, onSubmit }) => {
 
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [branch, setBranch] = useState('');
  const [isManager, setIsManager] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const {data:branches, isLoading, isError} = useGetBranchesQuery()

const handleSubmit = async(e) => {

    e.preventDefault();
    
    const phoneNumber = Number(phone)
    const newEmployee = {
      fullname: name,
      address: address,
      age: age,
      email:email,
      phone: phoneNumber,
      bank_account: bankAccount,
      gender: gender,
      is_manager:isManager,
      designation: designation,
      branch: branch
    };
    onSubmit(newEmployee)
    console.log(newEmployee)
    
   onClose()
   
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Employee</h3>
          
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input type="text" id="fullName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
            
          <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
              <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           
          </div>
          <div className="flex justify-between items-center">
            
          <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
              <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
            <div className="mb-4">
              <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
              <input type="text" id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
        
          </div>
          
         
           
           <div className="flex justify-between items-center">
           <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <select 
                    id="gender" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                 <option  value='Male'>Male</option>
                 <option  value='Female'>Female</option>
                 <option  value='Others'>Others</option>
                </select>
            </div>
           <div className="mb-4">
              <label htmlFor="account" className="block text-gray-700 text-sm font-bold mb-2">Bank Account</label>
              <input type="text" id="account" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           
           <div className="mb-4 w-[100px]">
              <label htmlFor="isManager" className="block text-gray-700 text-sm font-bold mb-2">Is Manager</label>
              <input type="text" id="isManager" value={isManager} onChange={(e) => setIsManager(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
                    
             <div className="mb-4">
                <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <select 
                    id="branch" 
                    value={branch} 
                    onChange={(e) => setBranch(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                  {
                    branches?.map((branch) =>(

                      <option key={branch.id} value={branch.name}>{branch.name}</option>
                    ))
                  }
                  
                </select>
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

export default EmployeeModal;
