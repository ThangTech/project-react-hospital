import axios from "./axios.interceptor";
import type { GiuongBenh, KhoaPhong } from "../types";

const getAllBeds = async (): Promise<GiuongBenh[]> => {
  try {
    const res = await axios.get("/gateway/api/giuongbenh/get-all");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteBed = async (id: string) => {
  return axios.delete(`/gateway/api/giuongbenh/delete-giuong/${id}`);
};

const createBed = async (data: {
  khoaId: string;
  tenGiuong: string;
  loaiGiuong: string;
  giaTien: number;
  trangThai: string;
}) => {
  return axios.post("/gateway/api/giuongbenh/create", data);
};

const updateBed = async (data: {
  id: string;
  khoaId: string;
  tenGiuong: string;
  loaiGiuong: string;
  giaTien: number;
  trangThai: string;
}) => {
  return axios.put("/gateway/api/giuongbenh/update-giuong", data);
};

const getAllDepartments = async (): Promise<KhoaPhong[]> => {
  try {
    const res = await axios.get("/gateway/api/khoaphong/get-all");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteDepartment = async (id: string) => {
  return axios.delete(`/gateway/api/khoaphong/delete/${id}`);
};

const createDepartment = async (data: {
  tenKhoa: string;
  loaiKhoa: string;
  soGiuongTieuChuan: number;
}) => {
  return axios.post("/gateway/api/khoaphong/create", data);
};

const updateDepartment = async (data: {
  id: string;
  tenKhoa: string;
  loaiKhoa: string;
  soGiuongTieuChuan: number;
}) => {
  return axios.put("/gateway/api/khoaphong/update", data);
};

const searchDepartments = async (keyword: string): Promise<KhoaPhong[]> => {
  try {
    const res = await axios.get(`/gateway/api/khoaphong/search?keyword=${encodeURIComponent(keyword)}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export {
  getAllBeds,
  deleteBed,
  createBed,
  updateBed,
  getAllDepartments,
  deleteDepartment,
  createDepartment,
  updateDepartment,
  searchDepartments,
};
