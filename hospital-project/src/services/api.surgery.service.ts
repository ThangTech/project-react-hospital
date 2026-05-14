import axios from "./axios.interceptor";
import type { LichPhauThuat } from "../types";

type SurgeryPayload = {
  nhapVienId: string;
  bacSiChinhId: string;
  loaiPhauThuat: string;
  ekip: string;
  ngay: string;
  phongMo: string;
  chiPhi: number;
  trangThai: string;
};

const getAllSurgeries = async (): Promise<LichPhauThuat[]> => {
  try {
    const res = await axios.get("/gateway/api/Surgery/get-all-surgery");
    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchSurgeries = async (keyword: string): Promise<LichPhauThuat[]> => {
  try {
    const res = await axios.post("/gateway/api/Surgery/search", { searchTerm: keyword });
    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createSurgery = async (data: SurgeryPayload) =>
  axios.post("/gateway/api/Surgery", data);

const updateSurgery = async (data: SurgeryPayload & { id: string }) =>
  axios.put(`/gateway/api/Surgery/${data.id}`, data);

const deleteSurgery = async (id: string) =>
  axios.delete(`/gateway/api/Surgery/${id}`);

export { getAllSurgeries, searchSurgeries, createSurgery, updateSurgery, deleteSurgery };
