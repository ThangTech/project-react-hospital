import axios from "./axios.interceptor";
import type { HoaDon } from "../types";

const getAllInvoices = async (): Promise<HoaDon[]> => {
  try {
    const res = await axios.get("/gateway/api/HoaDon/lay-tat-ca");
    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getInvoicePreview = async (nhapVienId: string) => {
  try {
    const res = await axios.get(`/gateway/api/HoaDon/xem-truoc/${nhapVienId}`);
    return res.data?.data ?? res.data ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createInvoice = async (nhapVienId: string) =>
  axios.post("/gateway/api/HoaDon/tao-moi", { nhapVienId });

const payInvoice = async (id: string) =>
  axios.put("/gateway/api/HoaDon/thanh-toan", { id });

const deleteInvoice = async (id: string) =>
  axios.delete(`/gateway/api/HoaDon/xoa/${id}`);

const exportInvoicePdf = async (id: string) =>
  axios.get(`/gateway/api/HoaDon/export-pdf/${id}`, { responseType: "blob" });

export { getAllInvoices, getInvoicePreview, createInvoice, payInvoice, deleteInvoice, exportInvoicePdf };
