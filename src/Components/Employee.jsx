import { useEffect, useState } from 'react';
import { useAddEmployeeMutation, useDeleteEmployeeMutation, useGetEmployeesQuery, useUpdateEmployeeMutation } from '../features/employee/employeeApi.js';
import EmployeeModal from './modals/EmployeeModal.jsx';
import { toast } from 'react-toastify';



const Employee =() => {
  // local state
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});


  // redux
  const { data: employees, isLoading, isError, error: responseError } = useGetEmployeesQuery();
  const[addEmployee] = useAddEmployeeMutation()
  const [ updateEmployee] = useUpdateEmployeeMutation()
  const [deleteEmployee] = useDeleteEmployeeMutation()

// initial error
  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenEmployeeModal = () => {
    setEmployeeModalOpen(true);
  };
// Handle modal open/close
  const handleCloseEmployeeModal = () => {
    setEmployeeModalOpen(false);
  };


  // Add Employee
  const handleEmployeeModalSubmit = async(formData) => {
    try{
      await addEmployee(formData).unwrap()
      toast.success(`${formData.fullname} Employee has been added Successfully!`)
      setError('')
    }catch(error){
      setError(error)
      toast.error(error)
      console.log(error)
    }
      
  };


  // handle search employee
  const handleSearchEmployee = async (e) => {
    e.preventDefault();
  };

  const handleEdit = (employee) => {
    setEditRowId(employee.id);
    setCurrentEditValues(employee);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

 // update employee
 const handleUpdate = async() => {
    
  try{
  setEditRowId(null);
  await updateEmployee({id: currentEditValues.id, ...currentEditValues}).unwrap()
  toast.success('Employee has been updated successfully')
  setError('')
  }catch(error){
    setError(error)
    toast.error(error)
    console.log(error)
  }
};

// Delete employee
const handleDelete= async (id)=>{
  try{
    await deleteEmployee(id).unwrap()
    toast.success('Employee has been deleted successfully')
    setError('')
  }catch(error){
    setError(error)
    toast.error(error)
    console.log(error)
  }
}
  const handleCancel = () => {
    setEditRowId(null);
  };

  let content = null;

  if (isLoading) {
    content = (
      <tr >
        <td className="text-green-500 bg-green-200 text-center my-5" colSpan="9">Loading....</td>
      </tr>
    );
  } 
  else if (!isLoading && isError) {
    content = (
      <tr>
        <td className="bg-red-200 mb-5 pb-5 text-center text-red-600 py-5 font-bold" colSpan="9">
          {error || 'Something went wrong'}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && employees?.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && employees?.length >0) {
    content = employees?.map((employee, index) => (
      <tr key={index} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === employee.id ? (
          <>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="employeename"
                value={currentEditValues.fullname}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="first_name"
                value={currentEditValues.address}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            
            <td className="border px-4 py-2">
              <input
                type="text"
                name="last_name"
                value={currentEditValues.age}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="email"
                value={currentEditValues.email}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={handleUpdate}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Cancel
                </button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="border px-4 py-2">{employee.fullname}</td>
            {/* <td className="border px-4 py-2">{employee.address}</td> */}
            {/* <td className="border px-4 py-2">{employee.age}</td> */}
            <td className="border px-4 py-2">{employee.email}</td>
            <td className="border px-4 py-2">{employee.phone}</td>
            {/* <td className="border px-4 py-2">{employee.bank_account}</td> */}
            <td className="border px-4 py-2">{employee.gender}</td>
            <td className="border px-4 py-2">{employee.designation}</td>
            <td className="border px-4 py-2">{employee.branch}</td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleEdit(employee)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Delete
                </button>
              </div>
            </td>
          </>
        )}
      </tr>
    ));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="employee Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchEmployee}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenEmployeeModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add employee
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">Address</th> */}
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">Age</th> */}
            <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Phone</th>
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">Bank Account</th> */}
            <th className="border-b-2 border-gray-300 px-4 py-2">Gender</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Designation</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Branch</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isEmployeeModalOpen && (
        <EmployeeModal
          isOpen={isEmployeeModalOpen}
          onClose={handleCloseEmployeeModal}
          onSubmit={handleEmployeeModalSubmit}
        />
      )}
    </div>
  );

}
export default Employee;
