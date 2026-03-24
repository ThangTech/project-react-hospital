interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active:     { label: 'Đang điều trị', className: 'bg-blue-100 text-blue-700' },
  discharged: { label: 'Đã xuất viện',  className: 'bg-gray-100 text-gray-600' },
  pending:    { label: 'Chờ xử lý',     className: 'bg-yellow-100 text-yellow-700' },
  paid:       { label: 'Đã thanh toán', className: 'bg-green-100 text-green-700' },
  unpaid:     { label: 'Chưa thanh toán',className: 'bg-red-100 text-red-600' },
  scheduled:  { label: 'Đã lên lịch',   className: 'bg-purple-100 text-purple-700' },
  completed:  { label: 'Hoàn thành',    className: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'Đã hủy',        className: 'bg-red-100 text-red-500' },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status.toLowerCase()] ?? {
    label: status,
    className: 'bg-gray-100 text-gray-600',
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
