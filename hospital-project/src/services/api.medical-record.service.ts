import axios from "./axios.interceptor";
import type { HoSoBenhAn } from "../types";

// GET /gateway/api/medicalrecord/get-all-medical
// Response: trực tiếp array (controller dùng Ok(result))
const getAllMedicalRecords = async (): Promise<HoSoBenhAn[]> => {
  try {
    const res = await axios.get("/gateway/api/medicalrecord/get-all-medical");
    return res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// POST /gateway/api/medicalrecord/search
// Body: { searchTerm, pageNumber, pageSize }
// Response: { success, data: { data: HoSoBenhAn[], ... }, message }
const searchMedicalRecords = async (params: {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<HoSoBenhAn[]> => {
  try {
    const res = await axios.post("/gateway/api/medicalrecord/search", {
      searchTerm: params.searchTerm,
      pageNumber: params.pageNumber ?? 1,
      pageSize: params.pageSize ?? 100,
    });
    // Response: ApiResponse<PagedResult<MedicalRecordDto>>
    const pagedResult = res.data?.data;
    return pagedResult?.data ?? pagedResult?.items ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// POST /gateway/api/medicalrecord
// Body: MedicalRecordDto
// Response: { success, data: MedicalRecordDto, message }
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

// PUT /gateway/api/medicalrecord/{id}
// Body: MedicalRecordDto
// Response: { success, data: MedicalRecordDto, message }
// Quan trọng: dùng ?? null để tránh undefined bị JSON.stringify bỏ qua key
// SP dùng ISNULL(@param, col) nên cần gửi giá trị thực để cập nhật
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

// DELETE /gateway/api/medicalrecord/{id}
// Response: { success, message }
const deleteMedicalRecord = async (id: string) => {
  return axios.delete(`/gateway/api/medicalrecord/${id}`);
};

export {
  getAllMedicalRecords,
  searchMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
};
