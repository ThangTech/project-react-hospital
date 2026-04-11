type Props = { title: string; children: React.ReactNode };
const ChartCard = ({ title, children }: Props) => <div><h3>{title}</h3>{children}</div>;
export default ChartCard;
