import { useState } from 'react';
import { products } from './data';
import OrderModal from './OrderModal';
import './css/modal.css';

const OrderComponent = () => {

    const data = products;
  // State variables
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to handle search
  const handleSearch = () => {
    setSearchResult(data)
  };

  // Function to handle adding product to order
  const handleAddProduct = () => {

  };

  // Function to handle removing product from order
  const handleRemoveProduct = (productId) => {
  
  };

   // Function to handle opening the modal
   const handleOpenModal = () => {
    setIsModalOpen(true);
  };
    // Function to handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      // Function to handle form submission from the modal
      const handleModalSubmit = (formData) => {

      };
    const orderId = generateOrderId()
  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-center">{generateOrderId()}</h2>

      {/* Search Bar and Input */}
      <div className="flex items-center justify-between mb-4">
        <div className='flex justify-center items-center'> 
            <label htmlFor="Product Code">Product:</label>
        <input
          type="text"
          placeholder="Product Code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
        />
        
        </div>
        <div className='flex justify-center items-center'> 
            <label htmlFor="Product Code">Quantity:</label>
      <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded-md py-2 px-4 mr-2 focus:outline-none"
        />
      </div>
      
      </div>

      {/* Table */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Product Details</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Unit</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Quantity</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Price per unit</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
         
          {data.map((product, index) => (
            <tr key={product.id} className='text-center'>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.uom}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleAddProduct(product.id)} className='btn btn-danger btn-sm'>Delete</button>
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="flex justify-around mb-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">New Order</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Cancel Order</button>
        <button onClick={handleOpenModal} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Place Order</button>
      </div>


      {

            isModalOpen && <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleModalSubmit} orderId={orderId} />
      }
    </div>
  );
};

export default OrderComponent;

// Function to generate order ID
const generateOrderId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `Order# : ${year}${month}${date}Tx${hours}${minutes}${seconds}`;
};
