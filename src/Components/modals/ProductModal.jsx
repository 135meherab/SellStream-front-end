import  {  useState } from 'react';



const ProductModal = ({ isOpen, onClose, onSubmit, categories, units }) => {
 
 
  const [productCode, setProductCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');


const handleSubmit = async(e) => {

    e.preventDefault();
    
    // convert number into text
    const numberQnt = Number(quantity)
    const numberPrice = Number(price)

    const newProduct = {
      name: name,
      description: description,
      product_code: productCode,
      quantity: numberQnt,
      price: numberPrice,
      category: category,
      uom_name:unit
    };
    
    console.log(newProduct)
    
    try {
      const response = await fetch('https://sellstream.onrender.com/product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });
  

   

      if (response.ok) {
        onSubmit(newProduct);
        
        // Reset form 
        setProductCode('');
        setName('');
        setDescription('');
        setQuantity('');
        setPrice('');
        setCategory('');
        setUnit('');
        
        // Close the modal
        onClose();
      } else {
        console.error('Failed to add product:', response.statusText, response.status, response);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
   
  };


  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium font-bold leading-6 text-gray-900 mb-4">Add Product</h3>
          <div className="flex justify-between items-center gap-2">
          <div className="mb-4">
              <label htmlFor="productCode" className="block text-gray-700 text-sm font-bold mb-2">Code</label>
              <input type="text" id="productCode" value={productCode} onChange={(e) => setProductCode(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="productName" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
            </div>
          </div>
           <div className="flex justify-between items-center gap-2">
           <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded-md py-2 px-4 w-full focus:outline-none" required />
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
                  {
                    categories?.map((category) =>(

                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))
                  }
                  
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="uom" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <select 
                    id="uom" 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)}  
                    className="border rounded-md py-2 px-4 w-full focus:outline-none"
                    required
                >
                  {
                    units?.map(unit=>(

                      <option key={unit.id} value={unit.name}>{unit.name}</option>
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
