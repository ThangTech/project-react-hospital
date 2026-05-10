import axios from "./axios.interceptor";
import type { BacSi } from "../types";

// GET /gateway/api/bacsi/doctors
// Response: { success, data: BacSi[], message }
const getAllDoctors = async (): Promise<BacSi[]> => {
  try {
    const res = await axios.get("/gateway/api/bacsi/doctors");
    // Backend trả về ApiResponse<IEnumerable<DoctorDto>>
    return res.data?.data ?? res.data ?? [];
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
