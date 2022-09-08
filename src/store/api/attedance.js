/** @format */

import moment from "moment/moment";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { GetApi } from "../../services/base-url";

const { api } = GetApi();

const useApiAttedance = create(
  devtools((set, get) => ({
    responses: {},
    arrData: [],
    setAttedanceBulanan: async (bulan, tahun) => {
      try {
        const response = await api({
          method: "get",
          url: `/attedance-bulanan`,
          params: {
            bulan,
            tahun,
          },
        });
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

export default useApiAttedance;
