import { useEffect, useState } from 'react';
import { useAddUserMutation, useGetAllUserQuery, useUpdateUserMutation } from '../features/user/userApi.js';
import UserModal from './modals/UserModal.jsx';
import { toast } from 'react-toastify';


function User() {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  const { data: users, isLoading, isError, error: responseError } = useGetAllUserQuery();
  const[addUser] = useAddUserMutation()
  const[updateUser] = useUpdateUserMutation()
 
  console.log(users)

  useEffect(() => {
    // setData(usersss)
    if (responseError) {
      setError(responseError.error);
      console.log(error)
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenUserModal = () => {
    setUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
  };

  // add user function
  const handleUserModalSubmit = async(formData) => {
      try{
        await addUser(formData).unwrap()
        toast.info("Please Check your Email To Confirm")
        setError('')
      }catch(err){
        setError(err.data.detail)
        toast.error(error)
        console.log(err.data.detail)
      }
   
      
  };

  const handleSearchUser = async (e) => {
    e.preventDefault();
    // Logic to add a shop
  };

  const handleEdit = (user) => {
    setEditRowId(user.id);
    setCurrentEditValues(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  // update user function
  const handleUpdate = async() => {
    try{
      setEditRowId(null);
      await  updateUser(currentEditValues).unwrap()
      toast.success(`Successfully Updated the User`)
      setError('')
    }catch(err){
      setError(err.data.detail)
        toast.error(error)
        console.log(err.data.detail)
    }
  };

  const handleDelete = (id) => {
    // deleteUser(id)
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
        <td className="bg-red-200 mb-5 pb-5 text-center text-red-600 py-5 font-bold" colSpan="9" >
          {error || 'Something went wrong'}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && users?.results?.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading  && !isError && users?.results?.length > 0) {
    content = users?.results?.map((user, index) => (
      <tr key={user.id} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === user.id ? (
          <>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="username"
                value={currentEditValues.username}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="first_name"
                value={currentEditValues.first_name}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            
            <td className="border px-4 py-2">
              <input
                type="text"
                name="last_name"
                value={currentEditValues.last_name}
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
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.first_name}</td>
            <td className="border px-4 py-2">{user.last_name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
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
      <h2 className="text-2xl font-bold mb-4">User</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="user Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchUser}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenUserModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add user
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">User Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">First Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Last Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isUserModalOpen && (
        <UserModal
          isOpen={isUserModalOpen}
          onClose={handleCloseUserModal}
          onSubmit={handleUserModalSubmit}
        />
      )}
    </div>
  );
}

export default User;
