import type { HoSoBenhAn } from "../../types";

type Props = { initial?: Partial<HoSoBenhAn>; onSubmit: (data: Partial<HoSoBenhAn>) => void };
const MedicalRecordForm = ({ onSubmit }: Props) => <form onSubmit={() => onSubmit({})}>MedicalRecordForm</form>;
export default MedicalRecordForm;
