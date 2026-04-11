import type { BenhNhan } from "../../types";

type Props = { initial?: Partial<BenhNhan>; onSubmit: (data: BenhNhan) => void };
const PatientForm = ({ onSubmit }: Props) => <form onSubmit={() => onSubmit({} as BenhNhan)}>PatientForm</form>;
export default PatientForm;
