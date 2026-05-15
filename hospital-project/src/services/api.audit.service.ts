import axios from "./axios.interceptor";

const normalizePaged = (data: any) => {
  if (Array.isArray(data?.data?.data)) return data.data.data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return [];
};

const getSystemLogs = async () => {
  try {
    const res = await axios.post("/gateway/api/Audit/system-logs", {});
    return normalizePaged(res.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getMedicalRecordLogs = async () => {
  try {
    const res = await axios.post("/gateway/api/Audit/medical-record-logs", {});
    return normalizePaged(res.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAuditByUser = async (userId: string) => {
  try {
    const res = await axios.get(`/gateway/api/Audit/by-user/${userId}`);
    return normalizePaged(res.data);
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
    return normalizePaged(res.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getSystemLogs, getMedicalRecordLogs, getAuditByUser, getAuditByDateRange };
