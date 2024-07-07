

import { useState , useEffect} from 'react';

import avatar from '../assets/avater.png'
function BranchProfile() {
    const [userdata, setUserdata] = useState(null);
    useEffect(() => {
        // Get data from local storage
        const data = localStorage.getItem('user_info');
        if (data){
          setUserdata(JSON.parse(data));
        }
      },[]);


  return (
    <div className='mx-5'>
    <h1 className='text-4xl font-bold mb-6 text-center text-primary'>Profile</h1>
    
    <div className='flex flex-col items-center mb-6'>
        <div className="img w-32 h-32 mb-4 rounded-full border-4 bg-primary shadow-lg">
            <img className='w-full h-full object-cover rounded-full' src={avatar} alt="avatar" />
        </div>
        <div className="info text-center">
        <p className=' text-gray-700 text-2xl'>{userdata ? `${userdata.username}` : 'User'}</p>
            
        </div>
    </div>

</div>

  )
}

export default BranchProfile