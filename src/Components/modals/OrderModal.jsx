import React, { useState } from 'react';

const OrderModal = ({ isOpen, onClose, onSubmit, orderId, total, orderItem }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [givenAmount, setGivenAmount] = useState('');
  const [paybackAmount, setPaybackAmount] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newOrder = {name, mobileNumber, paymentMethod, givenAmount, paybackAmount};
   
    onSubmit(newOrder);

    console.log(newOrder)
        setName('');
        setMobileNumber('');
        setPaymentMethod('');
        setGivenAmount('');
        setPaybackAmount('');
        
        onClose();
};

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{orderId}</h3>
          <div className="flex justify-center">
          <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Contact No</label>
              <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          </div>
            <div className="">
              <p className='text-center font-bold'>Products Details</p>
              <div className="flex justify-between items-center">
                <h1 className='font-bold'>Items</h1>
                <h1 className='font-bold'>Quantity</h1>
              </div>
                {orderItem?.map((item) =>{
                <div  className="flex justify-between items-center">
                    <h1>item.name</h1>
                    <h1>item.quantity</h1>
                </div>
                })}
            </div>

            <div className="flex justify-end items-center mt-3">
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Total Amount</label>
                <p>{total}</p>
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


// payment method
 {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                    <div className="flex">
                      <label className="inline-flex items-center mr-4">
                        <input type="radio" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="form-radio h-4 w-4 text-primary" />
                        <span className="ml-2 text-gray-700">Cash</span>
                      </label>
                      <label className="inline-flex items-center mr-4">
                        <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="form-radio h-4 w-4 text-primary" />
                        <span className="ml-2 text-gray-700">Card</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="radio" value="other" checked={paymentMethod === 'other'} onChange={() => setPaymentMethod('other')} className="form-radio h-4 w-4 text-primary" />
                        <span className="ml-2 text-gray-700">Other</span>
                      </label>
                    </div>
                  </div> */}