/** @format */

import { Sidebar } from "flowbite-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import DatePickComp from "../../../components/sekretaris/form/DatePickComp";
import { useState } from "react";
import Chart from "react-apexcharts";
import useApiAttedance from "../../../store/api/attedance";
import moment from "moment";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  // apexcharts
  const [options, setOptions] = useState("");
  const [series, setSeries] = useState("");
  const [dataSeries, setDataSeries] = useState([]);
  // ambil data attedance
  const { setAttedanceBulanan } = useApiAttedance();

  const getData = async () => {
    const bulan = moment(startDate).format("MM");
    const tahun = moment(startDate).format("YYYY");
    const dataAttedance = await setAttedanceBulanan(bulan, tahun);
    const myArray = dataAttedance.data;
    // Filter data hadir
    const hadir = myArray.filter((item) => {
      return item.presence === "Hadir";
    });
    // hitung data hadir
    const countHadir = hadir.length;
    // Filter data alpa
    const alpa = myArray.filter((item) => {
      return item.presence === "Tanpa Keterangan";
    });
    const countAlpa = alpa.length;
    // Filter data sakt
    const sakit = myArray.filter((item) => {
      return item.presence === "Sakit";
    });
    const countSakit = sakit.length;
    // Filter data izin
    const izin = myArray.filter((item) => {
      return item.presence === "Izin";
    });
    const countIzin = izin.length;
    setDataSeries([countAlpa, countIzin, countSakit, countHadir]);
    const data = [countAlpa, countIzin, countSakit, countHadir];
    setOptions({
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: ["#eb4034", "#bfde12", "#3bde12", "#12dec6"],
      plotOptions: {
        bar: {
          columnWidth: "90%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ["Tanpa Keterangan", "Izin", "Sakit", "Hadir"],
        labels: {
          style: {
            colors: [""],
            fontSize: "12px",
          },
        },
      },
    });
    setSeries([
      {
        name: "Jumlah",
        data,
      },
    ]);
  };

  useEffect(() => {
    getData();
  }, [startDate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="font-face-jd">
        <header>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <h2 className="text-lg font-face-jd">Selamat Datang...</h2>
        </header>
        <div className="mt-3 flex justify-between flex-wrap">
          <p>Silahkan memilih bulan dan tahun untuk melihat grafik absensi</p>
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
        </div>
        <div>
          {dataSeries.length > 0 && (
            <Chart
              options={options}
              series={series}
              type="bar"
              width="100%"
              height="500"
            />
          )}
          {loading && <h1 className="text-center">Data sedang diproses...</h1>}
          {error && <h1 className="text-center">{error}</h1>}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
