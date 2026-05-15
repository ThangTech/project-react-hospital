import axios from "./axios.interceptor";
import type { HoSoBenhAn } from "../types";

// GET /gateway/api/medicalrecord/get-all-medical
// Response: trực tiếp array (controller dùng Ok(result))
const getAllMedicalRecords = async (): Promise<HoSoBenhAn[]> => {
  try {
    const res = await axios.get("/gateway/api/medicalrecord/get-all-medical");
    const data = res.data;
    if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data?.data)) {
      return data.data;
    } else if (Array.isArray(data?.Data)) {
      return data.Data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("[getAllMedicalRecords]", error);
    return [];
  }
};

const searchMedicalRecords = async (params: {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<HoSoBenhAn[]> => {
  const res = await axios.post("/gateway/api/medicalrecord/search", {
    searchTerm: params.searchTerm ?? null,
    pageNumber: params.pageNumber ?? 1,
    pageSize: params.pageSize ?? 100,
  });
  // Interceptor đã unwrap ApiResponse → res = { success, data: PagedResult, message }
  // res.data = PagedResult = { data: [...], pageNumber, ... }
  // res.data.data = mảng hồ sơ bệnh án
  let pagedResult = res.data;
  if (!pagedResult) pagedResult = res;

  if (Array.isArray(pagedResult?.data)) return pagedResult.data;
  if (Array.isArray(pagedResult?.Data)) return pagedResult.Data;
  if (Array.isArray(pagedResult)) return pagedResult;
  return [];
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
  return axios.post("/gateway/api/medicalrecord", data);
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
  const { id, ...rest } = data;
  const body = {
    bacSiPhuTrachId: rest.bacSiPhuTrachId ?? null,
    tienSuBenh: rest.tienSuBenh?.trim() || null,
    chanDoanBanDau: rest.chanDoanBanDau?.trim() || null,
    phuongAnDieuTri: rest.phuongAnDieuTri?.trim() || null,
    chanDoanRaVien: rest.chanDoanRaVien?.trim() || null,
    ketQuaDieuTri: rest.ketQuaDieuTri?.trim() || null,
  };
  return axios.put(`/gateway/api/medicalrecord/${id}`, body);
};

const deleteMedicalRecord = async (id: string) => {
  return axios.delete(`/gateway/api/medicalrecord/${id}`);
};

const exportMedicalRecordPdf = async (id: string) => {
  return axios.get(`/gateway/api/medicalrecord/export-pdf/${id}`, { responseType: "blob" });
};

export {
  getAllMedicalRecords,
  searchMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  exportMedicalRecordPdf,
};
