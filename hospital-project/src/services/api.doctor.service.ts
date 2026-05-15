import axios from "./axios.interceptor";
import type { BacSi } from "../types";

const toArray = (data: any) => {
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return [];
};

// GET /gateway/api/bacsi/doctors
// Response: { success, data: BacSi[], message }
const getAllDoctors = async (): Promise<BacSi[]> => {
  try {
    const res = await axios.get("/gateway/api/bacsi/doctors");
    return toArray(res.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

// GET /gateway/api/bacsi/{id}
const getDoctorById = async (id: string): Promise<BacSi | null> => {
  try {
    const res = await axios.get(`/gateway/api/bacsi/${id}`);
    return res.data?.data ?? res.data ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getAllDoctors, getDoctorById };
