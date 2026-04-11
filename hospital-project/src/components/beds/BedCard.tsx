import type { GiuongBenh } from "../../types";

type Props = { bed: GiuongBenh };
const BedCard = ({ bed }: Props) => <div>{bed.tenGiuong}</div>;
export default BedCard;
