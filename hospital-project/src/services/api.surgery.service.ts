import axios from "./axios.interceptor";
import type { LichPhauThuat } from "../types";

const toArray = (data: any) => {
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return [];
};

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
    return toArray(res.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchSurgeries = async (keyword: string): Promise<LichPhauThuat[]> => {
  try {
    const res = await axios.post("/gateway/api/Surgery/search", { searchTerm: keyword });
    return toArray(res.data);
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
