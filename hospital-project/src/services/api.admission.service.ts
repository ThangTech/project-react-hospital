import axios from "./axios.interceptor";
import type { NhapVien } from "../types";

const getAllAdmissions = async (): Promise<NhapVien[]> => {
  try {
    const res = await axios.get("/gateway/api/nhapvien/danh-sach");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAdmissionById = async (id: string): Promise<NhapVien | null> => {
  try {
    const res = await axios.get(`/gateway/api/nhapvien/chi-tiet/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createAdmission = async (data: {
  benhNhanId: string;
  giuongId: string;
  khoaId: string;
  lyDoNhap: string;
}) => {
  return axios.post("/gateway/api/nhapvien/nhap-vien-moi", data);
};

const updateAdmission = async (data: {
  id: string;
  lyDoNhap: string;
  trangThai: string;
  ngayXuat?: string | null;
}) => {
  return axios.put("/gateway/api/nhapvien/cap-nhat", data);
};

const confirmDischarge = async (data: {
  id: string;
  ngayXuat?: string | null;
  chanDoanXuatVien: string;
  loiDanBacSi: string;
  ghiChu?: string;
}) => {
  return axios.put("/gateway/api/XuatVien/xac-nhan", data);
};

const getReadyForDischarge = async (): Promise<NhapVien[]> => {
  try {
    const res = await axios.get("/gateway/api/XuatVien/danh-sach-cho");
    const rows = res.data ?? [];
    return rows.map((item: any) => ({
      id: item.nhapVienId,
      benhNhanId: item.benhNhanId ?? "",
      tenBenhNhan: item.tenBenhNhan,
      giuongId: item.giuongId ?? "",
      tenGiuong: item.tenGiuong,
      khoaId: item.khoaId ?? "",
      tenKhoa: item.tenKhoa,
      lyDoNhap: item.lyDoNhap ?? "--",
      ngayNhap: item.ngayNhap,
      ngayXuat: null,
      trangThai: "Chờ xuất viện",
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteAdmission = async (id: string) => {
  return axios.delete(`/gateway/api/nhapvien/xoa/${id}`);
};

const transferBed = async (data: {
  nhapVienId: string;
  giuongMoiId: string;
  lyDoChuyenGiuong: string;
}) => {
  return axios.put("/gateway/api/nhapvien/chuyen-giuong", data);
};

const searchAdmissions = async (params: {
  tenBenhNhan?: string;
  khoaId?: string;
  trangThai?: string;
  tuNgay?: string;
  denNgay?: string;
}): Promise<NhapVien[]> => {
  try {
    const res = await axios.post("/gateway/api/nhapvien/tim-kiem", params);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export {
  getAllAdmissions,
  getAdmissionById,
  createAdmission,
  updateAdmission,
  confirmDischarge,
  getReadyForDischarge,
  deleteAdmission,
  transferBed,
  searchAdmissions,
};
