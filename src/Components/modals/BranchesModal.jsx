import  {  useState } from 'react';
import { useGetShopsQuery } from '../../features/shop/shopApi';



const BranchesModal = ({ isOpen, onClose, onSubmit }) => {
// local state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [shop, setShop] = useState('');

// Redux
const {data: shops} = useGetShopsQuery()


const handleSubmit = async(e) => {

    e.preventDefault();
    
    // convert number into text
    const shopId = Number(shop)
    const newBranch = {
      name: name,
      location: location,
      shop: shopId,
    };
    
    onSubmit(newBranch)

    onClose()
   
   
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Branch</h3>
          
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="shopName" className="block text-gray-700 text-sm font-bold mb-2">Branch Name</label>
              <input type="text" id="shopName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
            
           </div>
           
           <div className="flex justify-between items-center">
           
             <div className="mb-4">
                <label htmlFor="shop" className="block text-gray-700 text-sm font-bold mb-2">Shop</label>
                <select 
                    id="shop" 
                    value={shop} 
                    onChange={(e) => setShop(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                  <option value="" disabled selected>Select a Shop</option>
                  {
                    shops?.map((shop) =>(

                      <option key={shop.id} value={shop.id}>{shop.name}</option>
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

export default BranchesModal;
