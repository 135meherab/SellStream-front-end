import  {  useState } from 'react';
import { useGetEmployeesQuery } from '../../features/employee/employeeApi';



const AttendanceModal = ({ isOpen, onClose, onSubmit }) => {
 
  //local state
  const [isAttend, setIsAttend] = useState(false);
  const [shift, setShift] = useState('');
  const [employee, setEmployee] = useState('');

// redux
const {data: employees} = useGetEmployeesQuery()
console.log(employees)

const handleSubmit = async(e) => {

    e.preventDefault();
    // number into string
    const employeeInt = Number(employee)

    const newAttendance = {
      is_attend :isAttend,
      shift,
      employee: employeeInt,
    };
    
    onSubmit(newAttendance)
    console.log(newAttendance)
   
   onClose()
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Attendance</h3>
          
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4 w-[100px]">
                <label htmlFor="isAttend" className="block text-gray-700 text-sm font-bold mb-2">Is Attend</label>
                <input type="checkbox" id="isAttend" checked={isAttend} onChange={(e) => setIsAttend(e.target.checked)} className="border rounded-md py-2 px-4 w-full focus:outline-none" />
              </div>
          
              <div className="mb-4">
              <label htmlFor="shift" className="block text-gray-700 text-sm font-bold mb-2">Shift</label>
              <select 
                    id="shift" 
                    value={shift} 
                    onChange={(e) => setShift(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                 <option value="" disabled selected>Select a Shift</option>
                 <option  value='Morning'>Morning</option>
                 {/* <option  value='day'>Day</option> */}
                 <option  value='Evening'>Evening</option>
                 {/* <option  value='night'>Night</option> */}
                </select>
            </div>
            
           </div>
           
           <div className="flex justify-between items-center">
           
            
           
             <div className="mb-4">
                <label htmlFor="employee" className="block text-gray-700 text-sm font-bold mb-2">Employee</label>
                <select 
                    id="employee" 
                    value={employee} 
                    onChange={(e) => setEmployee(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                  <option value="" disabled selected>Select a employee</option>
                  {
                    employees?.map((employee) =>(

                      <option key={employee.id} value={employee.id}>{employee.fullname}</option>
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

export default AttendanceModal;
