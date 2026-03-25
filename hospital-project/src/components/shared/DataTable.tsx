import { Table, type TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';

export type { ColumnType };

type DataTableProps<T extends object> = {
  columns: ColumnType<T>[];
  data: T[];
  loading?: boolean;
  rowKey?: string;
  pagination?: TableProps<T>['pagination'];
}

function DataTable<T extends object>({
  columns,
  data,
  loading = false,
  rowKey = 'id',
  pagination = { pageSize: 10 },
}: DataTableProps<T>) {
  return (
    <Table<T>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination}
      size="middle"
      scroll={{ x: 'max-content' }}
    />
  );
}

export default DataTable;
