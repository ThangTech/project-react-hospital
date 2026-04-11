import type { GiuongBenh } from "../../types";

type Props = { khoaId?: string; onSelect: (bed: GiuongBenh) => void };
const BedPicker = ({ onSelect }: Props) => <div onClick={() => onSelect({} as GiuongBenh)}>BedPicker</div>;
export default BedPicker;
