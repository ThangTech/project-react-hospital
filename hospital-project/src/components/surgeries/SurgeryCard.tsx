import type { LichPhauThuat } from "../../types";

type Props = { surgery: LichPhauThuat };
const SurgeryCard = ({ surgery }: Props) => <div>{surgery.loaiPhauThuat}</div>;
export default SurgeryCard;
