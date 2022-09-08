/** @format */

import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePickComp from "../../../components/sekretaris/form/DatePickComp";
import useLapKehadiran from "../../../store/laporan/lap-kehadiran";

const LapAbsensi = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { setExcelBulanan } = useLapKehadiran();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // export excel
  const xport = async () => {
    setLoading(true);
    const bulan = moment(startDate).format("MM");
    const tahun = moment(startDate).format("YYYY");
    const cek = await setExcelBulanan(bulan, tahun);

    if (cek.status === "berhasil") {
      setLoading(false);
    } else {
      setError("Terjadi kesalahan. Gagal mendownload.");
    }
  };

  return (
    <div className="font-face-jd">
      <header>
        <h1 className="text-2xl font-bold">Halaman Laporan</h1>
      </header>
      <div className="mt-3 flex justify-between flex-wrap">
        <p>Silahkan memilih bulan dan tahun untuk mencetak laporan Absensi</p>
      </div>
      <div className="flex justify-between gap-3 flex-wrap md:flex-nowrap">
        <div className="w-full">
          {/* <Search ket="Cari Data Absensi" findData={handleSearch} /> */}
          <DatePickComp
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showMonthYearPicker
            dateFormat="MMMM yyyy"
          />
        </div>
        <div>
          <button
            onClick={xport}
            className="w-36 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="w-36 relative px-5 py-2 ransition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Export Excel
            </span>
          </button>
        </div>
      </div>
      <div>
        {loading && <h1 className="text-center">Data sedang diproses...</h1>}
        {error && <h1 className="text-center">{error}</h1>}
      </div>
    </div>
  );
};

export default LapAbsensi;
