import  {  useState } from 'react';
import { useGetShopsQuery } from '../../features/shop/shopApi';



const DesignationModal = ({ isOpen, onClose, onSubmit }) => {
 
  //local state
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');



const handleSubmit = async(e) => {

    e.preventDefault();
    // number into string
    let salaryInt = Number(salary)

    const newDesignation = {
      name: name,
      salary: salaryInt,
    };
    
    onSubmit(newDesignation)
    console.log(newDesignation)
   
   onClose()
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Designation</h3>
          
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="designationName" className="block text-gray-700 text-sm font-bold mb-2">Designation Name</label>
              <input type="text" id="designationName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
            <div className="mb-4">
                <label htmlFor="salary" className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                <input type="text" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
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

export default DesignationModal;
