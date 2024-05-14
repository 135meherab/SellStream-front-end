import React, { useState, useEffect } from 'react';

const DashboardRoute = () => {
  const [dashboardData, setDashboardData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('');
//       const data = await response.json();
//       setDashboardData(data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     }
//   };

  return (
    <div className="">
        <h1 className='text-2xl font-bold mb-5'>Dashboard</h1>
      {/* {dashboardData && ( */}
        <div className='grid grid-cols-3 gap-[40px] text-gray-300'>
          <div className="bg-gray-600 p-4 rounded-md">
            <p className="text-2xl font-bold mb-3">1200</p>
            {/* <p className="text-lg">{dashboardData.totalProducts}</p> */}
            <h2 className="text-xl font-bold mb-2">Total Products</h2>
          </div>
          <div className="bg-gray-600 p-4 rounded-md">
            {/* <p className="text-lg">{dashboardData.totalSells}</p> */}
            <p className="text-2xl font-bold mb-3">80</p>
            <h2 className="text-xl font-bold mb-2">Total Categories</h2>
          </div>
          <div className="bg-gray-600 p-4 rounded-md">
            {/* <p className="text-lg">{dashboardData.totalCategories}</p> */}
            <p className="text-2xl font-bold mb-3">2600</p>
            <h2 className="text-xl font-bold mb-2">Total Orders</h2>
          </div>
          <div className="bg-gray-600 p-4 rounded-md">
            {/* <p className="text-lg">{dashboardData.totalCustomers}</p> */}
            <p className="text-2xl font-bold mb-3">41000</p>
            <h2 className="text-xl font-bold mb-2">Total Sales</h2>
          </div>
          <div className="bg-gray-600 p-4 rounded-md">
            {/* <p className="text-lg">{dashboardData.totalEmployees}</p> */}
            <p className="text-2xl font-bold mb-3">700</p>
            <h2 className="text-xl font-bold mb-2">Total Customers</h2>
          </div>
          <div className="bg-gray-600 p-4 rounded-md">
            {/* <p className="text-lg">{dashboardData.totalEmployees}</p> */}
            <p className="text-2xl font-bold mb-3">19</p>
            <h2 className="text-xl font-bold mb-2">Total Employees</h2>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default DashboardRoute;
