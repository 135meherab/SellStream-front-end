import  {  useState } from 'react';



const ShopModal = ({ isOpen, onClose, onSubmit}) => {
 
  //local state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  // const [user, setUser] = useState('');

// redux

//handle submit for adding shop
const handleSubmit = async(e) => {

    e.preventDefault();
     const newShop = {
      name,
      address,
      phone

    };
    
    onSubmit(newShop)
    console.log(newShop)
   
   onClose()
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content text-sm">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Shop</h3>
          
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="shopName" className="block text-gray-700 text-sm font-bold mb-2">Shop Name</label>
              <input type="text" id="shopName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          
            
           </div>
           
           <div className="flex justify-between items-center">
           <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
              <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
             {/* <div className="mb-4">
                <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">Shop Owner</label>
                <select 
                    id="user" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)} 
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                  <option value="" disabled selected>Select a User</option>
                  {
                    users?.map((user) =>(

                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))
                  }
                  
                </select>
            </div> */}
            
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

export default ShopModal;
