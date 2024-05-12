import { useState } from 'react';
import {employees} from './data'
import ProductModal from './ProductModal';




const Employee = () => {
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);


     // Function to handle opening the modal
     const handleOpenProductModal = () => {
      setEmployeeModalOpen(true);
    };
      // Function to handle closing the modal
      const handleCloseProductModal = () => {
          setEmployeeModalOpen(false);
        };
      
        // Function to handle form submission from the modal
        const handleProductModalSubmit = (formData) => {
          // Implement logic to handle form data submission
        };


    const em = employees


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Employee</h2>

      <div className="flex items-center justify-between mb-5">
          <div className="flex items-center"> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.879 12.793l3.853 3.853a1 1 0 11-1.414 1.414l-3.853-3.853a7 7 0 111.414-1.414zM7 13a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search with code, name, brand"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80">Search</button> {/* Search button */}
          </div>
          <button onClick={handleOpenProductModal} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80">Add Employee</button> {/* Add Product button */}
        </div>


      {/* Table */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Mobile No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
     
          </tr>
        </thead>
        <tbody>
          
          {
              em.map((employee, index) => (
                <tr key={employee.id} className='text-center'>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{employee.name}</td>
                  <td className="border px-4 py-2">{employee.email}</td>
                  <td className="border px-4 py-2">{employee.mobile}</td>
                  <td className="border px-4 py-2"><div> <button className='bg-blue-500 text-white py-2 px-4 rounded-md ml-2'>Edit</button> <button className='bg-red-500 text-white py-2 px-4 rounded-md ml-2'>Delete</button></div></td>
                
                </tr>
              ))
            
          }
        </tbody>
      </table>


      
      {

      isEmployeeModalOpen && <ProductModal isOpen={isEmployeeModalOpen} onClose={handleCloseProductModal} onSubmit={handleProductModalSubmit} />
      }
    </div>
  );
};

export default Employee;
