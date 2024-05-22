import  {  useState } from 'react';
import { useGetCategoriesQuery } from '../../features/products/productsApi';
import { useGetBranchesQuery } from '../../features/shop/shopApi';



const ProductModal = ({ isOpen, onClose, onSubmit }) => {

  const [productCode, setProductCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [category, setCategory] = useState('');
  const [branch, setBranch] = useState('');

  // Get data for categories and branches
  const {data: categories} = useGetCategoriesQuery()
  const {data: branches} = useGetBranchesQuery()

const handleSubmit = async(e) => {

    e.preventDefault();
    
    // convert number into text
    const numberQnt = Number(quantity)
    // const numberPrice1 = Number(buyingPrice)
    // const numberPrice2 = Number(sellingPrice)
    const numberCategory = Number(category)
    const numberBranch = Number(branch)

    const newProduct = {
      name: name,
      product_description: description,
      buying_price: buyingPrice,
      selling_price: sellingPrice,
      quantity: numberQnt,
      branch: numberBranch,
      category:numberCategory
    };
    console.log(newProduct)
    onSubmit(newProduct)
    onClose()
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Product</h3>
          <div className="flex justify-between items-center gap-2">
          {/* <div className="mb-4">
              <label htmlFor="productCode" className="block text-gray-700 text-sm font-bold mb-2">Code</label>
              <input type="text" id="productCode" value={productCode} onChange={(e) => setProductCode(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div> */}
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="productName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          </div>
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="buyingPrice" className="block text-gray-700 text-sm font-bold mb-2">Buying Price</label>
              <input type="text" id="buyingPrice" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
           <div className="mb-4">
              <label htmlFor="sellingPrice" className="block text-gray-700 text-sm font-bold mb-2">Selling Price</label>
              <input type="text" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
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
                    <option value="" disabled selected>Select a Category</option>
                  {
                    categories?.map((category) =>(

                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                  }
                  
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="uom" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <select 
                    id="branch" 
                    value={branch} 
                    onChange={(e) => setBranch(e.target.value)}  
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                    <option value="" disabled selected>Select a branch</option>
                  {
                    branches?.map(branch=>(

                      <option key={branch.id} value={branch.id}>{branch.name}</option>
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

export default ProductModal;
