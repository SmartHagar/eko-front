/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import { GetCrud } from "../services/base-url";

const { crud } = GetCrud();

const usePegawai = create(
  devtools((set, get) => ({
    responses: {},
    arrData: [],
    setPegawai: async (search = "", page = "1", limit) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "get",
          url: `/employee`,
          headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, arrData: response.data.data }));
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
    addPegawai: async (item) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "post",
          url: `/employee`,
          headers: { Authorization: `Bearer ${getToken}` },
          data: item,
        });
        set((state) => ({
          arrData: [res.data.data, ...state.arrData],
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
        };
      }
    },
    removePegawai: async (id) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "delete",
          url: `/employee/${id}`,
          headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          arrData: state.arrData.filter((item) => item.id !== id),
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    updatePegawai: async (id, row) => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "put",
          url: `/employee/${id}`,
          headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set((state) => ({
          arrData: state.arrData.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ...row,
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

export default usePegawai;
