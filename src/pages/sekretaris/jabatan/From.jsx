/** @format */

import React, { useEffect, useState } from "react";
import useJabatan from "../../../store/jabatan";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const From = ({ closeModal, dataEdit, cekEdit }) => {
  const { addJabatan, updateItem } = useJabatan();
  const [name, setName] = useState("");

  useEffect(() => {
    if (cekEdit) {
      return setName(dataEdit.name);
    }
    setName("");
  }, []);

  const handleClose = () => {
    closeModal(false);
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    let cek;
    if (cekEdit) {
      cek = await updateItem(dataEdit.id, name);
      closeModal(false);
    } else {
      cek = await addJabatan(name);
    }
    if (cek.status === "berhasil") {
      setName("");
    }
  };
  return (
    <>
      <div
        aria-hidden="true"
        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 inset-0  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Silahkan menambah data jabatan
              </h3>
              <form className="space-y-6" onSubmit={handleSimpan}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nama Jabatan
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={handleClose}
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default From;
