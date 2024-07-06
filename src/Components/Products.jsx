import { useEffect, useState } from 'react';
import ProductModal from './modals/ProductModal';
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../features/products/productsApi';
import { toast } from 'react-toastify';


const AllProducts = () => {
  // Local state
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProduct, setFilteredProduct] = useState([]);


  // Redux
  const { data: products, isLoading, isError, error: responseError} = useGetProductsQuery();
  const [updateProduct, { isError: isUpdateError, error: updateError }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation()
  const [addProduct] = useAddProductMutation()
  
 console.log(products)
 //set error
 useEffect(() => {
  if (responseError) {
    setError(responseError.error);
    toast.error(error);
  }
 
  
}, [responseError,  error]);

useEffect(() => {
  const productfilter = () =>{
    if(!searchTerm.trim()){
    return products?.results || [];
    }
    return products?.results?.filter( product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category_name.toLowerCase().includes(searchTerm.toLowerCase())  ||
      product.branch_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    ) || [];
  };
  setFilteredProduct(productfilter());
}, [searchTerm, products]);


  // Handle modal open/close
  const handleOpenProductModal = () => {
    setProductModalOpen(true);
  };

  // handle modal close
  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  };

    // Add product by submitting modal
  const handleProductModalSubmit = async(formData) => {
    try {
      console.log('Submitting form data:', formData); // Log the form data
      await addProduct(formData).unwrap();
      toast.success(`Successfully added the product ${formData.name}`)
      setError('')
      setProductsList([...productsList, formData]);
    } catch (err) {
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };

   // handle edit
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

  // Function to cancel the edit mode
  const handleCancel = () => {
    setEditRowId(null);
  };

  //update the product and Function to save the edited row and 
  const handleUpdate = async(id) => {
   
   try{
    
    setEditRowId(null);
    await  updateProduct({id: id, ...currentEditValues}).unwrap()
    toast.success(`Successfully Updated the product`)
    setError('')
   }catch(err){
    setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
   }
  };
  
// delete product
  const handleDeleteProduct = async(product) => {
    try{
     await deleteProduct(product.id).unwrap();
      toast.success(`Successfully Deleted the product ${product.name}`)
      setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
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
  } else if (!isLoading && !isError && filteredProduct.length === 0 ) {
    content = (
      <tr>
        <td className='mb-5 pb-5 text-center text-red-600 bg-red-300 py-5 font-bold' colSpan="9">No Products Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && filteredProduct.length > 0) {
    content = filteredProduct.map((product, index) => (
      <tr key={product.id} className="text-center">
        {/* <td className="border  px-4 py-2">{index + 1}</td> */}
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
                name="product_description"
                value={currentEditValues.product_description}
                onChange={handleInputChange}
                className=" w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="number"
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
                name="selling_price"
                value={currentEditValues.selling_price}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="number"
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

            <td className="border px-4 py-2 whitespace-nowrap">{product.category_name}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.quantity}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.selling_price}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{product.branch_name}</td>
            <td className="border px-4 py-2 whitespace-nowrap">
              <div className="flex justify-center items-center mx-2">
                <button onClick={() => handleEdit(product)} className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80">Edit</button>
                <button onClick={() => handleDeleteProduct(product)} className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80">Delete</button>
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

      <div className="flex items-center justify-between mb-5 text-sm">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, Category"
            className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
          />
          <button className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80">Search</button>
        </div>
        <button onClick={handleOpenProductModal} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80">Add Product</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-center">
      <table className="w-full border-collapse mb-4 text-sm table-auto min-w-full divide-y divide-gray-200">
        <thead>
          {error && <tr ><td className='text-center text-red-700 bg-red-300'>{error}</td></tr>}
          <tr>
            {/* <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th> */}
            <th className="border-b-2 border-gray-300 px-4 py-2">Code</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Description</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Category</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Quantity</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Selling Price</th>
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
