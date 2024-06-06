import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faListAlt, faShoppingCart, faMoneyBillAlt, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';
import LineChartComponent from './Chart/linechart';
import PieChartComponent from './Chart/PieChartComponent';
import Barchart from './Chart/Barchart';

const DashboardRoute = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Card for Total Products */}
        <div className="bg-purple-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-300">
          <div className="p-6 flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faBox} className="text-purple-600 text-4xl mb-3" />
            <p className="text-purple-600 text-lg font-semibold mb-2">Total Products</p>
            <p className="text-purple-600 text-2xl font-bold">1200</p>
          </div>
        </div>
        {/* Card for Total Categories */}
        <div className="bg-yellow-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-300">
          <div className="p-6 flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faListAlt} className="text-yellow-600 text-4xl mb-3" />
            <p className="text-yellow-600 text-lg font-semibold mb-2">Total Categories</p>
            <p className="text-yellow-600 text-2xl font-bold">80</p>
          </div>
        </div>
        {/* Card for Total Orders */}
        <div className="bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-300">
          <div className="p-6 flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faShoppingCart} className="text-green-600 text-4xl mb-3" />
            <p className="text-green-600 text-lg font-semibold mb-2">Total Orders</p>
            <p className="text-green-600 text-2xl font-bold">2600</p>
          </div>
        </div>
        {/* Card for Total Sales */}
        <div className="bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-300">
          <div className="p-6 flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="text-blue-600 text-4xl mb-3" />
            <p className="text-blue-600 text-lg font-semibold mb-2">Total Sales</p>
            <p className="text-blue-600 text-2xl font-bold">41000</p>
          </div>
        </div>
        {/* Card for Total Customers */}
        <div className="bg-red-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-300">
          <div className="p-6 flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faUsers} className="text-red-600 text-4xl mb-3" />
            <p className="text-red-600 text-lg font-semibold mb-2">Total Customers</p>
            <p className="text-red-600 text-2xl font-bold">700</p>
          </div>
        </div>
        {/* Card for Total Employees */}
        <div className="bg-indigo-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-300">
          <div className="p-6 flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faUserTie} className="text-indigo-600 text-4xl mb-3 " />
            <p className="text-indigo-600 text-lg font-semibold mb-2">Total Employees</p>
            <p className="text-indigo-600 text-2xl font-bold">19</p>
          </div>
        </div>
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center items-center">
          <div className="w-full ">
            <LineChartComponent />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center items-center">
          <div className="w-full h-full  flex flex-col items-center justify-center mb-3">
            <PieChartComponent />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center items-center">
          <div className="w-full h-full">
            <Barchart className="h-80 w-80"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoute;
