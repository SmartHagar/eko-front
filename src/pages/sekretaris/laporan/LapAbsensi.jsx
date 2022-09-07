/** @format */

import React, { useEffect, useState } from "react";
import useLapKehadiran from "../../../store/laporan/lap-kehadiran";

const LapAbsensi = () => {
  const { setExcelHarian } = useLapKehadiran();

  // export excel
  const xport = async () => {};

  return (
    <div className="font-face-jd">
      <header>
        <h1 className="text-2xl font-bold">Halaman Laporan</h1>
      </header>
      <div className="mt-3 flex justify-between flex-wrap">
        <p>
          Silahkan menambah, merubah dan menghapus data LapAbsensi LapAbsensi
        </p>
      </div>
    </div>
  );
};

export default LapAbsensi;
