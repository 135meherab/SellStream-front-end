import avatar from '../assets/avater.png'
function Profile() {


  return (
    <div className='mx-5'>
        <h1 className='text-3xl font-bold '>Profile</h1>
        <div className="img w-20 h-20">
        <img src={avatar} alt="avatar" />
        </div>

        <div className="info flex flex-col justify-center align-center ">
            <h3 className='text-xl font-bold '>Md. Riduanul Haque</h3>
            <p className='text-md text-gray-600'>+8801794212131</p>
              
            
        </div>
        <div className='my-5 '>
        <h3 className='text-xl font-bold leading-9'>Email </h3>
            <p className='text-xl  leading-9 text-gray-700'> riduanul.haque1@gmail.com</p>
            <h3 className='text-xl font-bold leading-9 '>Address </h3>
            <p className='text-xl  leading-9 text-gray-700'> 52 North Kalindipur, Rajbari, Rangamati.</p>
        </div>

        <button  className='bg-primary border px-3 py-3 rounded-md text-white'>Update Your Profile</button>
        
    </div>
  )
}

export default Profile