import type { BenhNhan } from "../../types";

type Props = { patient: BenhNhan };
const PatientCard = ({ patient }: Props) => <div>{patient.hoTen}</div>;
export default PatientCard;
