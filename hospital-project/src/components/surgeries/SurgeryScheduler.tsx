import type { LichPhauThuat } from "../../types";

type Props = { surgeries: LichPhauThuat[] };
const SurgeryScheduler = ({ surgeries }: Props) => <div>{surgeries.length} ca phẫu thuật</div>;
export default SurgeryScheduler;
