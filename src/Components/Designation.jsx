import { useEffect, useState } from 'react';
import { useAddDesignationMutation,
         useDeleteDesignationMutation,
         useGetDesignationsQuery,
         useUpdateDesignationMutation } from '../features/employee/employeeApi';
import DesignationModal from './modals/DesignationModal';
import { toast } from 'react-toastify';



function Designation() {
  //local state
  const [isDesignationModalOpen, setDesignationModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDesignation, setFilteredDesignation] = useState([]);


  //redux
  const { data: designations, isLoading, isError, error: responseError } = useGetDesignationsQuery();
  const[addDesignation] = useAddDesignationMutation()
  const [updateDesignation] = useUpdateDesignationMutation()
  const [deleteDesignation] = useDeleteDesignationMutation()

  // console.log(designations)
  //initial error
  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  useEffect(() => {
    const Designationfilter = () =>{
      if(!searchTerm.trim()){
      return designations?.results || [];
      }
      return designations?.results?.filter(Designation =>
        Designation.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      ) || [];
    };
    setFilteredDesignation(Designationfilter());
  }, [searchTerm, designations]);

  // Handle modal open/close
  const handleOpenDesignationModal = () => {
    setDesignationModalOpen(true);
  };

  //handle close modal
  const handleCloseDesignationModal = () => {
    setDesignationModalOpen(false);
  };


  // Add Designation function
  const handleDesignationModalSubmit = async(formData) => {
    try{
     await addDesignation(formData ).unwrap()
     location.reload();
     toast.success(`Designation ${formData.name} added Successfully!`);
     setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };

  const handleSearchDesignation = async (e) => {
    e.preventDefault();
    // Logic to add a shop
  };

  const handleEdit = (Designation) => {
    setEditRowId(Designation.id);
    setCurrentEditValues(Designation);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };


  // update function
  const handleUpdate = async(id) => {
   
   try{
    setEditRowId(null); 
      await updateDesignation({id: id, ...currentEditValues}).unwrap()
      toast.success(`Designation updated Successfully!`)
     }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
     }
    
  };


  //delete function
  const handleDelete = async(id) => {
    try{
      await deleteDesignation(id).unwrap();
      toast.success("Designation deleted successfully!")
      setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
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
  } else if (!isLoading && !isError && filteredDesignation.length === 0 ) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && filteredDesignation.length > 0) {
    content = filteredDesignation.map((designation, index) => (
      <tr key={designation.id} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === designation.id ? (
          <>
            <td className="border px-4 py-2">
              {currentEditValues.owner}
                
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="name"
                value={currentEditValues.name}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="salary"
                value={currentEditValues.salary}
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
            <td className="border px-4 py-2">{designation.owner}</td>
            <td className="border px-4 py-2">{designation.name}</td>
            <td className="border px-4 py-2">{designation.salary}</td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleEdit(designation)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(designation.id)}
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
      <h2 className="text-2xl font-bold mb-4">Designation</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="DesignationName"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Designation Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchDesignation}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenDesignationModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Designation
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Shop Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Designation</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Salary</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isDesignationModalOpen && (
        <DesignationModal
          isOpen={isDesignationModalOpen}
          onClose={handleCloseDesignationModal}
          onSubmit={handleDesignationModalSubmit}
        />
      )}
    </div>
  );
}

export default Designation;
