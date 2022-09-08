/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../store/login";
import "./style.css";

const AuthLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const { setLogin } = useLogin();
  const [error, setError] = useState("");

  useEffect(() => {
    const getRole = JSON.parse(localStorage.getItem("role"));
    if (getRole === "admin") {
      navigate("/sekretaris");
    } else if (getRole === "ketua") {
      navigate("/ketua");
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const item = { email, password };
    const dtLogin = await setLogin(item);
    if (dtLogin.status === "berhasil") {
      localStorage.setItem("token", JSON.stringify(dtLogin.data.access_token));
      localStorage.setItem("role", JSON.stringify(dtLogin.data.user.role));
      const role = dtLogin.data.user.role;
      if (role === "admin") {
        navigate("sekretaris/dashboard");
      }
    }
    if (dtLogin.status === "error") {
      console.log(dtLogin.error.message);
      setError(dtLogin.error.message);
    }
  };

  return (
    <div className="myBg-3">
      <div className="absolute top-1/4 left-0 right-0">
        <div className="relative z-0 mb-6 w-full">
          <div className="p-6 max-w-sm rounded-lg  border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto">
            <h1 className="text-center text-xl font-bold font-face-jd">
              Selamat Datang di website Puskesmas Abun
            </h1>
            <hr className="my-3 h-px bg-my-blue border-0 dark:bg-gray-700"></hr>
            <h1 className="text-center text-lg font-face-jd">
              Silahkan login untuk akses selanjutnya
            </h1>
            {error && (
              <h1 className="text-center text-sm text-red-700 font-face-jd">
                {error}
              </h1>
            )}
            <form onSubmit={submitForm}>
              <div className="relative z-0 mb-6 w-full group mt-8">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
