import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, ReloadOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Popconfirm, Input, DatePicker, Form, Button } from "antd";
import { getAllPatients } from "../../services/api.patient.service";
import { useState, useEffect } from "react";
import type { BenhNhan } from "../../types";
import { Table } from "antd";
const PatientListPage = () => {
       const [phone, setPhone] = useState('');
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
                     title: 'STT',
                     width: 80,
                     align: 'center' as const,
                     render: (_: any, __: any, index: number) => index + 1,
              },
              {
                     title: 'Mã BN',
                     dataIndex: 'id',
                     width: 300,
                     align: 'center' as const,
              },
              {
                     title: 'Họ tên',
                     dataIndex: 'hoTen',
                     width: 300,
                     align: 'center' as const,
              },
              {
                     title: 'Ngày sinh',
                     dataIndex: 'ngaySinh',
                     width: 300,
                     align: 'center' as const,
              },
              {
                     title: 'Giới tính',
                     dataIndex: 'gioiTinh',
                     width: 100,
                     align: 'center' as const,
              },
              {
                     title: 'Địa chỉ',
                     dataIndex: 'diaChi',
                     width: 200,
                     align: 'center' as const,
              },
              {
                     title: 'Số thẻ bảo hiểm',
                     dataIndex: 'soTheBaoHiem',
                     width: 150,
                     align: 'center' as const,
              },
              {
                     title: 'Mức hưởng',
                     dataIndex: 'mucHuong',
                     width: 120,
                     align: 'center' as const,
                     render: (value: any) => `${(value * 100).toFixed(0)}%`,
              },
              {
                     title: 'Trạng thái',
                     dataIndex: 'trangThai',
                     width: 200,
                     align: 'center' as const,
                     render: (value: any) => {
                            const color = value === 'Đang điều trị' ? 'blue' : 'green';
                            return <span style={{ color }}>{value}</span>;
                     },
              },
              {
                     title: "Thao tác",
                     align: 'center' as const,
                     width: 150,
                     render: (_: any) => (
                            <div style={{ display: "flex", gap: "20px", justifyContent: "end" }}>
                                   <EditOutlined
                                          style={{ cursor: "pointer", color: "green" }}
                                          onClick={() => {
                                                 // setDataUpdate(record);
                                                 // setIsModalUpdate(true);
                                          }}
                                   />
                                   <Popconfirm
                                          title="Bạn muốn xóa người dùng"
                                          description="Chắc chắn muốn xóa"
                                          onConfirm={() => {
                                                 // handleDelete(record._id);
                                          }}
                                          okText="Yes"
                                          cancelText="No"
                                          placement="left"
                                   >
                                          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                                   </Popconfirm>
                            </div>
                     ),

              },
       ];
       return (
              <>
                     <div style={{ display: 'flex', gap: 16, marginBottom: 16, padding: 20, background: '#f5f5f5', borderRadius: 8, alignItems: 'flex-end' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Tên bệnh nhân</span>
                                   <Input placeholder="Tên bệnh nhân" style={{ width: 200 }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Mã bệnh nhân</span>
                                   <Input placeholder="Mã bệnh nhân" style={{ width: 200 }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Năm sinh</span>
                                   <DatePicker placeholder="Chọn ngày" style={{ width: 200 }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Số điện thoại</span>
                                   <Input
                                          prefix={<SearchOutlined />}
                                          placeholder="Nhập số điện thoại"
                                          style={{ width: 200 }}
                                          maxLength={11}
                                          onChange={(e) => {
                                                 const value = e.target.value.replace(/[^0-9]/g, '');
                                                 setPhone(value);
                                          }}
                                   />
                            </div>
                            <div style={{ display: 'flex', justifyContent: "flex-end", gap: 8, width: '100%' }}>
                                   <Button icon={<PlusOutlined />} type="primary">Tạo mới</Button>
                                   <Button icon={<ReloadOutlined />} type="primary">Đặt lại</Button>
                                   <Button icon={<UploadOutlined />}>Nhập Excel</Button>
                                   <Button icon={<DownloadOutlined />}>Xuất Excel</Button>
                            </div>
                     </div>
                     <Table
                            dataSource={dataPatients}
                            columns={columns}
                            style={{ padding: 20 }}
                            pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bệnh nhân` }}
                     />
              </>
       )
}
export default PatientListPage;
