import type { BenhNhan } from "../types";
import axios from "./axios.interceptor";
const getAllPatients = async (): Promise<BenhNhan[]> => {
       try {
              const url = "/gateway/api/benhnhan/get-all";
              const res = await axios.get<BenhNhan[]>(url)
              return res.data;
       } catch (error) {
              console.log(error)
              return [];
       }
}

const createPatient = async (formData: FormData): Promise<BenhNhan | null> => {
       try {
              const url = "/gateway/api/benhnhan/create";
              const res = await axios.post<BenhNhan>(url, formData, {
                     headers: {
                            "Content-Type": "multipart/form-data",
                     },
              });
              return res.data;
       } catch (error) {
              console.log(error);
              return null;
       }
};
const updatePatient = async (id: string, formData: FormData): Promise<BenhNhan | null> => {
       try {
              formData.append("id", id);
              const url = "/gateway/api/benhnhan/update";
              const res = await axios.put<BenhNhan>(url, formData, {
                     headers: {
                            "Content-Type": "multipart/form-data",
                     },
              });
              return res.data;
       } catch (error) {
              console.log(error);
              return null;
       }
};
const deletePatient = async(id: string) => {
       const url = `/gateway/api/benhnhan/delete/${id}`;
       const res = axios.delete(url);
       return res;
}

const searchPatients = async (params: {
       pageIndex?: number;
       pageSize?: number;
       hoTen?: string;
       diaChi?: string;
       soTheBaoHiem?: string;
       id?: string;
       namSinh?: number;
}): Promise<{ items: BenhNhan[]; totalRecords: number } | null> => {
       try {
              const url = "/gateway/api/benhnhan/search";
              const res = await axios.post(url, params);
              return {
                     items: res.data.items,
                     totalRecords: res.data.totalRecords
              };
       } catch (error) {
              console.log(error);
              return null;
       }
};
const exportExcelPatient = async () => {
       const url = "/gateway/api/benhnhan/export-excel";
       const res = await axios.get(url, { responseType: "blob" });

       // Tạo link ảo để trigger download
       const blob = new Blob([res.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
       });
       const link = document.createElement("a");
       link.href = URL.createObjectURL(blob);
       link.download = `DanhSachBenhNhan_${new Date().toISOString().slice(0, 10)}.xlsx`;
       link.click();
       URL.revokeObjectURL(link.href);
}
export { getAllPatients, createPatient, updatePatient, deletePatient, searchPatients, exportExcelPatient }