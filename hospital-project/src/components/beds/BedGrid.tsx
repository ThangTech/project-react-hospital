import type { GiuongBenh } from "../../types";

type Props = { beds: GiuongBenh[] };
const BedGrid = ({ beds }: Props) => <div>{beds.length} giường</div>;
export default BedGrid;
