/** @format */

import React, { useEffect, useState } from "react";
import SelectSearch from "../../../components/sekretaris/form/SelectSearch";
import usePegawai from "../../../store/pegawai";
import useAbsensi from "../../../store/absensi";
import SelectComp from "../../../components/sekretaris/form/SelectComp";
import DatePickComp from "../../../components/sekretaris/form/DatePickComp";
import moment from "moment";

const From = ({ closeModal, dataEdit, cekEdit, setPesan }) => {
  const { arrData, setPegawai } = usePegawai();
  const { addAbsensi, updateAbsensi } = useAbsensi();
  const [date, setDate] = useState(new Date());
  const [presence, setPresence] = useState("");
  const [employee, setEmployee] = useState("");

  useEffect(() => {
    setPegawai();
    setEmployee([]);
    setPresence("Hadir");
    if (cekEdit) {
      const { date, presence } = dataEdit;
      const myDate = new Date(date);
      // eslint-disable-next-line no-sequences
      return (
        setDate(myDate),
        setPresence(presence),
        setEmployee({
          value: dataEdit.employee.id,
          label: dataEdit.employee.name,
        })
      );
    }
  }, []);

  const options = arrData.map(function (pegawai) {
    return { value: pegawai.id, label: `${pegawai.NIP} - ${pegawai.name}` };
  });

  const handleClose = () => {
    closeModal(false);
  };

  const handleSimpan = async (e) => {
    const myDate = moment(date).format("YYYY-MM-DD");
    const item = {
      date: myDate,
      presence,
      employee_id: employee.value,
    };
    e.preventDefault();
    let cek;
    if (cekEdit) {
      cek = await updateAbsensi(dataEdit.id, item);
      closeModal(false);
      setPesan(cek.data);
    } else {
      cek = await addAbsensi(item);
      setPesan(cek.data);
      console.log(cek);
    }
    if (cek.status === "berhasil") {
      setPresence("Hadir");
    }
  };
  return (
    <>
      <div
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
                {/* Tgl Absen */}
                <div>
                  <label
                    htmlFor="jabatan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Tgl. Absen
                  </label>
                  <DatePickComp selected={date} onChange={setDate} />
                </div>
                {/* Pilih Pegawai */}
                <div>
                  <label
                    htmlFor="NIP"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Plih Pegawai
                  </label>
                  <SelectSearch
                    value={employee}
                    onChange={setEmployee}
                    options={options}
                    id="jabatan"
                    required
                  />
                </div>
                {/* Pilih Kehadiran */}
                <div>
                  <label
                    htmlFor="kehadiran"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Kehadiran
                  </label>
                  {presence && (
                    <SelectComp
                      defaultValue={presence}
                      id="kehadiran"
                      onChange={(e) => {
                        setPresence(e.target.value);
                      }}
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Izin">Izin</option>
                      <option value="Sakit">Sakit</option>
                      <option value="Tanpa Keterangan">Tanpa Keterangan</option>
                    </SelectComp>
                  )}
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
