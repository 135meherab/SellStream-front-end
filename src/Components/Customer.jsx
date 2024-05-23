import { useEffect, useState } from 'react';
import { useAddCustomerMutation, useGetCustomersQuery } from '../features/products/productsApi';
import CustomerModal from './modals/CustomerModal.jsx';
import {customersss} from './data'



function Customer() {
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const[data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  const { data: customers, isLoading, isError, error: responseError } = useGetCustomersQuery();
  const[addCustomer] = useAddCustomerMutation()
 

  useEffect(() => {
    setData(customersss)
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenCustomerModal = () => {
    setCustomerModalOpen(true);
  };

  const handleCloseCustomerModal = () => {
    setCustomerModalOpen(false);
  };

  const handleCustomerModalSubmit = (formData) => {
      addCustomer(formData)
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    // Logic to add a shop
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

  const handleUpdate = () => {
    const updatedCustomer = data.map((customer) =>
      customer.id === editRowId ? currentEditValues : customer
    );
    setData(updatedCustomer)
    setCurrentEditValues(updatedCustomer)
    setEditRowId(null);
    // updateCustomer(updatedCustomer.id, updatedCustomer)
  };

  const handleDelete = (id) => {
    // deleteCustomer(id)
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
  else if (!isLoading && customers?.length > 0) {
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
    <div>
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
              onClick={handleAddCustomer}
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
        <tbody>{content}</tbody>
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
