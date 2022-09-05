/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import { AuthUser } from "../services/base-url";

const { auth } = AuthUser();

const useLogin = create(
  devtools((set, get) => ({
    login: [],
    setLogin: async (item) => {
      try {
        const response = await auth.post(`/login`, item);
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setLogout: async () => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await auth({
          method: "post",
          url: `/logout`,
          headers: { Authorization: `Bearer ${getToken}` },
        });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useLogin;
