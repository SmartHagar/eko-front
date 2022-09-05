/** @format */

import React, { forwardRef, useEffect, useRef, useState } from "react";
import useJabatan from "../../../store/jabatan";
import { motion } from "framer-motion";
import SelectSearch from "../../../components/sekretaris/form/SelectSearch";
import usePegawai from "../../../store/pegawai";
import Input from "../../../components/sekretaris/form/Input";

const From = ({ closeModal, dataEdit, cekEdit, setPesan }) => {
  const { arrData, setJabatan } = useJabatan();
  const { addPegawai, updatePegawai } = usePegawai();
  const [name, setName] = useState("");
  const [NIP, setNIP] = useState("");
  const [position_id, setPositionId] = useState("");
  const [gender, setGender] = useState("Laki-laki");

  useEffect(() => {
    setJabatan();
    if (cekEdit) {
      const { NIP, name, gender } = dataEdit;
      // eslint-disable-next-line no-sequences
      return (
        setNIP(NIP),
        setName(name),
        setPositionId({
          value: dataEdit.position.id,
          label: dataEdit.position.name,
        }),
        setGender(gender)
      );
    }
    console.log("tambah");
    setPositionId([]);
    setName("");
  }, []);

  const options = arrData.map(function (jabatan) {
    return { value: jabatan.id, label: jabatan.name };
  });

  const handleClose = () => {
    closeModal(false);
  };

  const handleSimpan = async (e) => {
    const item = {
      NIP,
      name,
      position_id: position_id.value,
      gender,
    };
    e.preventDefault();
    let cek;
    if (cekEdit) {
      cek = await updatePegawai(dataEdit.id, item);
      closeModal(false);
      setPesan(cek.data);
    } else {
      cek = await addPegawai(item);
      setPesan(cek.data);
      console.log(cek);
    }
    if (cek.status === "berhasil") {
      setName("");
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
                Silahkan menambah data pegawai
              </h3>
              <form className="space-y-3" onSubmit={handleSimpan}>
                {/* NIP */}
                <div>
                  <label
                    htmlFor="NIP"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    NIP
                  </label>
                  <Input
                    id="NIP"
                    type="text"
                    value={NIP}
                    onChange={(e) => {
                      setNIP(e.target.value);
                    }}
                    required
                  />
                </div>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nama Pegawai
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
                {/* Jabatan */}
                <div>
                  <label
                    htmlFor="jabatan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Jabatan
                  </label>
                  <SelectSearch
                    value={position_id}
                    onChange={setPositionId}
                    options={options}
                    id="jabatan"
                    required
                  />
                </div>
                {/* Gender */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Jenis Kelamin
                  </label>
                  <div className="flex">
                    <div className="flex items-center mr-4">
                      <input
                        id="inline-radio"
                        type="radio"
                        value="Laki-laki"
                        checked={gender === "Laki-laki"}
                        onChange={(e) => setGender(e.target.value)}
                        name="gender"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="inline-radio"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Laki-laki
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="inline-2-radio"
                        type="radio"
                        value="Perempuan"
                        checked={gender === "Perempuan"}
                        onChange={(e) => setGender(e.target.value)}
                        name="gender"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="inline-2-radio"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Perempuan
                      </label>
                    </div>
                  </div>
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
      </motion.div>
    </>
  );
};

export default From;
