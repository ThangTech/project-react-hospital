import axios from "./axios.interceptor";

const getSystemLogs = async () => {
  try {
    const res = await axios.post("/gateway/api/Audit/system-logs", {});
    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getMedicalRecordLogs = async () => {
  try {
    const res = await axios.post("/gateway/api/Audit/medical-record-logs", {});
    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAuditByUser = async (userId: string) => {
  try {
    const res = await axios.get(`/gateway/api/Audit/by-user/${userId}`);
    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAuditByDateRange = async (tuNgay?: string, denNgay?: string) => {
  try {
    const params: Record<string, string> = {};
    if (tuNgay) params.tuNgay = tuNgay;
    if (denNgay) params.denNgay = denNgay;
    const res = await axios.get("/gateway/api/Audit/by-date-range", { params });
    return res.data?.data ?? res.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getSystemLogs, getMedicalRecordLogs, getAuditByUser, getAuditByDateRange };
