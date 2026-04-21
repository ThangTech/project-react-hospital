
import { getAllPatients } from "../../services/api.patient.service";
import { useState, useEffect } from "react";
import type { BenhNhan } from "../../types";
import { Table } from "antd";
const PatientListPage = () => {
       const [dataPatients, setDataPatients] = useState<BenhNhan[]>([]);
       const getAll = async () => {
              const res = await getAllPatients();
              setDataPatients(res);
       }
       useEffect(() => {
              getAll();
       }, []);
       const columns = [
              {
                     title: 'ID',
                     dataIndex: 'id',
                     width: 200,
              },
              {
                     title: 'Họ tên',
                     dataIndex: 'hoTen',
                     width: 150,
              },
              {
                     title: 'Ngày sinh',
                     dataIndex: 'ngaySinh',
                     width: 120,
              },
              {
                     title: 'Giới tính',
                     dataIndex: 'gioiTinh',
                     width: 100,
              },
              {
                     title: 'Địa chỉ',
                     dataIndex: 'diaChi',
                     width: 200,
              },
              {
                     title: 'Số thẻ bảo hiểm',
                     dataIndex: 'soTheBaoHiem',
                     width: 150,
              },
              {
                     title: 'Mức hưởng',
                     dataIndex: 'mucHuong',
                     width: 120,
                     render: (value: any) => `${(value * 100).toFixed(0)}%`,
              },
              {
                     title: 'Trạng thái',
                     dataIndex: 'trangThai',
                     width: 120,
                     render: (value: any) => {
                            const color = value === 'Đang điều trị' ? 'blue' : 'green';
                            return <span style={{ color }}>{value}</span>;
                     },
              },
       ];
       return (
              <>
                     <Table dataSource={dataPatients} columns={columns} />;
              </>
       )
}
export default PatientListPage;
