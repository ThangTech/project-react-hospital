import axios from "./axios.interceptor";

const getBedCapacityReport = async (params?: { tuNgay?: string; denNgay?: string; khoaId?: string }) => {
  try {
    const res = await axios.post("/gateway/api/Report/bed-capacity", params ?? {});
    return res.data?.data ?? res.data ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTreatmentCostReport = async (params?: { tuNgay?: string; denNgay?: string; khoaId?: string }) => {
  try {
    const res = await axios.post("/gateway/api/Report/treatment-cost", params ?? {});
    return res.data?.data ?? res.data ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const exportBedCapacityExcel = async (params?: Record<string, unknown>) =>
  axios.post("/gateway/api/Report/bed-capacity/export-excel", params ?? {}, { responseType: "blob" });

const exportBedCapacityPdf = async (params?: Record<string, unknown>) =>
  axios.post("/gateway/api/Report/bed-capacity/export-pdf", params ?? {}, { responseType: "blob" });

const exportTreatmentCostExcel = async (params?: Record<string, unknown>) =>
  axios.post("/gateway/api/Report/treatment-cost/export-excel", params ?? {}, { responseType: "blob" });

const exportTreatmentCostPdf = async (params?: Record<string, unknown>) =>
  axios.post("/gateway/api/Report/treatment-cost/export-pdf", params ?? {}, { responseType: "blob" });

export {
  getBedCapacityReport,
  getTreatmentCostReport,
  exportBedCapacityExcel,
  exportBedCapacityPdf,
  exportTreatmentCostExcel,
  exportTreatmentCostPdf,
};
