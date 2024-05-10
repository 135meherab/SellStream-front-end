import React, { useState } from 'react';

const OrderModal = ({ isOpen, onClose, onSubmit, orderId }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [givenAmount, setGivenAmount] = useState('');
  const [paybackAmount, setPaybackAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ mobileNumber, paymentMethod, givenAmount, paybackAmount });
    setMobileNumber('');
    setPaymentMethod('cash');
    setGivenAmount('');
    setPaybackAmount('');
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{orderId}</h3>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
              <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
            <div className="mb-4">
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
                  </div>
                  <div className="mb-4">
                    <label htmlFor="givenAmount" className="block text-gray-700 text-sm font-bold mb-2">Given Amount</label>
                    <input type="text" id="givenAmount" value={givenAmount} onChange={(e) => setGivenAmount(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="paybackAmount" className="block text-gray-700 text-sm font-bold mb-2">Payback Amount</label>
                    <input type="text" id="paybackAmount" value={paybackAmount} onChange={(e) => setPaybackAmount(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
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
