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

export { getAllPatients, createPatient }