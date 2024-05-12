import React, { useState } from 'react';

const ProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ code,name, description, quantity, price, category, unit });
    setName('');
    setQuantity('');
    setCategory('');
    setUnit('');
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Product</h3>
          <div className="flex justify-between items-center gap-2">
          <div className="mb-4">
              <label htmlFor="productCode" className="block text-gray-700 text-sm font-bold mb-2">Code</label>
              <input type="text" id="productCode" value={code} onChange={(e) => setCode(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="productName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          </div>
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <input type="number" id="mobileNumber" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           </div>
           <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2"> Description</label>
              <input type="textarea" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           <div className="flex justify-between items-center">
             <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <select 
                    id="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                    <option value="">Select a category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Unit of Measurment</label>
                <select 
                    id="category" 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                    <option value="">Select a Unit</option>
                    <option value="category1">Kg</option>
                    <option value="category2">Liter</option>
                    <option value="category3">Piece</option>
                </select>
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

export default ProductModal;
