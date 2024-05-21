import { useEffect, useState } from 'react';
import BranchesModal from './modals/BranchesModal';
import {branchesss} from './data'
import { useAddBranchMutation, useDeleteBranchMutation, useGetBranchesQuery, useUpdateBranchMutation } from '../features/shop/shopApi';



function Branches() {
  const [isBranchesModalOpen, setBranchesModalOpen] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  const { data: branches, isLoading, isError, error: responseError } = useGetBranchesQuery()
  const [addBranch] = useAddBranchMutation()
  const[updateBranch] = useUpdateBranchMutation()
  const [deleteBranch] = useDeleteBranchMutation()
  useEffect(() => {
    // setData(branchesss)
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenBranchesModal = () => {
    setBranchesModalOpen(true);
  };

  const handleCloseBranchesModal = () => {
    setBranchesModalOpen(false);
  };

  const handleBranchesModalSubmit = (formData) => {
    addBranch(formData)
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    // Logic to add a shop
  };

  const handleEdit = (branch) => {
    setEditRowId(branch.id);
    setCurrentEditValues(branch);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
  
    setEditRowId(null);
    console.log(currentEditValues)
    updateBranch({id:currentEditValues.id, ...currentEditValues});
  };
  

  const handleDelete = (id) => {
    deleteBranch(id)
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
  } else if (!isLoading && !isError && branches?.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && branches?.length >0 ) {
    content = branches?.map((branch, index) => (
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

      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Branch Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleAddShop}
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
