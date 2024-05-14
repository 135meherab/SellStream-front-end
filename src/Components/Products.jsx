import { useEffect, useState } from 'react';
import ProductModal from './ProductModal';




const AllProducts = () => {
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  
  useEffect(() => {
    fetchData();
    categoryList()
    unitList()
  }, []);

  const categoryList = async()=>{
    try{
      const response = await fetch("https://sellstream.onrender.com/category/")
        const categoryData = await response.json()
        // console.log(categoryData)
        setCategories(categoryData)
    }catch(error){
      console.log(error)
    }
  }

  const unitList= async()=>{
    try{
      const response = await fetch('https://sellstream.onrender.com/measurement/')
      const units = await response.json();
      // console.log(units)
      setUnits(units)

    }catch(error){
      console.log('unit list fetch Error', error)
    }
  }

  

  const fetchData = async () => {
    try {
      const response = await fetch('https://sellstream.onrender.com/product/');
      const data = await response.json();
      // console.log(data)
      setProducts(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

     // Function to handle opening the modal
     const handleOpenProductModal = () => {
      setProductModalOpen(true);
    };
      // Function to handle closing the modal
      const handleCloseProductModal = () => {
          setProductModalOpen(false);
        };
      
        // Function to handle form submission from the modal
        const handleProductModalSubmit = (formData) => {
          setProducts(...products, formData)
        };




  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Products</h2>

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
            <button className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80">Search</button> {/* Search button */}
          </div>
          <button onClick={handleOpenProductModal} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80">Add Product</button> {/* Add Product button */}
        </div>


      {/* Table */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">Code</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Description</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Category</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Quantity</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Price Per Unit</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Unit of Measurment</th>
          </tr>
        </thead>
        <tbody>
          
          {
              products.map((product) => (
                <tr key={product.id} className='text-center'>
                  <td className="border px-4 py-2">{product.product_code}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">{product.uom_name}</td>
                </tr>
              ))
            
          }
        </tbody>
      </table>


      
      {

      isProductModalOpen && <ProductModal isOpen={isProductModalOpen} onClose={handleCloseProductModal} onSubmit={handleProductModalSubmit} categories={categories} units={units} />
      }
    </div>
  );
};

export default AllProducts;
