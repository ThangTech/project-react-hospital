import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Popconfirm, Space, Table, Tag, notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CreateMedicalRecordModal from "../../components/medical-records/CreateMedicalRecordModal";
import EditMedicalRecordModal from "../../components/medical-records/EditMedicalRecordModal";
import MedicalRecordDetailModal from "../../components/medical-records/medical-record-list-page/MedicalRecordDetailModal";
import MedicalRecordFilters from "../../components/medical-records/medical-record-list-page/MedicalRecordFilters";
import MedicalRecordListHeader from "../../components/medical-records/medical-record-list-page/MedicalRecordListHeader";
import { getAllAdmissions } from "../../services/api.admission.service";
import { getAllDoctors } from "../../services/api.doctor.service";
import { createMedicalRecord, deleteMedicalRecord, getAllMedicalRecords, searchMedicalRecords, updateMedicalRecord } from "../../services/api.medical-record.service";
import type { BacSi, HoSoBenhAn, NhapVien } from "../../types";

const ketQuaColor = (kq: string | null): string => {
  if (!kq) return "default";
  const lower = kq.toLowerCase();
  if (lower.includes("tốt") || lower.includes("khỏi")) return "success";
  if (lower.includes("nặng") || lower.includes("xấu")) return "error";
  return "processing";
};

