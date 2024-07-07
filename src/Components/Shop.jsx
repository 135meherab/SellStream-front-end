import { useEffect, useState } from 'react';
import ShopModal from './modals/ShopModal';
import { useAddShopMutation, useGetShopsQuery, useUpdateShopMutation } from '../features/shop/shopApi';
import { toast } from 'react-toastify';

function Shop() {
  //local state
  const [isShopModalOpen, setShopModalOpen] = useState(false);
  const [shopName, setShopName] = useState('');
  const [error, setError] = useState('');
  // const [data, setData] = useState([])
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  //redux
  const { data: shops, isLoading, isError, error: responseError } = useGetShopsQuery();
 const [addShop] = useAddShopMutation();
 const [updateShop] = useUpdateShopMutation();

const [expandedShopId, setExpandedShopId] = useState(null);

// console.log("Shop Data:", shops);
 //initial error
  useEffect(() => {
    // setData(shops)
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError]);


  //modal open
  const handleOpenShopModal = () => {
    setShopModalOpen(true);
  };


  //modal close
  const handleCloseShopModal = () => {
    setShopModalOpen(false);
  };


  // Add Shop
  const handleShopModalSubmit = async (formData) => {
    try{
      await addShop(formData).unwrap()
      toast.success(`${formData.name} Shop has been added Successfully!`)
      setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };
  const handleAddShop = async(e)=>{
    e.preventDefault();


   
  }
  // handle edit
  const handleEdit = (shop) => {
    setEditRowId(shop.id);
    setCurrentEditValues(shop);
  };


  // handle edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  // update shop
  const handleUpdate = async() => {
   
    try{
    setEditRowId(null);
    await updateShop({id: currentEditValues.id, ...currentEditValues}).unwrap()
    toast.success('Shop has been updated successfully')
    setError('')
    }catch(error){
      setError(error.error)
      toast.error(error.status)
      console.log(error)
    }
  };



  const handleCancel = () => {
    setEditRowId(null);
  };

  const toggleBranches = (shopId) => {
    if (expandedShopId === shopId) {
      setExpandedShopId(null);
    } else {
      setExpandedShopId(shopId);
    }
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
  } else if (!isLoading && !isError && shops?.results?.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && shops?.results?.length > 0) {
    content = shops?.results?.map((shop, index) => (
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
                className="w-[100px] border rounded px-2 py-1"
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
              {currentEditValues.user}
                
            </td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={handleUpdate}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Update
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
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          
        </div>
        <button
          onClick={handleOpenShopModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
          style={{ display: shops?.results?.length === 0 ? 'block' : 'none' }}
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
