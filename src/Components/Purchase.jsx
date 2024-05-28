import { useEffect, useState } from 'react';
import OrderModal from './modals/OrderModal';
import './css/modal.css';
import { useAddOrderMutation, useGetProductsQuery } from '../features/products/productsApi';
import { toast } from 'react-toastify';
const Purchase = () => {

//   const productsData  = [
//     {
//         id: 1,
//         product_code: "4001",
//         name: "Dell Laptop",
//         description:'Electronics Items',
//         price: 40000.00,
//         quantity: 12,
//         category: "Electronics",
//         uom_name: 'piece'
//     },
//     {
//       id: 2,
//       product_code: "4002",
//       name: "Dell Mouse",
//       description:'Electronics Items',
//       price: 120.00,
//       quantity: 120,
//       category: "Electronics",
//       uom_name: 'piece'
//   },
//   {
//     id: 3,
//     product_code: "4003",
//     name: "Dell Keyboard",
//     description:'Electronics Items',
//     price: 500.00,
//     quantity: 100,
//     category: "Electronics",
//     uom_name: 'piece'
// },
//    ]

  // State variables
  const [productCode, setProductCode] = useState('')
  const [products, setProducts] = useState([])
  const [orderItem, setOrderItem] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // redux
  const {data} = useGetProductsQuery()
  const [addOrder] = useAddOrderMutation()
  // set data to products
  useEffect(()=>{
    setProducts(data)
  },[data])

  // console.log(products)
  // console.log(productCode)
// console.log(orderItem)
 // Function to handle search
  const handleSearch = () => {
    // console.log(products)
    const result = products.filter((product) => product.product_code == productCode)
    // console.log(result)

    if(!result){
      setError('Invalid Product Code!')
    }else{
      setSearchResult(result)
      setProductCode('');
    }
    
  };
//   console.log(searchResult)
// console.log(productCode)


  const handleAddProduct = (product) => {
    const productWithQuantity = { ...product, quantity: 0 };
    setOrderItem(prevItems => [...prevItems, productWithQuantity]);
    setSearchResult([]);
    setProductCode('');
};

const handleQuantityChange = (value, index) => {
    setOrderItem(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[index].quantity = value;
        updatedItems[index].subtotal = updatedItems[index].selling_price * value;
        return updatedItems;
    });
};

useEffect(() => {
    const totalPrice = orderItem.reduce((acc, curr) => acc + (curr.subtotal || 0), 0);
    setTotal(totalPrice);
}, [orderItem]);



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
      const handleModalSubmit = async(formData) => {
       
         try{
          await addOrder(formData).unwrap()
          toast.success('Order Added Successful!')
          setError('')
         }catch(error){
          setError(error)
          toast.error(error)
          console.log(error)
         }
      };
    const orderId = generateOrderId()
 

    return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Purchase</h2>
     
      <div className="flex items-center justify-start mb-4">
        <div className='flex justify-center items-center'> 
            <label htmlFor="productCode">Product:</label>
        <input
          type="text"
          id='productCode'
          placeholder="Product Code" 
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
        />
        <button onClick={handleSearch} className='bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-08'>Search</button>
        </div>
      
      
      </div>


      {/* search result */}
      <div>
                <h3>Search Results:</h3>
                <ul>
                    {searchResult.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.product_code} -
                             <button onClick={() => handleAddProduct(product)} className="bg-primary text-white py-2 px-2 mx-2 rounded-md hover:bg-opacity-08">Add to Order</button>
                        </li>
                    ))}

                    {error && <p className='text-red-600 text-center'>{error}</p>}
                </ul>
            </div>

      {/* Table */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Product Code</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Product Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Product Price</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Quantity</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Sub Total</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
         
          {orderItem.map((product, index) => (
            <tr key={product.id} className='text-center'>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{product.product_code}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.selling_price }</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  id={`quantity-${index}`} 
                  placeholder="quantity"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value, index)} 
                  className="w-[35%] border rounded-md py-2 px-4 mr-2 focus:outline-none justify-center text-center"
                />
              </td>
             
              <td className="border px-4 py-2">{product.selling_price * product.quantity}</td>
              <td className="border px-4 py-2">
                <button className='bg-red-400 py-2 p text-white px-2 mr-2 rounded-md border'>Delete</button>
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>

      <div className='flex justify-end'>
        {/* <button className='bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-08'>$</button> */}
         <div className="div">
         <div className='flex justify-center items-center'>
                <label htmlFor="total">Total</label>
                <input type="text"
                 value={total}
                 id='total'
                 onChange={(e)=>{setTotal(e.target.value)}} 
                 className='w-full border rounded-md py-2 px-2 mr-2 focus:outline-none'
                 />
              
          </div>
          <button onClick={handleOpenModal} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-08">Save Transaction</button>
         </div>
      </div>
   
            {

                  isModalOpen && <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleModalSubmit} orderId={orderId} total={total} orderItem={orderItem}/>
            }
    </div>
  );
};

export default Purchase;

// Function to generate order ID
const generateOrderId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `ORD${year}${month}${date}${hours}${minutes}${seconds}`;
};

 {/* <div className='flex justify-center items-center'>
                <label htmlFor="discount">Discount</label>
                <input type="text"
                id='discount'
                 value={discount}
                 onChange={(e)=>{setDiscount(e.target.value)}} 
                 className='w-full border rounded-md py-2 px-2 mr-2 focus:outline-none'
                 />
              
          </div>
         <div className='flex justify-center items-center'>
                <label htmlFor="pay">Pay</label>
                <input type="text"
                id='pay'
                 value={pay}
                 onChange={(e)=>{setPay(e.target.value)}} 
                 className='w-full border rounded-md py-2 px-2 mr-2 focus:outline-none'
                 />
              
          </div> */}
