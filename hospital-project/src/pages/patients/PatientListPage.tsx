
import { getAllPatients } from "../../services/api.patient.service";
import { useState, useEffect } from "react";
import type { BenhNhan } from "../../types";
const PatientListPage = () => {
       const [dataPatients, setDataPatients] = useState<BenhNhan[]>([]);
       const getAll = async () => {
              const res = await getAllPatients();
              setDataPatients(res);
       }
       useEffect(() => {
              getAll();
       }, []);
       return (
              <>
                     <div>{dataPatients.map((patient) => {
                            return (
                                   <div key={patient.id}>
                                          {patient.hoTen}
                                   </div>
                            )
                     })}</div>
              </>
       )
}
export default PatientListPage;
