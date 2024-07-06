import { useState , useEffect} from 'react';

import avatar from '../assets/avater.png'
function ShopProfile() {
    const [userdata, setUserdata] = useState(null);
    useEffect(() => {
        // Get data from local storage
        const data = localStorage.getItem('user_info');
        console.log('data : ',  data)
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
        <p className='text-lg text-gray-700'>
        {userdata ? `${userdata.username}` : 'User'}
            </p>
            <h3 className='text-2xl font-bold text-gray-800 '>
                {userdata ? `${userdata.first_name} ${userdata.last_name}` : 'User'}
            </h3>
        </div>
    </div>

    <div className='text-center mb-6'>
        <h3 className='text-xl font-bold text-gray-700 mb-2'>Email</h3>
        <p className='text-lg text-gray-700'>
            {userdata ? userdata.email : 'User'}
        </p>
    </div>

    <div className='flex justify-center'>
        <button className='bg-primary px-6 py-3 rounded-full text-white shadow-lg'>
            Update Your Profile
        </button>
    </div>
</div>

  )
}

export default ShopProfile