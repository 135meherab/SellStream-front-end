import { useEffect, useState } from 'react';
import { useAddOrderMutation,
         useDeleteOrderMutation,
         useGetOrdersQuery,
         useUpdateOrderMutation } from '../features/products/productsApi';
import OrderModal from './modals/OrderModal';
import { toast } from 'react-toastify';



function Order() {
  //local state
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [OrderName, setOrderName] = useState('');
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});


  //redux
  const { data: orders, isLoading, isError, error: responseError } = useGetOrdersQuery();
  const[addOrder] = useAddOrderMutation()
  const [updateOrder] = useUpdateOrderMutation()
  const [deleteOrder] = useDeleteOrderMutation()
  
  console.log(orders)
  
  //initial error
  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenOrderModal = () => {
    setOrderModalOpen(true);
  };

  //handle close modal
  const handleCloseOrderModal = () => {
    setOrderModalOpen(false);
  };


  // Add Order function
  const handleOrderModalSubmit = async(formData) => {
    try{
     await addOrder(formData ).unwrap()
     toast.success(`Order  added Successfully!`);
     setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };

  const handleSearchOrder = async (e) => {
    e.preventDefault();
    // Logic to add a shop
  };

  const handleEdit = (Order) => {
    setEditRowId(Order.id);
    setCurrentEditValues(Order);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  //update Order
  const handleUpdate = async() => {
   
   try{
    setEditRowId(null); 
      await updateOrder({id:currentEditValues.id, ...currentEditValues}).unwrap()
      toast.success(`Order updated Successfully!`)
     }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
     }
    
  };

  //delete Order
  const handleDelete = async(id) => {
    try{
      await deleteOrder(id).unwrap();
      toast.success("Order deleted successfully!")
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


  // how to render
  
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
  } else if (!isLoading && !isError && orders?.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && orders?.length > 0) {
    content = orders?.map((order, index) => (
      <tr key={order.id} className="text-center">
        {editRowId === order.id ? (
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
                name="uom"
                value={currentEditValues.uom}
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
            <td className="border px-4 py-2">{order.order_date}</td>
            <td className="border px-4 py-2">{order.order_unique_id}</td>
            <td className="border px-4 py-2">{order.customer}</td>
            <td className="border px-4 py-2">{order.branch}</td>
            <td className="border px-4 py-2">{order.total_price}</td>
            
          </>
        )}
      </tr>
    ));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="OrderName"
              value={OrderName}
              onChange={(e) => setOrderName(e.target.value)}
              placeholder="Order Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchOrder}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenOrderModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Order
        </button>
      </div>

      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">Order Date</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Order Id</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Branch</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={handleCloseOrderModal}
          onSubmit={handleOrderModalSubmit}
        />
      )}
    </div>
  );
}

export default Order;
