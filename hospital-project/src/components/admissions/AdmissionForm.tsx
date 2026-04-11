import type { NhapVien } from "../../types";

type Props = { onSubmit: (data: Partial<NhapVien>) => void };
const AdmissionForm = ({ onSubmit }: Props) => <form onSubmit={() => onSubmit({})}>AdmissionForm</form>;
export default AdmissionForm;
