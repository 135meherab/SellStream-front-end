import { useState } from 'react';
import { useGetEmployeesQuery } from '../../features/employee/employeeApi';

const LeaveModal = ({ isOpen, onClose, onSubmit}) => {
    //local state
  const [startLeave, setStartLeave] = useState('');
  const [endLeave, setEndLeave] = useState('');
  const [totalLeave, setTotalLeave] = useState(0);
  const [description, setDescription] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');


  // redux
  const {data: employees} = useGetEmployeesQuery()

// console.log(employees)
  const handleStartLeaveChange = (e) => {
    setStartLeave(e.target.value);
    calculateTotalLeave(e.target.value, endLeave);
  };

  const handleEndLeaveChange = (e) => {
    setEndLeave(e.target.value);
    calculateTotalLeave(startLeave, e.target.value);
  };

  const calculateTotalLeave = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include end day
      setTotalLeave(diffDays);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let employeeInt = Number(selectedEmployee)
    const newLeaveRequest = {
      start_leave:startLeave,
      end_leave:endLeave,
      total_day:totalLeave,
      description,
      employee: employeeInt,
    };

    onSubmit(newLeaveRequest);
    // console.log(newLeaveRequest);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Leave Request</h3>
            <div className="flex justify-between items-center">
            

                    <div className="mb-4">
                    <label htmlFor="startLeave" className="block text-gray-700 text-sm font-bold mb-2">Start Leave</label>
                    <input
                        type="date"
                        id="startLeave"
                        value={startLeave}
                        onChange={handleStartLeaveChange}
                        className="border rounded-md py-2 px-4 w-full focus:outline-none"
                        required
                    />
                    </div>  
                    <div className="mb-4">
              <label htmlFor="endLeave" className="block text-gray-700 text-sm font-bold mb-2">End Leave</label>
              <input
                type="date"
                id="endLeave"
                value={endLeave}
                onChange={handleEndLeaveChange}
                className="border rounded-md py-2 px-4 w-full focus:outline-none"
                required
              />
            </div>
            </div>
            <div className="flex justify-between items-center">
            
            <div className="mb-4">
                    <label htmlFor="employee" className="block text-gray-700 text-sm font-bold mb-2">Employee</label>
                    <select
                        id="employee"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="border rounded-md py-2 px-4 w-full focus:outline-none"
                        required
                    >
                        <option value="" disabled>Select employee</option>
                        {employees?.results.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.fullname}
                        </option>
                        ))}
                    </select>
                    </div>

            <div className="mb-4">
              <label htmlFor="totalLeave" className="block text-gray-700 text-sm font-bold mb-2">Total Leave Days</label>
              <input
                type="number"
                id="totalLeave"
                value={totalLeave}
                readOnly
                className="border rounded-md py-2 px-4 w-full focus:outline-none"
              />
            </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md py-2 px-4 w-full focus:outline-none"
                required
              ></textarea>
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

export default LeaveModal;
