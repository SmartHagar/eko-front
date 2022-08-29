/** @format */

import React from "react";

const Table = ({ headers, dataTable, columns, setEdit, setDelete }) => {
  return (
    <div>
      <div className="overflow-x-auto relative rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="py-5 px-6">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* loop tr */}
            {dataTable.map((row, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                {/* loop td */}
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {row[column]}
                  </td>
                ))}
                {/* aksi */}
                <td>
                  <div className="mt-2">
                    <button
                      onClick={() => setEdit(row.id)}
                      type="button"
                      className="py-2 px-3 text-xs font-medium text-center text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                    >
                      Ubah
                    </button>

                    <button
                      onClick={() => setDelete(row.id)}
                      type="button"
                      className="py-2 px-3 text-xs font-medium text-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
