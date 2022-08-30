/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import { GetCrud } from "../services/base-url";

const { crud } = GetCrud();

const useJabatan = create(
  devtools((set, get) => ({
    responses: {},
    setJabatan: async (search = "", page = "2", limit) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "get",
          url: `/position`,
          headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
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
    addJabatan: async (name) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "post",
          url: `/position`,
          headers: { Authorization: `Bearer ${getToken}` },
          data: { name },
        });
        set((state) => ({ jabatan: [response.data.data, ...state.jabatan] }));
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
    removeJabatan: async (id) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "delete",
          url: `/position/${id}`,
          headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          jabatan: state.jabatan.filter((item) => item.id !== id),
        }));
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
    updateItem: async (id, name) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "put",
          url: `/position/${id}`,
          headers: { Authorization: `Bearer ${getToken}` },
          data: { name },
        });
        set((state) => ({
          jabatan: state.jabatan.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                name,
              };
            } else {
              return item;
            }
          }),
        }));
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
  }))
);

export default useJabatan;
