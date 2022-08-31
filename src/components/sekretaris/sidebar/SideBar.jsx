/** @format */

import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from "../../../store/login";
import OutsideClick from "../../OutsideClick";
import "./style.css";
import { AnimatePresence, motion } from "framer-motion";

const SideBar = () => {
  const navigate = useNavigate();
  const { setLogout } = useLogin();
  const [showMenu, setShowMenu] = useState(false);

  const heandelLogout = async () => {
    const res = setLogout();
    if (res.status === "berhasil") {
      navigate("/");
    }
  };

  const handleClickOutside = () => {
    setShowMenu(false);
  };

  const ref = OutsideClick(handleClickOutside);

  return (
    <div className="flex" aria-label="Sidebar">
      <AnimatePresence>
        <motion.div
          layout
          className={showMenu ? "flex w-52 z-20" : "hidden md:flex md:w-64"}
        >
          <aside className="">
            <div className="overflow-y-auto py-4 fixed w-52 md:w-64 top-0 bg-my-white shadow-lg rounded dark:bg-gray-800 h-screen">
              <header className="mb-4">
                <div className="flex flex-col items-center font-face-jd font-bold">
                  <h1 className="text-2xl">Puskesmas</h1>
                  <h1 className="text-2xl">Abun</h1>
                  <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 dark:bg-gray-700"></hr>
                </div>
              </header>
              <ul className="space-y-2 font-face-jost ">
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/sekretaris/dashboard"
                    className="flex items-center py-2 pl-6 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/sekretaris/jabatan"
                    className="flex items-center py-2 pl-6 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Jabatan
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/sekretaris/pegawai"
                    className="flex items-center py-2 pl-6 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Pegawai
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/sekretaris/absensi"
                    className="flex items-center py-2 pl-6 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Absensi
                    </span>
                  </NavLink>
                </li>
              </ul>
              <footer
                style={{
                  position: "absolute",
                  bottom: 10,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    left: "40%",
                  }}
                >
                  <div
                    onClick={heandelLogout}
                    className="flex items-center cursor-pointer text-gray-800 hover:text-my-blue hover:border-b border-my-blue font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                      />
                    </svg>
                    <span className="ml-3">Logout</span>
                  </div>
                </div>
              </footer>
            </div>
          </aside>
        </motion.div>
      </AnimatePresence>
      <div
        ref={ref}
        className="rounded md:hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SideBar;
