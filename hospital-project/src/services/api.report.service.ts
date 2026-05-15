import axios from "./axios.interceptor";

const unwrapData = (data: any) => {
  if (data?.data) return data.data;
  if (data) return data;
  return null;
};

const getBedCapacityReport = async (params?: { tuNgay?: string; denNgay?: string; khoaId?: string }) => {
  try {
    const res = await axios.post("/gateway/api/Report/bed-capacity", params ?? {});
    return unwrapData(res.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTreatmentCostReport = async (params?: { tuNgay?: string; denNgay?: string; khoaId?: string }) => {
  try {
    const res = await axios.post("/gateway/api/Report/treatment-cost", params ?? {});
    return unwrapData(res.data);
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
