/** @format */

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Search from "../../../components/sekretaris/form/Search";
import Paginate from "../../../components/sekretaris/paginate/Paginate";
import Table from "../../../components/sekretaris/table/Table";
import useJabatan from "../../../store/jabatan";
import From from "./From";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const Jabatan = () => {
  const { arrData, responses, setJabatan, removeJabatan } = useJabatan();
  const [openModal, setOpenModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [dataEdit, setDataEdit] = useState({});
  const [cekEdit, setCekEdit] = useState(true);

  useEffect(() => {
    setJabatan("", page, limit);
  }, [page, limit]);

  const setPesan = (event) => {
    // if (event.judul === "Berhasil") {
    toast.success(event.pesan, {
      duration: 4000,
      position: "top-right",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
    console.log("hallo");
    //   NotificationManager.success(event.pesan, event.judul);
    // }
  };

  const handleEdit = (item) => {
    setCekEdit(true);
    setDataEdit(item);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Yakin menghapus data ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { status } = await removeJabatan(id);
        console.log(status);
        if (status !== "error") {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setJabatan(search, page, limit);
  };

  const headers = ["No", "Nama", "Aksi"];
  const columns = ["name"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-face-jd"
    >
      <Toaster />
      <header>
        <h1 className="text-2xl font-bold">Halaman Jabatan</h1>
      </header>
      <div className="mt-3 flex justify-between flex-wrap">
        <p>Silahkan menambah, merubah dan menghapus data jabatan</p>
        <button
          onClick={() => {
            setOpenModal(true);
            setCekEdit(false);
          }}
          type="button"
          className="text-my-blue hover:text-white border border-my-blue hover:bg-my-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Tambah Data
        </button>
      </div>

      <div className="flex justify-between gap-3 flex-wrap md:flex-nowrap">
        <div className="w-full">
          <Search ket="Cari Data Jabatan" findData={handleSearch} />
        </div>
        <div>
          <select
            onChange={(e) => setLimit(e.target.value)}
            defaultValue={10}
            className="block p-2 w-14 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>

      <div className="mt-2">
        <Table
          headers={headers}
          dataTable={arrData}
          columns={columns}
          setEdit={handleEdit}
          setDelete={handleDelete}
          page={page}
          limit={limit}
        />
      </div>
      {/* paginate */}
      <div className="my-3 flex justify-center">
        <Paginate pageData={responses} setPage={setPage} />
      </div>
      {/* form*/}
      {openModal && (
        <From
          closeModal={setOpenModal}
          dataEdit={dataEdit}
          cekEdit={cekEdit}
          setPesan={setPesan}
        />
      )}
    </motion.div>
  );
};

export default Jabatan;
