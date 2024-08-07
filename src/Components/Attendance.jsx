import { useEffect, useState } from 'react';
import { useAddAttendanceMutation,
         useDeleteAttendanceMutation,
         useGetAttendancesQuery,
         useUpdateAttendanceMutation } from '../features/employee/employeeApi';
import AttendanceModal from './modals/AttendanceModal';
import { toast } from 'react-toastify';



function Attendance() {
  //local state
  const [isAttendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);


  //redux
  const { data: attendances, isLoading, isError, error: responseError } = useGetAttendancesQuery();
  const[addAttendance] = useAddAttendanceMutation()
  const [deleteAttendance] = useDeleteAttendanceMutation()

  console.log(attendances)

  //initial error
  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  useEffect(() => {
    const Attendancefilter = () =>{
      if(!searchTerm.trim()){
      return attendances?.results || [];
      }
      return attendances?.results?.filter(attendance =>
        attendance.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) 
      ) || [];
    };
    setFilteredAttendance(Attendancefilter());
  }, [searchTerm,attendances]);

  // Handle modal open/close
  const handleOpenAttendanceModal = () => {
    setAttendanceModalOpen(true);
  };

  //handle close modal
  const handleCloseAttendanceModal = () => {
    setAttendanceModalOpen(false);
  };


  // Add Attendance function
  const handleAttendanceModalSubmit = async(formData) => {
    try{
     await addAttendance(formData ).unwrap()
     toast.success(`Attendance ${formData.fullname} added Successfully!`);
     setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };

  const handleSearchAttendance = async (e) => {
    e.preventDefault();
    // Logic to add a shop
  };

  

  // delete attendance
  const handleDelete = async(id) => {
    try{
      await deleteAttendance(id).unwrap();
      toast.success("Attendance deleted successfully!")
      setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
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
  } else if (!isLoading && !isError && filteredAttendance.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && filteredAttendance.length > 0) {
    content = filteredAttendance.map((attendance, index) => (
      <tr key={attendance.id} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === attendance.id ? (
          <>  </>
        ) : (
          <>
            <td className="border px-4 py-2">{attendance.employee_name}</td>
            <td className="border px-4 py-2">{attendance.shift}</td>
            <td className="border px-4 py-2">{attendance.date}</td>
            <td className="border px-4 py-2">{
            attendance.is_attend ? <p className='text-green-600 font-bold'>Present</p> : <p className='text-red-600 font-bold'>Absent</p>
            }</td>
            {/* <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleDelete(attendance.id)}
                  className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Delete
                </button>
              </div>
            </td> */}
          </>
        )}
      </tr>
    ));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="AttendanceName"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Attendance Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchAttendance}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenAttendanceModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Attendance
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Employee Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Shift</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Date</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Attendance</th>
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">Action</th> */}
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isAttendanceModalOpen && (
        <AttendanceModal
          isOpen={isAttendanceModalOpen}
          onClose={handleCloseAttendanceModal}
          onSubmit={handleAttendanceModalSubmit}
        />
      )}
    </div>
  );
}

export default Attendance;
