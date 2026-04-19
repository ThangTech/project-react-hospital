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
export { getAllPatients }