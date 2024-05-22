import  {  useState } from 'react';
import { useGetShopsQuery } from '../../features/shop/shopApi';



const CustomerModal = ({ isOpen, onClose, onSubmit }) => {
 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [totalPurchase, setTotalPurchase] = useState('');
  const [shop, setShop] = useState('');

  const {data:shops, isLoading, isError} = useGetShopsQuery()

const handleSubmit = async(e) => {

    e.preventDefault();
    
    const phoneNumber = Number(phone)
    const newCustomer = {
      name: name,
      hope: phoneNumber,
      shop: shop,
    };
    
    onSubmit(newCustomer)
    console.log(newCustomer)
   onClose()
   
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Customer</h3>
          
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
              <input type="text" id="customerName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Contact No</label>
              <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
          </div>
          
           
           <div className="flex justify-between items-center">
           
           <div className="mb-4">
              <label htmlFor="purchase" className="block text-gray-700 text-sm font-bold mb-2">Total Purchase</label>
              <input type="text" id="purchase" value={totalPurchase} onChange={(e) => setTotalPurchase(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>  
             <div className="mb-4">
                <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">Shop</label>
                <select 
                    id="shop" 
                    value={shop} 
                    onChange={(e) => setShop(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                  {
                    shops?.map((shop) =>(

                      <option key={shop.id} value={shop.name}>{shop.name}</option>
                    ))
                  }
                  
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

export default CustomerModal;
