import { useEffect, useState } from 'react';
import { useAddEmployeeMutation, useDeleteEmployeeMutation, useGetEmployeesQuery, useUpdateEmployeeMutation,useGetDesignationsQuery } from '../features/employee/employeeApi.js';
import EmployeeModal from './modals/EmployeeModal.jsx';
import { toast } from 'react-toastify';



const Employee =() => {
  // local state
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});
  const [userdata, setUserdata] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredemployee, setFilteredEmployee] = useState([]);


  // redux
  const { data: employees, isLoading, isError, error: responseError } = useGetEmployeesQuery();
  const {data: designations} = useGetDesignationsQuery()
  const[addEmployee] = useAddEmployeeMutation()
  const [ updateEmployee] = useUpdateEmployeeMutation()
  const [deleteEmployee] = useDeleteEmployeeMutation()

  // console.log(employees)
// initial error
  useEffect(() => {
  // Get data from local storage
  const data = localStorage.getItem('user_info');
  
  if (data) {
    setUserdata(JSON.parse(data));
  }
    if (responseError) {
      setError(responseError.error);
      toast.error(responseError.error);
    }
  }, [responseError, error]);

  useEffect(() => {
    const employeefilter = () =>{
      if(!searchTerm.trim()){
      return employees?.results || [];
      }
      return employees?.results?.filter( employee =>
        employee.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) 
      ) || [];
    };
    setFilteredEmployee(employeefilter());
  }, [searchTerm, employees]);

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
      location.reload();
      toast.success(`${formData.fullname} Employee has been added Successfully!`)
      setError('')
    }catch(error){
      if (error.data) {
        // Assuming error.data contains the validation errors from your API
        const { data } = error;
        if (data.email) {
          toast.error('Email already exists. Please use a different email.'); // Display email errors
        }
        if (data.phone) {
          toast.error('Phone already exists. Please use a different Phone.'); // Display phone errors
        }
        if (data.bank_account) {
          toast.error('Bank account already exists. Please use a different bank number.'); // Display bank account errors
        }
      } else {
        // Handle other types of errors
        setError(error.message); // Set general error message
        toast.error(error.message); // Display general error
      }
      // console.log(error); // Log the error for debugging purposes
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
 const handleUpdate = async(id) => {
    
  try{
  setEditRowId(null);
  await updateEmployee({id: id, ...currentEditValues}).unwrap()
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
  }catch(err){
    setError(err.data.detail)
    toast.error(error)
    console.log(err.data.detail)
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
  } else if (!isLoading && !isError && filteredemployee.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading  && !isError && filteredemployee.length >0) {
    content = filteredemployee.map((employee, index) => (
      <tr key={index} className="text-center">
        {/* <td className="border px-4 py-2">{index + 1}</td> */}
        {editRowId === employee.id ? (
          <>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="fullname"
                value={currentEditValues.fullname}
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
                className=" border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="phone"
                value={currentEditValues.phone}
                onChange={handleInputChange}
                className=" border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
             {currentEditValues.gender}
                
            </td>
            <td className="border px-4 py-2">
              {/* <input
                type="text"
                name="first_name"
                value={currentEditValues.designation_name}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              /> */}
              <select 
                    id="designation" 
                    name= "designation"
                    value={currentEditValues.designation.id} 
                    onChange={handleInputChange}
                    className="border rounded-md py-1 px-2 w-40 focus:outline-none"
                    required
                >
                  <option value="designation"  selected>{currentEditValues.designation_name}</option>
                  {
                    designations?.results?.map((designation) =>(

                      <option key={designation.id} value={designation.id}>{designation.name}</option>
                    ))
                  }
                  
                </select>
            </td>
            <td className="border px-4 py-2">
             {currentEditValues.branch_name}
                
            </td>
            
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={handleUpdate}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Update
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
            <td className="border px-4 py-2">{employee.designation_name}</td>
            <td className="border px-4 py-2">{employee.branch_name}</td>

            {userdata?.role !== 'isbranch' &&(
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
            )}
            
            
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Employee Name, Phone"
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
        {userdata?.role !== 'isbranch' && (
          <button
            onClick={handleOpenEmployeeModal}
            className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
          >
            Add employee
          </button>
        )}
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">No</th> */}
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">Address</th> */}
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">Age</th> */}
            <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Phone</th>
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">Bank Account</th> */}
            <th className="border-b-2 border-gray-300 px-4 py-2">Gender</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Designation</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Branch</th>
            {userdata?.role !== 'isbranch' &&(
              <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
            )}
           
            
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
