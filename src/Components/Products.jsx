import { useEffect, useState } from 'react';
import ProductModal from './modals/ProductModal';
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../features/products/productsApi';
import { useDispatch } from 'react-redux';
import { productss, shopssss } from './data.js';

const AllProducts = () => {
  // Local state
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});


  // Redux
  const dispatch = useDispatch();
  const { data: products, isLoading, isError, error: responseError } = useGetProductsQuery();
  const [updateProduct, { data: updateData, isLoading: updateIsLoading, isError: updateIsError, error: productUpdateError }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation()
  const [addProduct] = useAddProductMutation()
  
 

  useEffect(() => {
    setData(productss);
  }, []);

  // Handle modal open/close
  const handleOpenProductModal = () => {
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  };

  const handleProductModalSubmit = (formData) => {
    addProduct(formData)
    setProductsList([...productsList, formData]);
  };

  

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)).unwrap();
  };

  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError]);

  const handleEdit = (product) => {
    setEditRowId(product.id);
    setCurrentEditValues(product);
  };

  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  // Function to save the edited row
  const handleUpdate = async(id) => {
   
    setEditRowId(null);
    dispatch(updateProduct({id, currentEditValues}));
  };

  // Function to cancel the edit mode
  const handleCancel = () => {
    setEditRowId(null);
  };

  // Decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <tr>
        <td className='mb-5 pb-5 text-center text-green-600 font-bold' colSpan="9">Loading...</td>
      </tr>
    );
  
  } else if (!isLoading && isError) {
    content = (
      <tr>
        <td className=' bg-red-200 mb-5 pb-5 text-center text-red-600 py-5  font-bold' colSpan="9">
          {error || 'An error occurred'}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && products?.length === 0) {
    content = (
      <tr>
        <td className='mb-5 pb-5 text-center text-green-600 font-bold' colSpan="9">No Products Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && products?.length > 0) {
    content = products.map((product, index) => (
      <tr key={product.id} className="text-center">
        <td className="border  px-4 py-2">{index + 1}</td>
        {editRowId === product.id ? (
          <>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="product_code"
                value={currentEditValues.product_code}
                onChange={handleInputChange}
                className=" w-[60px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="name"
                value={currentEditValues.name}
                onChange={handleInputChange}
                className=" w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="description"
                value={currentEditValues.product_description}
                onChange={handleInputChange}
                className=" w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="category"
                value={currentEditValues.category}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="number"
                name="quantity"
                value={currentEditValues.quantity}
                onChange={handleInputChange}
                className="w-[70px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="number"
                name="price"
                value={currentEditValues.selling_price}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="branch"
                value={currentEditValues.branch}
                onChange={handleInputChange}
                className="w-[80px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button onClick={()=>handleUpdate(currentEditValues.id)} className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80">Update</button>
                <button onClick={handleCancel} className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80">Cancel</button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="border px-4 py-2 whitespace-nowrap">{product.product_code}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.name}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.product_description}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.category}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.quantity}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.selling_price}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.branch}</td>
            <td className="border px-4 py-2 whitespace-nowrap">
              <div className="flex justify-center items-center mx-2">
                <button onClick={() => handleEdit(product)} className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80">Delete</button>
              </div>
            </td>
          </>
        )}
      </tr>
    ));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.879 12.793l3.853 3.853a1 1 0 11-1.414 1.414l-3.853-3.853a7 7 0 111.414-1.414zM7 13a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search with code, name, brand"
            className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
          />
          <button className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80">Search</button>
        </div>
        <button onClick={handleOpenProductModal} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80">Add Product</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <table className="w-full border-collapse mb-4 text-sm table-auto min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Code</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Description</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Category</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Quantity</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Price Per Unit</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Branch</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
      </div>

      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={handleCloseProductModal}
          onSubmit={handleProductModalSubmit}
        />
      )}
    </div>
  );
};
export default AllProducts;
