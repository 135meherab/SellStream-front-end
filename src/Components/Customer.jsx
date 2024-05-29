import { useEffect, useState } from 'react';
import { useAddCustomerMutation, useDeleteCustomerMutation, useGetCustomersQuery, useUpdateCustomerMutation } from '../features/products/productsApi';
import CustomerModal from './modals/CustomerModal.jsx';
import { toast } from 'react-toastify';



function Customer() {
  //local State
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const[data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});


  //redux
  const { data: customers, isLoading, isError, error: responseError } = useGetCustomersQuery();
  const[addCustomer] = useAddCustomerMutation()
  const [updateCustomer] = useUpdateCustomerMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()

  // console.log(customers)

  //initial error
  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenCustomerModal = () => {
    setCustomerModalOpen(true);
  };

  // handle close modal
  const handleCloseCustomerModal = () => {
    setCustomerModalOpen(false);
  };

  // Add Customer 
  const handleCustomerModalSubmit = async(formData) => {
    try{
      await addCustomer(formData).unwrap();
      toast.success(`Customer ${formData.name} Added Successfully!`)
      setError('');
    }catch(error){
      setError(error.data.detail);
      toast.error(error.data.detail);
      console.log("Error During Add Customer: ", error.status, error.data.detail)
    }
  };

  const handleSearchCustomer = async (e) => {
    e.preventDefault();
    
  };

  const handleEdit = (customer) => {
    setEditRowId(customer.id);
    setCurrentEditValues(customer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  // update customer
  const handleUpdate = async() => {
    
    setEditRowId(null);
    try{
      await updateCustomer({id: currentEditValues.id, ...currentEditValues}).unwrap();
      toast.success(`Customer Updated Successfully!`)
      setError('');
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };

  // Delete customer
  const handleDelete = async(id) => {
    try{
      await deleteCustomer(id).unwrap();
      toast.success(`Customer Deleted Successfully!`)
      setError('');
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
        <td className="text-green-500 bg-green-200 text-center my-5 " colSpan="9">Loading....</td>
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
  } else if (!isLoading && !isError && customers?.length === 0) {
    content = (
      <tr >
        <td className="text-red-500 bg-red-200 text-center my-5" colSpan="9">No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError &&  customers?.length > 0) {
    content = customers?.map((customer, index) => (
      <tr key={customer.id} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === customer.id ? (
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
                name="phone"
                value={currentEditValues.phone}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            
            <td className="border px-4 py-2">
              <input
                type="text"
                name="purchase"
                value={currentEditValues.total_purchase}
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
            <td className="border px-4 py-2">{customer.name}</td>
            <td className="border px-4 py-2">{customer.phone}</td>
            <td className="border px-4 py-2">{customer.total_purchase}</td>
            <td className="border px-4 py-2">{customer.shop}</td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
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
    <div className='h-screen'>
      <h2 className="text-2xl font-bold mb-4">Customer</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="customer Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchCustomer}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenCustomerModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Customer
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">customer Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Contact No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Total Purchase</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Shop</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className='overflow-y-scroll'>{content}</tbody>
      </table>

      {isCustomerModalOpen && (
        <CustomerModal
          isOpen={isCustomerModalOpen}
          onClose={handleCloseCustomerModal}
          onSubmit={handleCustomerModalSubmit}
        />
      )}
    </div>
  );
}

export default Customer;
