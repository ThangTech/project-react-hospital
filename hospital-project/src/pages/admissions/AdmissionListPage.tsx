import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { GiuongBenh, KhoaPhong, NhapVien, BenhNhan } from "../../types";
import {
  createAdmission,
  deleteAdmission,
  getAllAdmissions,
  searchAdmissions,
  transferBed,
  updateAdmission,
} from "../../services/api.admission.service";
import { getAllBeds, getAllDepartments } from "../../services/api.bed-department.service";
import { getAllPatients } from "../../services/api.patient.service";

// ─── Trạng thái nhập viện ─────────────────────────────────
const TRANG_THAI_OPTIONS = [
  { label: "Đang điều trị", value: "Đang điều trị" },
  { label: "Đã xuất viện", value: "Đã xuất viện" },
  { label: "Chờ xuất viện", value: "Chờ xuất viện" },
];

const trangThaiColor = (tt: string) => {
  switch (tt) {
    case "Đang điều trị": return "processing";
    case "Đã xuất viện":  return "success";
    case "Chờ xuất viện": return "warning";
    default:              return "default";
  }
};

// ─── Component chính ──────────────────────────────────────
const AdmissionListPage = () => {
  const [admissions, setAdmissions]       = useState<NhapVien[]>([]);
  const [patients, setPatients]           = useState<BenhNhan[]>([]);
  const [beds, setBeds]                   = useState<GiuongBenh[]>([]);
  const [departments, setDepartments]     = useState<KhoaPhong[]>([]);
  const [loading, setLoading]             = useState(false);

  // ─── Create / Edit modal ──────────────────────────────
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal]     = useState(false);
  const [editingRecord, setEditingRecord]     = useState<NhapVien | null>(null);
  const [createForm] = Form.useForm();
  const [editForm]   = Form.useForm();

  // ─── Chuyển giường modal ──────────────────────────────
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [transferRecord, setTransferRecord]       = useState<NhapVien | null>(null);
  const [transferForm] = Form.useForm();

  // ─── Search filter ────────────────────────────────────
  const [filterName, setFilterName]       = useState("");
  const [filterKhoaId, setFilterKhoaId]   = useState<string | undefined>();
  const [filterTrangThai, setFilterTrangThai] = useState<string | undefined>();
  const [filterTuNgay, setFilterTuNgay]   = useState<string | undefined>();
  const [filterDenNgay, setFilterDenNgay] = useState<string | undefined>();

  // ─── Fetch data ───────────────────────────────────────
  const fetchAll = async () => {
    setLoading(true);
    const [admList, patList, bedList, deptList] = await Promise.all([
      getAllAdmissions(),
      getAllPatients(),
      getAllBeds(),
      getAllDepartments(),
    ]);
    setAdmissions(admList);
    setPatients(patList);
    setBeds(bedList);
    setDepartments(deptList);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  // ─── Search ───────────────────────────────────────────
  const onSearch = async () => {
    setLoading(true);
    const result = await searchAdmissions({
      tenBenhNhan: filterName.trim() || undefined,
      khoaId:      filterKhoaId,
      trangThai:   filterTrangThai,
      tuNgay:      filterTuNgay,
      denNgay:     filterDenNgay,
    });
    setAdmissions(result);
    setLoading(false);
  };

  const onResetFilter = () => {
    setFilterName("");
    setFilterKhoaId(undefined);
    setFilterTrangThai(undefined);
    setFilterTuNgay(undefined);
    setFilterDenNgay(undefined);
    fetchAll();
  };

  // ─── Create ───────────────────────────────────────────
  const onOpenCreate = () => {
    createForm.resetFields();
    setOpenCreateModal(true);
  };

  const onSaveCreate = async (values: any) => {
    try {
      await createAdmission({
        benhNhanId: values.benhNhanId,
        giuongId:   values.giuongId,
        khoaId:     values.khoaId,
        lyDoNhap:   values.lyDoNhap,
      });
      notification.success({ message: "Nhập viện thành công" });
      setOpenCreateModal(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Nhập viện thất bại",
        description: error?.response?.data?.message || "Vui lòng kiểm tra lại dữ liệu",
      });
    }
  };

  // ─── Edit ─────────────────────────────────────────────
  const onOpenEdit = (record: NhapVien) => {
    setEditingRecord(record);
    editForm.setFieldsValue({
      lyDoNhap: record.lyDoNhap,
      trangThai: record.trangThai,
      ngayXuat: record.ngayXuat ? dayjs(record.ngayXuat) : null,
    });
    setOpenEditModal(true);
  };

  const onSaveEdit = async (values: any) => {
    if (!editingRecord) return;
    try {
      await updateAdmission({
        id:        editingRecord.id,
        lyDoNhap:  values.lyDoNhap,
        trangThai: values.trangThai,
        ngayXuat:  values.ngayXuat ? dayjs(values.ngayXuat).toISOString() : null,
      });
      notification.success({ message: "Cập nhật nhập viện thành công" });
      setOpenEditModal(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Cập nhật thất bại",
        description: error?.response?.data?.message || "Vui lòng kiểm tra lại",
      });
    }
  };

  // ─── Delete ───────────────────────────────────────────
  const onDelete = async (id: string) => {
    try {
      await deleteAdmission(id);
      notification.success({ message: "Đã xóa phiếu nhập viện" });
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Xóa thất bại",
        description: error?.response?.data?.message || "Không thể xóa phiếu nhập viện",
      });
    }
  };

  // ─── Chuyển giường ────────────────────────────────────
  const onOpenTransfer = (record: NhapVien) => {
    setTransferRecord(record);
    transferForm.resetFields();
    setOpenTransferModal(true);
  };

  const onSaveTransfer = async (values: any) => {
    if (!transferRecord) return;
    try {
      await transferBed({
        nhapVienId:       transferRecord.id,
        giuongMoiId:      values.giuongMoiId,
        lyDoChuyenGiuong: values.lyDoChuyenGiuong,
      });
      notification.success({ message: "Chuyển giường thành công" });
      setOpenTransferModal(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Chuyển giường thất bại",
        description: error?.response?.data?.message || "Vui lòng kiểm tra lại",
      });
    }
  };

  // ─── Danh sách giường trống (cho chọn khi tạo / chuyển) ──
  const availableBeds = beds.filter((b) => b.trangThai === "Trống");

  // ─── Columns ──────────────────────────────────────────
  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "tenBenhNhan",
      key: "tenBenhNhan",
    },
    {
      title: "Giường",
      dataIndex: "tenGiuong",
      key: "tenGiuong",
    },
    {
      title: "Khoa",
      dataIndex: "tenKhoa",
      key: "tenKhoa",
    },
    {
      title: "Lý do nhập",
      dataIndex: "lyDoNhap",
      key: "lyDoNhap",
      ellipsis: true,
    },
    {
      title: "Ngày nhập",
      dataIndex: "ngayNhap",
      key: "ngayNhap",
      render: (v: string) => v ? dayjs(v).format("DD/MM/YYYY") : "--",
    },
    {
      title: "Ngày xuất",
      dataIndex: "ngayXuat",
      key: "ngayXuat",
      render: (v: string | null) => v ? dayjs(v).format("DD/MM/YYYY") : "--",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (v: string) => <Tag color={trangThaiColor(v)}>{v}</Tag>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: NhapVien) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => onOpenEdit(record)}
            title="Cập nhật"
          />
          <Button
            icon={<SwapOutlined />}
            size="small"
            onClick={() => onOpenTransfer(record)}
            title="Chuyển giường"
            disabled={record.trangThai === "Đã xuất viện"}
          />
          <Popconfirm
            title="Xóa phiếu nhập viện này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      {/* ── Header ── */}
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Quản lý Nhập viện
        </Typography.Title>
        <Space>
          <Button icon={<PlusOutlined />} type="primary" onClick={onOpenCreate}>
            Nhập viện mới
          </Button>
          <Button icon={<ReloadOutlined />} onClick={fetchAll}>
            Tải lại
          </Button>
        </Space>
      </Space>

      {/* ── Bộ lọc tìm kiếm ── */}
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Tên bệnh nhân"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={5}>
          <Select
            placeholder="Lọc theo khoa"
            style={{ width: "100%" }}
            value={filterKhoaId}
            onChange={setFilterKhoaId}
            allowClear
            options={departments.map((d) => ({ label: d.tenKhoa, value: d.id }))}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Select
            placeholder="Trạng thái"
            style={{ width: "100%" }}
            value={filterTrangThai}
            onChange={setFilterTrangThai}
            allowClear
            options={TRANG_THAI_OPTIONS}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <DatePicker
            placeholder="Từ ngày"
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            onChange={(_, s) => setFilterTuNgay(s as string || undefined)}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <DatePicker
            placeholder="Đến ngày"
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            onChange={(_, s) => setFilterDenNgay(s as string || undefined)}
          />
        </Col>
        <Col xs={24} sm={12} md={3}>
          <Space>
            <Button icon={<SearchOutlined />} type="primary" onClick={onSearch}>
              Tìm
            </Button>
            <Button icon={<ReloadOutlined />} onClick={onResetFilter}>
              Đặt lại
            </Button>
          </Space>
        </Col>
      </Row>

      {/* ── Bảng dữ liệu ── */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={admissions}
        columns={columns}
        scroll={{ x: 900 }}
        pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} phiếu` }}
      />

      {/* ══ Modal: Nhập viện mới ══ */}
      <Modal
        title="Nhập viện mới"
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onOk={() => createForm.submit()}
        okText="Xác nhận nhập viện"
        cancelText="Hủy"
        width={560}
        destroyOnClose
      >
        <Form form={createForm} layout="vertical" onFinish={onSaveCreate}>
          <Form.Item
            name="benhNhanId"
            label="Bệnh nhân"
            rules={[{ required: true, message: "Vui lòng chọn bệnh nhân" }]}
          >
            <Select
              showSearch
              placeholder="Chọn bệnh nhân"
              optionFilterProp="label"
              options={patients.map((p) => ({
                label: `${p.hoTen} — ${p.soDienThoai ?? ""}`,
                value: p.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="khoaId"
            label="Khoa"
            rules={[{ required: true, message: "Vui lòng chọn khoa" }]}
          >
            <Select
              showSearch
              placeholder="Chọn khoa"
              optionFilterProp="label"
              options={departments.map((d) => ({ label: d.tenKhoa, value: d.id }))}
            />
          </Form.Item>

          <Form.Item
            name="giuongId"
            label="Giường"
            rules={[{ required: true, message: "Vui lòng chọn giường" }]}
          >
            <Select
              showSearch
              placeholder="Chọn giường trống"
              optionFilterProp="label"
              options={availableBeds.map((b) => ({
                label: `${b.tenGiuong} — ${b.loaiGiuong}`,
                value: b.id,
              }))}
              notFoundContent="Không có giường trống"
            />
          </Form.Item>

          <Form.Item
            name="lyDoNhap"
            label="Lý do nhập viện"
            rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
          >
            <Input.TextArea rows={3} placeholder="Mô tả lý do nhập viện..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* ══ Modal: Cập nhật nhập viện ══ */}
      <Modal
        title="Cập nhật phiếu nhập viện"
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        onOk={() => editForm.submit()}
        okText="Lưu thay đổi"
        cancelText="Hủy"
        width={480}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" onFinish={onSaveEdit}>
          <Form.Item
            name="lyDoNhap"
            label="Lý do nhập viện"
            rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select options={TRANG_THAI_OPTIONS} />
          </Form.Item>

          <Form.Item name="ngayXuat" label="Ngày xuất viện (nếu có)">
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>

      {/* ══ Modal: Chuyển giường ══ */}
      <Modal
        title={`Chuyển giường — ${transferRecord?.tenBenhNhan ?? ""}`}
        open={openTransferModal}
        onCancel={() => setOpenTransferModal(false)}
        onOk={() => transferForm.submit()}
        okText="Xác nhận chuyển"
        cancelText="Hủy"
        width={480}
        destroyOnClose
      >
        <Form form={transferForm} layout="vertical" onFinish={onSaveTransfer}>
          <Form.Item label="Giường hiện tại">
            <Input value={transferRecord?.tenGiuong ?? "--"} disabled />
          </Form.Item>

          <Form.Item
            name="giuongMoiId"
            label="Giường mới"
            rules={[{ required: true, message: "Vui lòng chọn giường mới" }]}
          >
            <Select
              showSearch
              placeholder="Chọn giường trống"
              optionFilterProp="label"
              options={availableBeds
                .filter((b) => b.id !== transferRecord?.giuongId)
                .map((b) => ({
                  label: `${b.tenGiuong} — ${b.loaiGiuong}`,
                  value: b.id,
                }))}
              notFoundContent="Không có giường trống khác"
            />
          </Form.Item>

          <Form.Item
            name="lyDoChuyenGiuong"
            label="Lý do chuyển giường"
            rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
          >
            <Input.TextArea rows={3} placeholder="Lý do chuyển giường..." />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default AdmissionListPage;
