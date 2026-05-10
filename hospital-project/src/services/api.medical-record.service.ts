import axios from "./axios.interceptor";
import type { HoSoBenhAn } from "../types";

const getAllMedicalRecords = async (): Promise<HoSoBenhAn[]> => {
  try {
    const res = await axios.get("/gateway/api/hosobenhán/get-all");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getMedicalRecordByNhapVienId = async (
  nhapVienId: string
): Promise<HoSoBenhAn | null> => {
  try {
    const res = await axios.get(
      `/gateway/api/hosobenhan/get-by-nhapvien/${nhapVienId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createMedicalRecord = async (data: {
  nhapVienId: string;
  bacSiPhuTrachId: string;
  tienSuBenh?: string;
  chanDoanBanDau?: string;
  phuongAnDieuTri?: string;
  chanDoanRaVien?: string;
  ketQuaDieuTri?: string;
}) => {
  return axios.post("/gateway/api/hosobenhan/tao-moi", data);
};

const updateMedicalRecord = async (data: {
  id: string;
  bacSiPhuTrachId: string;
  tienSuBenh?: string;
  chanDoanBanDau?: string;
  phuongAnDieuTri?: string;
  chanDoanRaVien?: string;
  ketQuaDieuTri?: string;
}) => {
  return axios.put("/gateway/api/hosobenhan/cap-nhat", data);
};

const deleteMedicalRecord = async (id: string) => {
  return axios.delete(`/gateway/api/hosobenhan/xoa/${id}`);
};

const searchMedicalRecords = async (params: {
  tenBenhNhan?: string;
  bacSiId?: string;
}): Promise<HoSoBenhAn[]> => {
  try {
    const res = await axios.post("/gateway/api/hosobenhan/tim-kiem", params);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export {
  getAllMedicalRecords,
  getMedicalRecordByNhapVienId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  searchMedicalRecords,
};
