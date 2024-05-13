import { useEffect, useState } from 'react'

function Categories() {

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

 
  useEffect(()=>{
    const getCategory = async()=>{
    const resopnse = await fetch('https://sellstream.onrender.com/category/');
    const data = await resopnse.json();
    setCategories(data)
    }
    getCategory()
  },[category])

  const handleAddCategory = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch('https://sellstream.onrender.com/category/',{
        method: "Post",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: category })
      })
      if(response.ok){
        setCategory('');
        setError('');
        console.log('category added')
      }else{
       console.log('something wrong!')
      }
    }catch(error){
      console.log(error)
      setError(error)
    }
  
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Category</h2>

      <div className="flex items-center justify-between mb-5">
          <div className="flex items-center"> 
            
            <input
              type="text"
              id='category'
              value={category}
              onChange={(e)=> (setCategory(e.target.value))}
              placeholder="Category Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button onClick={handleAddCategory} className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80">Add</button> {/* Search button */}
            {error? <p>{error}</p>: ''}
          </div>
        </div>


      {/* Table */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2"> Category Name</th>
          
          </tr>
        </thead>
        <tbody>
          
          {
              categories.map((category, index) => (
                <tr key={index} className='text-center'>
                  <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{category.name}</td>
                 
                </tr>
              ))
            
          }
        </tbody>
      </table>


    </div>
  )
}

export default Categories