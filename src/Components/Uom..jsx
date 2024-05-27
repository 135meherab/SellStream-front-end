import { useEffect, useState } from 'react'

function Uom() {

  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');

 const unitsData  = [
  {
      id: 1,
      name: "kg"
  },
  {
      id: 2,
      name: "Liter"
  },
  {
      id: 3,
      name: "Piece"
  },
 ]
  useEffect(()=>{
    const getUnits = async()=>{
    const response = await fetch('https://sellstream.onrender.com/measurement/');
    const data = await response.json();
    console.log(data)
    setUnits(data)
    }


    getUnits()
  },[unit])

  const handleAddUnit = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch('https://sellstream.onrender.com/measurement/',{
        method: "Post",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: unit })
      })
      if(response.ok){
        setUnit('');
        setError('');
        console.log('Unit added')
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
      <h2 className="text-2xl font-bold mb-4 ">Unit Or Measurement</h2>

      <div className="flex items-center justify-between mb-5">
          <div className="flex items-center"> 
            
            <input
              type="text"
              id='category'
              value={unit}
              onChange={(e)=> (setUnit(e.target.value))}
              placeholder="Unit Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button onClick={handleAddUnit} className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80">Add</button> {/* Search button */}
            {error? <p>{error}</p>: ''}
          </div>
        </div>


      {/* Table */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2 ">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2"> UOM Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2"> Action</th>
          
          </tr>
        </thead>
        <tbody>
          
          {
              unitsData.map((unit, index) => (
                <tr key={index} className='text-center'>
                  <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{unit.name}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center mx-2">
                      <button className='bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80'>Edit</button>
                      <button className='bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80'>Delete</button>
                    </div>
                  </td>
                 
                </tr>
              ))
            
          }
        </tbody>
      </table>


    </div>
  )
}

export default Uom