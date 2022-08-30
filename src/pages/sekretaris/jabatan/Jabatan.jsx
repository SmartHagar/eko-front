/** @format */

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Search from "../../../components/sekretaris/form/Search";
import Paginate from "../../../components/sekretaris/paginate/Paginate";
import Table from "../../../components/sekretaris/table/Table";
import useJabatan from "../../../store/jabatan";
import From from "./From";

const Jabatan = () => {
  const { jabatan, responses, setJabatan, removeJabatan } = useJabatan();
  const [openModal, setOpenModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [dataEdit, setDataEdit] = useState({});
  const [cekEdit, setCekEdit] = useState(true);

  useEffect(() => {
    setJabatan("", page, limit);
  }, [page, limit]);

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
    <div className="font-face-jd">
      <header>
        <h1 className="text-2xl font-bold">Halaman Jabatan</h1>
      </header>
      <div className="mt-3 flex justify-between">
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

      <div>
        <Search ket="Cari Data Jabatan" findData={handleSearch} />
      </div>

      <div className="mt-3">
        <Table
          headers={headers}
          dataTable={responses}
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
        <From closeModal={setOpenModal} dataEdit={dataEdit} cekEdit={cekEdit} />
      )}
    </div>
  );
};

export default Jabatan;
