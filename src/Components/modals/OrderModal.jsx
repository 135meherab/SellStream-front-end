import { useEffect, useState } from 'react';
import { useGetBranchesQuery } from '../../features/shop/shopApi';

const OrderModal = ({ isOpen, onClose, onSubmit, orderId, total, orderItem }) => {

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [branch, setBranch] = useState(''); 

  // Redux
  const { data:branches, error, isLoading } = useGetBranchesQuery();

  const productId =[] 
  useEffect(()=>{
    orderItem.map(item => productId.push(item.id))
  },[orderItem])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let branchInt = Number(branch);
    
    const newOrder = {
      customer: {
        name: name,
        phone: mobileNumber,
      },
      order: {
        products: productId,
        branch: branchInt,
        order_unique_id: orderId,
        total_price: total,
      },
    };
   
    onSubmit(newOrder);

    console.log(newOrder);
    setName('');
    setMobileNumber('');
    setBranch('');     
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg text-center text-green-600 font-medium leading-6 text-gray-900 mb-4">{orderId}</h3>
            <div className="flex justify-center items-center">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
              </div>
              
              <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Contact No</label>
                <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
              </div>
              
            </div>
            <div className="mb-4">
                <label htmlFor="branch" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <select 
                  id="branch" 
                  value={branch} 
                  onChange={(e) => setBranch(e.target.value)}  
                  className="border rounded-md py-2 px-4 w-full focus:outline-none"
                  required
                >
                  <option value="" disabled>Select a branch</option>
                  {branches?.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
              </div>
            <div>
              <p className="text-center font-bold">Products Details</p>
              <div className="flex justify-between items-center">
                <h1 className="font-bold">Items</h1>
                <h1 className="font-bold">Quantity</h1>
              </div>
              {orderItem?.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <h1>{item.name}</h1>
                  <h1>{item.quantity}</h1>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center mt-3">
              <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Total Amount</label>
                <p className='text-red-600 font-bold text-xl'>{total}</p>
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

export default OrderModal;