const MedicalRecordListPage = () => {
  const [records, setRecords] = useState<HoSoBenhAn[]>([]);
  const [admissions, setAdmissions] = useState<NhapVien[]>([]);
  const [doctors, setDoctors] = useState<BacSi[]>([]);
  const [loading, setLoading] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [createForm] = Form.useForm();

  const [openEdit, setOpenEdit] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HoSoBenhAn | null>(null);
  const [editForm] = Form.useForm();

  const [openDetail, setOpenDetail] = useState(false);
  const [detailRecord, setDetailRecord] = useState<HoSoBenhAn | null>(null);

  const [filterName, setFilterName] = useState("");
  const [filterBacSiId, setFilterBacSiId] = useState<string | undefined>();

  const fetchAll = async () => {
    setLoading(true);
    const [recList, admList, docList] = await Promise.all([getAllMedicalRecords(), getAllAdmissions(), getAllDoctors()]);
    setRecords(recList);
    setAdmissions(admList);
    setDoctors(docList);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onSearch = async () => {
    setLoading(true);
    try {
      // SP đã tìm kiếm server-side theo tên bệnh nhân, tên bác sĩ, chẩn đoán...
      // Không cần filter thêm phía client
      const keyword = filterName.trim();
      const result = await searchMedicalRecords({ searchTerm: keyword || undefined });
      setRecords(result);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        error?.response?.data?.Message ??
        error?.message ??
        "Tìm kiếm thất bại";
      notification.error({ message: "Lỗi tìm kiếm", description: msg });
    } finally {
      setLoading(false);
    }
  };

  const onResetFilter = () => {
    setFilterName("");
    setFilterBacSiId(undefined);
    fetchAll();
  };

  const onOpenCreate = () => {
    createForm.resetFields();
    setOpenCreate(true);
  };

  const onSaveCreate = async (values: any) => {
    try {
      await createMedicalRecord({
        nhapVienId: values.nhapVienId,
        bacSiPhuTrachId: values.bacSiPhuTrachId,
        tienSuBenh: values.tienSuBenh,
        chanDoanBanDau: values.chanDoanBanDau,
        phuongAnDieuTri: values.phuongAnDieuTri,
      });
      notification.success({ message: "Tạo hồ sơ bệnh án thành công" });
      setOpenCreate(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({ message: "Tạo hồ sơ thất bại", description: error?.response?.data?.message || "Vui lÃ²ng kiá»ƒm tra láº¡i dá»¯ liá»‡u" });
    }
  };

  const onOpenEdit = (record: HoSoBenhAn) => {
    setEditingRecord(record);
    editForm.setFieldsValue({
      bacSiPhuTrachId: record.bacSiPhuTrachId,
      tienSuBenh: record.tienSuBenh,
      chanDoanBanDau: record.chanDoanBanDau,
      phuongAnDieuTri: record.phuongAnDieuTri,
      chanDoanRaVien: record.chanDoanRaVien,
      ketQuaDieuTri: record.ketQuaDieuTri,
    });
    setOpenEdit(true);
  };

  const onSaveEdit = async (values: any) => {
    if (!editingRecord) return;
    try {
      await updateMedicalRecord({
        id: editingRecord.id,
        bacSiPhuTrachId: values.bacSiPhuTrachId,
        tienSuBenh: values.tienSuBenh,
        chanDoanBanDau: values.chanDoanBanDau,
        phuongAnDieuTri: values.phuongAnDieuTri,
        chanDoanRaVien: values.chanDoanRaVien,
        ketQuaDieuTri: values.ketQuaDieuTri,
      });
      notification.success({ message: "Cập nhật hồ sơ thành công" });
      setOpenEdit(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({ message: "Cập nhật thất bại", description: error?.response?.data?.message || "Vui lÃ²ng kiá»ƒm tra láº¡i" });
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteMedicalRecord(id);
      notification.success({ message: "Đã xóa hồ sơ bệnh án" });
      await fetchAll();
    } catch (error: any) {
      notification.error({ message: "Xóa thất bại", description: error?.response?.data?.message || "KhÃ´ng thá»ƒ xÃ³a há»“ sÆ¡ bá»‡nh Ã¡n" });
    }
  };

  const onOpenDetail = (record: HoSoBenhAn) => {
    setDetailRecord(record);
    setOpenDetail(true);
  };

  const getTenBacSi = (id: string) => {
    const bs = doctors.find((d) => d.id === id);
    return bs ? bs.hoTen : id;
  };

  const getTenBenhNhanFromAdm = (nhapVienId: string) => {
    const adm = admissions.find((a) => a.id === nhapVienId);
    return adm ? adm.tenBenhNhan : nhapVienId;
  };

  const columns = [
    { title: "Bệnh nhân", key: "benhNhan", render: (record: HoSoBenhAn) => record.tenBenhNhan || getTenBenhNhanFromAdm(record.nhapVienId ?? "") },
    { title: "Bác sĩ phụ trách", key: "bacSi", render: (record: HoSoBenhAn) => record.tenBacSi || getTenBacSi(record.bacSiPhuTrachId ?? "") },
    {
      title: "Chẩn đoán ban đầu",
      dataIndex: "chanDoanBanDau",
      key: "chanDoanBanDau",
      ellipsis: true,
      render: (v: string | null) => v || <span style={{ color: "#aaa" }}>Chưa có</span>,
    },
    {
      title: "Tiền sử bệnh",
      dataIndex: "tienSuBenh",
      key: "tienSuBenh",
      ellipsis: true,
      render: (v: string | null) => v || <span style={{ color: "#aaa" }}>Không có</span>,
    },
    {
      title: "Phương án điều trị",
      dataIndex: "phuongAnDieuTri",
      key: "phuongAnDieuTri",
      ellipsis: true,
      render: (v: string | null) => v || <span style={{ color: "#aaa" }}>Chưa có</span>,
    },
    {
      title: "Chẩn đoán ra viện",
      dataIndex: "chanDoanRaVien",
      key: "chanDoanRaVien",
      ellipsis: true,
      render: (v: string | null) => v || <span style={{ color: "#aaa" }}>Chưa có</span>,
    },
    {
      title: "Kết quả điều trị",
      dataIndex: "ketQuaDieuTri",
      key: "ketQuaDieuTri",
      render: (v: string | null) =>
        v ? (
          <Tag color={ketQuaColor(v)}>{v}</Tag>
        ) : (
          <Tag color="default">Chưa có</Tag>
        ),
    },
    { title: "Ngày lập", dataIndex: "ngayLap", key: "ngayLap", render: (v: string | null) => (v ? dayjs(v).format("DD/MM/YYYY") : "--") },
    {
      title: "Thao tác",
      key: "action",
      render: (record: HoSoBenhAn) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" onClick={() => onOpenDetail(record)} title="Xem chi tiết" />
          <Button icon={<EditOutlined />} size="small" onClick={() => onOpenEdit(record)} title="Cập nhật" />
          <Popconfirm title="Xóa hồ sơ bệnh án này?" okText="Xóa" cancelText="Hủy" onConfirm={() => onDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <MedicalRecordListHeader onOpenCreate={onOpenCreate} onReload={fetchAll} />

      <MedicalRecordFilters
        filterName={filterName}
        onFilterNameChange={setFilterName}
        onSearch={onSearch}
        onReset={onResetFilter}
      />

      <Table
        rowKey="id"
        loading={loading}
        dataSource={records}
        columns={columns}
        scroll={{ x: 1800 }}
        pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} hồ sơ` }}
      />

      <CreateMedicalRecordModal open={openCreate} form={createForm} admissions={admissions} doctors={doctors} onCancel={() => setOpenCreate(false)} onFinish={onSaveCreate} />

      <EditMedicalRecordModal
        open={openEdit}
        form={editForm}
        doctors={doctors}
        trangThaiNhapVien={editingRecord?.trangThaiNhapVien}
        onCancel={() => setOpenEdit(false)}
        onFinish={onSaveEdit}
      />

      <MedicalRecordDetailModal
        open={openDetail}
        record={detailRecord}
        onClose={() => setOpenDetail(false)}
        getTenBenhNhanFromAdm={getTenBenhNhanFromAdm}
        getTenBacSi={getTenBacSi}
        ketQuaColor={ketQuaColor}
      />
    </Space>
  );
};

export default MedicalRecordListPage;

