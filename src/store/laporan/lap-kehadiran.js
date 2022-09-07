/** @format */

import moment from "moment/moment";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { GetLaporan } from "../../services/base-url";

const { laporan } = GetLaporan();

const useLapKehadiran = create(
  devtools((set, get) => ({
    responses: {},
    arrData: [],
    setExcelHarian: async (date = "") => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await laporan({
          method: "get",
          url: `/excel/attedance-harian`,
          responseType: "arraybuffer",
          headers: { Authorization: `Bearer ${getToken}` },
          params: {
            date,
          },
        });

        let blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        // url = window.URL.createObjectURL(blob);

        const myDate = moment(date).format("DD MMMM yyyy");

        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Absen ${myDate}.xlsx`;
        link.click();

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

export default useLapKehadiran;
