import { useEffect, useState } from 'react';
import { useAddLeaveMutation,
         useDeleteLeaveMutation,
         useGetLeaveQuery,
         useUpdateLeaveMutation } from '../features/employee/employeeApi';
import LeaveModal from './modals/LeaveModal';
import { toast } from 'react-toastify';



function Leave() {
  //local state
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [LeaveName, setLeaveName] = useState('');
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});


  //redux
  const { data: leaves, isLoading, isError, error: responseError } = useGetLeaveQuery();
  const[addLeave] = useAddLeaveMutation()
  const [updateLeave] = useUpdateLeaveMutation()
  const [deleteLeave] = useDeleteLeaveMutation()

  // console.log(Leaves)

  //initial error
  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenLeaveModal = () => {
    setLeaveModalOpen(true);
  };

  //handle close modal
  const handleCloseLeaveModal = () => {
    setLeaveModalOpen(false);
  };


  // Add Leave function
  const handleLeaveModalSubmit = async(formData) => {
    try{
     await addLeave(formData ).unwrap()
     toast.success(`Leave added Successfully!`);
     setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };

  const handleSearchLeave = async (e) => {
    e.preventDefault();
    // Logic to add a shop
  };

  const handleEdit = (Leave) => {
    setEditRowId(Leave.id);
    setCurrentEditValues(Leave);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };


  //update leave
  const handleUpdate = async() => {
   
   try{
    setEditRowId(null); 
      await updateLeave({id:currentEditValues.id, ...currentEditValues}).unwrap()
      toast.success(`Leave updated Successfully!`)
     }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
     }
    
  };

  // delete Leave
  const handleDelete = async(id) => {
    try{
      await deleteLeave(id).unwrap();
      toast.success("Leave deleted successfully!")
      setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err)
    }
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
  else if (!isLoading && isError) {
    content = (
      <tr>
        <td className="bg-red-200 mb-5 pb-5 text-center text-red-600 py-5 font-bold" colSpan="9">
          {error || 'Something went wrong'}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && leaves?.results?.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && leaves?.results?.length > 0) {
    content = leaves?.results?.map((leave, index) => (
      <tr key={leave.id} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === leave.id ? (
          <>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="name"
                value={currentEditValues.employee}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="date"
                name="startDate"
                value={currentEditValues.start_date}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="date"
                name="endDate"
                value={currentEditValues.end_date}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="number"
                name="totalDay"
                value={currentEditValues.total_day}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="description"
                value={currentEditValues.description}
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
            <td className="border px-4 py-2">{leave.employee}</td>
            <td className="border px-4 py-2">{leave.start_leave}</td>
            <td className="border px-4 py-2">{leave.end_leave}</td>
            <td className="border px-4 py-2">{leave.total_day}</td>
            <td className="border px-4 py-2 text-red-600 font-bold">{leave.description}</td>
            
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                {/* <button
                  onClick={() => handleEdit(Leave)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(Leave.id)}
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
      <h2 className="text-2xl font-bold mb-4">Leave</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="LeaveName"
              value={LeaveName}
              onChange={(e) => setLeaveName(e.target.value)}
              placeholder="Leave Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchLeave}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenLeaveModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Leave
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Employee Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">From</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">To</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Total Days</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Description</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isLeaveModalOpen && (
        <LeaveModal
          isOpen={isLeaveModalOpen}
          onClose={handleCloseLeaveModal}
          onSubmit={handleLeaveModalSubmit}
        />
      )}
    </div>
  );
}

export default Leave;
