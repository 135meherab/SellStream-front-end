import { useEffect, useState } from 'react';
import { useAddEmployeeMutation, useGetEmployeesQuery } from '../features/employee/employeeApi.js';
import EmployeeModal from './modals/EmployeeModal.jsx';
import {employeesss} from './data'



const Employee =() => {
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [error, setError] = useState('');
  const[data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  const { data: employee, isLoading, isError, error: responseError } = useGetEmployeesQuery();
  const[addEmployee] = useAddEmployeeMutation()
 

  useEffect(() => {
    setData(employeesss)
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenEmployeeModal = () => {
    setEmployeeModalOpen(true);
  };

  const handleCloseEmployeeModal = () => {
    setEmployeeModalOpen(false);
  };

  const handleEmployeeModalSubmit = (formData) => {
      addEmployee(formData)
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    // Logic to add a shop
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

  const handleUpdate = () => {
    const updatedEmployee = data.map((employee) =>
      employee.id === editRowId ? currentEditValues : employee
    );
    setData(updatedEmployee)
    setCurrentEditValues(updatdEmployee)
    setEditRowId(null);
    // updateemployee(updatedemployee.id, updatedemployee)
  };

  const handleDelete = (id) => {
    // deleteemployee(id)
  };
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
  // else if (!isLoading && isError) {
  //   content = (
  //     <tr>
  //       <td className="bg-red-200 mb-5 pb-5 text-center text-red-600 py-5 font-bold" colSpan="9">
  //         {error || 'Something went wrong'}
  //       </td>
  //     </tr>
  //   );
  // } else if (!isLoading && !isError && shops?.length === 0) {
  //   content = (
  //     <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
  //       <td>No data Found!</td>
  //     </tr>
  //   );
  // } 
  else if (!isLoading) {
    content = data?.map((employee, index) => (
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

      <div className="flex justify-between items-center">
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
              onClick={handleAddEmployee}
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

      <table className="w-full border-collapse mb-4">
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
