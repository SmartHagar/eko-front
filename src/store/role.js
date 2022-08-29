/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import { GetApi } from "../services/base-url";

const { api } = GetApi();

const useRole = create(
  devtools((set, get) => ({
    role: [],
    getRole: async () => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      if (!getToken) {
        return {
          status: "error",
        };
      }
      if (getToken) {
        try {
          const response = await api.get(`/me`, {
            headers: { Authorization: `Bearer ${getToken}` },
          });
          return {
            status: "berhasil",
            data: response.data,
          };
        } catch (error) {
          // remove localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          return {
            status: "error",
            error: error.response.data,
          };
        }
      }
    },
  }))
);

export default useRole;
