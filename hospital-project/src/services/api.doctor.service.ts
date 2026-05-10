import axios from "./axios.interceptor";
import type { BacSi } from "../types";

const getAllDoctors = async (): Promise<BacSi[]> => {
  try {
    const res = await axios.get("/gateway/api/bacsi/get-all");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getDoctorById = async (id: string): Promise<BacSi | null> => {
  try {
    const res = await axios.get(`/gateway/api/bacsi/get-by-id/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getAllDoctors, getDoctorById };
