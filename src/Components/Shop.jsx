import { useEffect, useState } from 'react';
import ShopModal from './modals/ShopModal';
import { PiShoppingCartSimpleDuotone } from 'react-icons/pi';
import { useAddShopMutation, useGetShopsQuery, useUpdateShopMutation } from '../features/shop/shopApi';
// import { shopssss } from './data.js';

function Shop() {
  const [isShopModalOpen, setShopModalOpen] = useState(false);
  const [shopName, setShopName] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([])
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  const { data: shops, isLoading, isError, error: responseError } = useGetShopsQuery();
 const [addShop] = useAddShopMutation();
 const [updateShop] = useUpdateShopMutation();

  useEffect(() => {
    // setData(shops)
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError]);

  const handleOpenShopModal = () => {
    setShopModalOpen(true);
  };

  const handleCloseShopModal = () => {
    setShopModalOpen(false);
  };

  const handleShopModalSubmit = (formData) => {
    addShop(formData)
  };
  const handleAddShop = async(e)=>{
    e.preventDefault();


   
  }

  const handleEdit = (shop) => {
    setEditRowId(shop.id);
    setCurrentEditValues(shop);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    const updatedShop = data.map((shop) =>
      shop.id === editRowId ? currentEditValues : shop
    );
    
    setEditRowId(null);
    setData(updatedShop)
    updateShop(updatedShop.id, updatedShop)
  };

  // const handleDelete= (id)=>{
  //   deleteCategory(id)
  // }

  const handleCancel = () => {
    setEditRowId(null);
  };

  let content = null;

  if (isLoading) {
    content = (
      <tr >
        <td className="text-green-500 bg-green-200 text-center my-5" colSpan="9">Loading....</td>
      </tr>
    );
  }
   else if (!isLoading && isError) {
    content = (
      <tr  >
        <td className="bg-red-200 mb-5 pb-5 text-center text-red-600 py-5 font-bold" colSpan="9">
          {error || 'Something went wrong'}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && shops?.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && shops?.length > 0) {
    content = shops.map((shop, index) => (
      <tr key={shop.id} className="text-center text-sm">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === shop.id ? (
          <>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="name"
                value={currentEditValues.name}
                onChange={handleInputChange}
                className="w-[100px]border rounded px-2 py-1"
              /> 
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="address"
                value={currentEditValues.address}
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
                name="ownerName"
                value={currentEditValues.user}
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
            <td className="border px-4 py-2">{shop.name}</td>
            <td className="border px-4 py-2">{shop.address}</td>
            <td className="border px-4 py-2">{shop.phone}</td>
            <td className="border px-4 py-2">{shop.user}</td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleEdit(shop)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                onClick={() => handleDelete(shop.id)}
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
      <h2 className="text-2xl font-bold mb-4">Shops</h2>

      <div className="flex justify-between items-center ">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Shop Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleAddShop}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenShopModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Shop
        </button>
      </div>
 
      {/* Table */}
      <table className="w-full border-collapse mb-4 text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Shop Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Address</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Contact No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Owner Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isShopModalOpen && (
        <ShopModal
          isOpen={isShopModalOpen}
          onClose={handleCloseShopModal}
          onSubmit={handleShopModalSubmit}
        />
      )}
    </div>
  );
}

export default Shop;
