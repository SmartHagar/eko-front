/** @format */

import { Sidebar } from "flowbite-react";
import React, { useEffect } from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold font-face-jd">Dashboard</h1>
      <h2 className="text-lg font-face-jd">Selamat Datang...</h2>
      <div className="mt-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              Total
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">20</p>
          </div>
          <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">30</p>
          </div>
          <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
