type Column<T> = { key: keyof T; label: string };
type Props<T> = { columns: Column<T>[]; data: T[] };
const ReportTable = <T,>({ columns, data }: Props<T>) => (
  <table>
    <thead><tr>{columns.map((c) => <th key={String(c.key)}>{c.label}</th>)}</tr></thead>
    <tbody>{data.map((row, i) => <tr key={i}>{columns.map((c) => <td key={String(c.key)}>{String(row[c.key] ?? "")}</td>)}</tr>)}</tbody>
  </table>
);
export default ReportTable;
