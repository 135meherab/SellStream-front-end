import { useEffect, useState } from 'react';
import BranchesModal from './modals/BranchesModal';
import { useAddBranchMutation, useDeleteBranchMutation, useGetBranchesQuery, useUpdateBranchMutation,useGetShopsQuery } from '../features/shop/shopApi';
import { toast } from 'react-toastify';



function Branches() {
  const [isBranchesModalOpen, setBranchesModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});
  const [filteredBranches, setFilteredBranches] = useState([]);

  const { data: branches, isLoading, isError, error: responseError } = useGetBranchesQuery()
  const { data: shops } = useGetShopsQuery()
  const [addBranch] = useAddBranchMutation()
  const[updateBranch] = useUpdateBranchMutation()
  const [deleteBranch] = useDeleteBranchMutation()


  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  useEffect(() => {
    const branchfilter = () =>{
      if(!searchTerm.trim()){
      return branches?.results || [];
      }
      return branches?.results?.filter(branch =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
    };
    setFilteredBranches(branchfilter());
  }, [searchTerm, branches]);


  // Handle modal open/close
  const handleOpenBranchesModal = () => {
    setBranchesModalOpen(true);
  };

  // Modal close
  const handleCloseBranchesModal = () => {
    setBranchesModalOpen(false);
  };

  // Add Branch
  const handleBranchesModalSubmit = async(formData) => {
    try{
      if (!shops || !shops.length) {
        toast.error('You need to create a shop first!');
        return;
      }
      await addBranch(formData)
      toast.success(`The Branch ${formData.name} has been added Successfully!`)
      setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(err.data.detail || 'Failed to add branch')
      // console.log(err.data.detail)
    }
  };

  const handleSearchBranch = async (e) => {
    e.preventDefault();
    // Logic to add a branch
  };

  const handleEdit = (branch) => {
    setEditRowId(branch.id);
    setCurrentEditValues(branch);
  };
  const handleCancel = () => {
    setEditRowId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  // Update Branch
  const handleUpdate = async () => {
  
   try{
      setEditRowId(null);
      await updateBranch({id:currentEditValues.id, ...currentEditValues}).unwrap();
      toast.success(`Branch Updated Successfully!`)
      setError('');
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
    
  };
  
// Delete Branch
  const handleDelete = async(id) => {
    try{
      await deleteBranch(id).unwrap();
      toast.success(`Branch Deleted Successfully!`)
      setError('');
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  }



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
  } else if (!isLoading && !isError && filteredBranches.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && filteredBranches.length > 0 ) {
    content = filteredBranches.map((branch, index) => (
      <tr key={branch.id} className="text-center text-sm">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === branch.id ? (
          <>
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
                name="location"
                value={currentEditValues.location}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="shop"
                value={currentEditValues.shop}
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
            <td className="border px-4 py-2">{branch.name}</td>
            <td className="border px-4 py-2">{branch.location}</td>
            <td className="border px-4 py-2">{branch.shop}</td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleEdit(branch)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(branch.id)}
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
      <h2 className="text-2xl font-bold mb-4">Branches</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="branchName"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Branch or Location"
              className="w-full border roundesd-md py-2 px-4 mr-2 focus:outline-none"
            />
            
            <button
              onClick={handleSearchBranch}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenBranchesModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Branch
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Branch Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Location</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Shop</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isBranchesModalOpen && (
        <BranchesModal
          isOpen={isBranchesModalOpen}
          onClose={handleCloseBranchesModal}
          onSubmit={handleBranchesModalSubmit}
        />
      )}
    </div>
  );
}

export default Branches;
