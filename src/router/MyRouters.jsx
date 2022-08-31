/** @format */

import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthLogin from "../pages/auth/AuthLogin";
import { useNavigate } from "react-router-dom";
// Pages Sekretaris
import Absensi from "../pages/sekretaris/absensi/Absensi";
import Dashboard from "../pages/sekretaris/dashboard/Dashboard";
import IndexSekretaris from "../pages/sekretaris/Index";
import Jabatan from "../pages/sekretaris/jabatan/Jabatan";
import Pegawai from "../pages/sekretaris/pegawai/Pegawai";
// Pages Ketua

// Cek Login & Role
import useRole from "../store/role";
import NoMatch from "../pages/sekretaris/NoMatch";
import { AnimatePresence } from "framer-motion";

const MyRouters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { getRole } = useRole();

  useEffect(() => {
    getRole().then((res) => {
      if (res.status === "error") {
        navigate("/");
      } else {
        if (res.data.role === "admin") {
          const cek = pathname.includes("sekretaris");
          if (!cek) {
            navigate("/sekretaris/dashboard");
          }
        }
        if (res.data.role === "ketua") {
          navigate("/ketua");
        }
      }
    });
  }, []);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" index element={<AuthLogin />} />
        <Route path="sekretaris" element={<IndexSekretaris />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jabatan" element={<Jabatan />} />
          <Route path="pegawai" element={<Pegawai />} />
          <Route path="absensi" element={<Absensi />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default MyRouters;
