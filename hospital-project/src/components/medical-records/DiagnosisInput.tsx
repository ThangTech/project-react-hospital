type Props = { value?: string; onChange: (val: string) => void };
const DiagnosisInput = ({ onChange }: Props) => <input placeholder="Nhập chẩn đoán..." onChange={(e) => onChange(e.target.value)} />;
export default DiagnosisInput;
