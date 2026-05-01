import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, ReloadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Popconfirm, Input, DatePicker, Button, notification, Tooltip } from "antd";
import { deletePatient, exportExcelPatient, getAllPatients, searchPatients } from "../../services/api.patient.service";
import { useState, useEffect } from "react";
import type { BenhNhan } from "../../types";
import { Table } from "antd";
import dayjs from "dayjs";
import AddPatientModal from "../../components/patients/AddPatientModal";
import UpdatePatientModal from "../../components/patients/UpdatePatientModal";
import { useNavigate } from "react-router-dom";
const PatientListPage = () => {
       const navigate = useNavigate();
       const [address, setAddress] = useState('');
       const [name, setName] = useState('');
       const [id, setId] = useState('');
       const [date, setDate] = useState<string>('');
       const [dataPatients, setDataPatients] = useState<BenhNhan[]>([]);
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [dataUpdate, setDataUpdate] = useState<BenhNhan | null>(null);
       const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
       const [totalRecords, setTotalRecords] = useState(0);
       const [pageIndex, setPageIndex] = useState(1);
       const [pageSize, setPageSize] = useState(10);
       const getAll = async () => {
              const res = await getAllPatients();
              setDataPatients(res);
       }
       useEffect(() => {
              getAll();
       }, [id, name, address, date]);
       const columns = [
              {
                     title: 'STT',
                     width: 80,
                     align: 'center' as const,
                     render: (_: any, __: any, index: number) => (pageIndex - 1) * pageSize + index + 1,
              },
              {
                     title: 'Mã BN',
                     dataIndex: 'id',
                     width: 300,
                     align: 'center' as const,
                     render: (record: any) => {
                            return (
                                   <>
                                          <Tooltip title="Ấn vào để xem chi tiết bệnh nhân" placement="top">
                                                 <a href="#" style={{ color: "black", textDecoration: "underline" }}
                                                        onClick={() => {
                                                               navigate(`/dashboard/patients/${record}`);
                                                        }}>
                                                        {record}
                                                 </a>
                                          </Tooltip>
                                   </>
                            )
                     }
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
                     render: (record: any) => (
                            <div style={{ display: "flex", gap: "20px", justifyContent: "end" }}>
                                   <EditOutlined
                                          style={{ cursor: "pointer", color: "green" }}
                                          onClick={() => {
                                                 setDataUpdate(record);
                                                 setIsModalUpdateOpen(true);
                                          }}
                                   />
                                   <Popconfirm
                                          title="Bạn muốn xóa người dùng"
                                          description="Chắc chắn muốn xóa"
                                          onConfirm={() => {
                                                 handleDelete(record.id);
                                          }}
                                          okText="Đồng ý"
                                          cancelText="Hủy"
                                          placement="left"
                                   >
                                          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                                   </Popconfirm>
                            </div>
                     ),

              },
       ];
       const resetInput = () => {
              setName("");
              setDate("");
              setId("");
              setAddress("");
              setPageIndex(1);
              setPageSize(10);
              setTotalRecords(0);
              // getAll();
       };
       const addPatient = () => {
              setIsModalOpen(true);
       }
       const handleDelete = async (id: string) => {
              const res = await deletePatient(id);
              if (res) {
                     notification.success({
                            message: "Xóa bệnh nhân",
                            description: "Xóa thành công"
                     })
                     await getAll();
              }
              else {
                     notification.error({
                            message: "Xóa bệnh nhân",
                            description: "Xóa thất bại"
                     })
              }
       }
       const searchPatient = async () => {
              const namSinh = date ? parseInt(dayjs(date).format("YYYY")) : undefined;
              const res = await searchPatients({
                     pageIndex,
                     pageSize,
                     hoTen: name || undefined,
                     diaChi: address || undefined,
                     soTheBaoHiem: undefined,
                     id: id || undefined,
                     namSinh,
              });
              if (res) {
                     setDataPatients(res.items);
                     setTotalRecords(res.totalRecords);
              }
       }
       const exportExcel = async () => {
              try {
                     await exportExcelPatient();
                     notification.success({
                            message: "Xuất excel cho danh sách bệnh nhân",
                            description: "Xuất file thành công"
                     })

              } catch (error) {
                     console.log(error);
                     notification.error({
                            message: "Xuất excel cho danh sách bệnh nhân",
                            description: "Xuất file thất bại"
                     })
              }
       }
       return (
              <>
                     <div style={{ display: 'flex', gap: 16, marginBottom: 16, padding: 20, background: '#f5f5f5', borderRadius: 8, alignItems: 'flex-end' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Tên bệnh nhân</span>
                                   <Input placeholder="Tên bệnh nhân" style={{ width: 200 }} value={name} onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Mã bệnh nhân</span>
                                   <Input placeholder="Mã bệnh nhân" style={{ width: 200 }} value={id} onChange={(event) => setId(event.target.value)} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Năm sinh</span>
                                   <DatePicker placeholder="Chọn ngày" style={{ width: 200 }} value={date ? dayjs(date) : null} format="YYYY-MM-DD"
                                          onChange={(date, dateString) => {
                                                 setDate(date ? (dateString as string) : "");
                                          }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                   <span>Địa chỉ</span>
                                   <Input placeholder="Địa chỉ" style={{ width: 200 }} value={address} onChange={(event) => setAddress(event.target.value)} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: "flex-end", gap: 8, width: '100%' }}>
                                   <Button icon={<PlusOutlined />} type="primary" onClick={addPatient}>Tạo mới</Button>
                                   <Button icon={<ReloadOutlined />} type="primary" onClick={resetInput}>Đặt lại</Button>
                                   <Button icon={<SearchOutlined />} color="cyan" onClick={searchPatient}>Tìm kiếm</Button>
                                   <Button icon={<DownloadOutlined />} onClick={exportExcel}>Xuất Excel</Button>
                            </div>
                     </div>
                     <Table
                            dataSource={dataPatients}
                            columns={columns}
                            style={{ padding: 20 }}
                            pagination={{
                                   current: pageIndex,
                                   pageSize: pageSize,
                                   showSizeChanger: true,
                                   showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bệnh nhân`,
                                   total: totalRecords,
                                   onChange: (page, size) => {
                                          setPageIndex(page);
                                          setPageSize(size);
                                          if (name || id || date || address) {
                                                 const namSinh = date ? parseInt(dayjs(date).format("YYYY")) : undefined;
                                                 searchPatients({
                                                        pageIndex: page,
                                                        pageSize: size,
                                                        hoTen: name || undefined,
                                                        id: id || undefined,
                                                        namSinh,
                                                        diaChi: address || undefined,
                                                 }).then(res => {
                                                        if (res) {
                                                               setDataPatients(res.items);
                                                               setTotalRecords(res.totalRecords);
                                                        }
                                                 });
                                          }
                                   }
                            }}
                     />
                     <AddPatientModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            onSuccess={getAll}
                     />
                     <UpdatePatientModal
                            dataUpdate={dataUpdate}
                            setDataUpdate={setDataUpdate}
                            isModalUpdateOpen={isModalUpdateOpen}
                            setIsModalUpdateOpen={setIsModalUpdateOpen}
                            onSuccess={getAll}
                            id={id}
                            setId={setId}

                     />
              </>
       )

}
export default PatientListPage;
