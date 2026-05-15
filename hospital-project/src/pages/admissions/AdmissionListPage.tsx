import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SearchOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Space, Table, Tag, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import type { BenhNhan, GiuongBenh, KhoaPhong, NhapVien } from "../../types";
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
import CreateAdmissionModal from "../../components/admissions/CreateAdmissionModal";
import EditAdmissionModal, { TRANG_THAI_OPTIONS, trangThaiColor } from "../../components/admissions/EditAdmissionModal";
import TransferBedModal from "../../components/admissions/TransferBedModal";

const AdmissionListPage = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "discharge" ? "discharge" : "admission";

  const [activeTab] = useState(defaultTab);
  const [admissions, setAdmissions] = useState<NhapVien[]>([]);
  const [patients, setPatients] = useState<BenhNhan[]>([]);
  const [beds, setBeds] = useState<GiuongBenh[]>([]);
  const [departments, setDepartments] = useState<KhoaPhong[]>([]);
  const [loading, setLoading] = useState(false);

 
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [createForm] = Form.useForm();

 
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<NhapVien | null>(null);
  const [editForm] = Form.useForm();

 
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [transferRecord, setTransferRecord] = useState<NhapVien | null>(null);
  const [transferForm] = Form.useForm();

 
  const [filterName, setFilterName] = useState("");
  const [filterKhoaId, setFilterKhoaId] = useState<string | undefined>();
  const [filterTrangThai, setFilterTrangThai] = useState<string | undefined>();
  const [filterTuNgay, setFilterTuNgay] = useState<string | undefined>();
  const [filterDenNgay, setFilterDenNgay] = useState<string | undefined>();


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

  useEffect(() => {
    fetchAll();
  }, []);

 
  const onSearch = async () => {
    setLoading(true);
    const result = await searchAdmissions({
      tenBenhNhan: filterName.trim() || undefined,
      khoaId: filterKhoaId,
      trangThai: filterTrangThai,
      tuNgay: filterTuNgay,
      denNgay: filterDenNgay,
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

 
  const onOpenCreate = () => {
    createForm.resetFields();
    setOpenCreateModal(true);
  };

  const onSaveCreate = async (values: any) => {
    const activeAdmission = activeAdmissionsByPatient.get(values.benhNhanId);
    if (activeAdmission) {
      notification.warning({
        message: "Bệnh nhân đang điều trị",
        description: `BN này đã có phiếu nhập viện ${activeAdmission.tenGiuong ? `ở giường ${activeAdmission.tenGiuong}` : "đang hoạt động"}.`,
      });
      return;
    }

    try {
      await createAdmission({
        benhNhanId: values.benhNhanId,
        giuongId: values.giuongId,
        khoaId: values.khoaId,
        lyDoNhap: values.lyDoNhap,
      });
      notification.success({ message: "Nhập viện thành công" });
      setOpenCreateModal(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Nhập viện thất bại",
        description:
          error?.response?.data?.message || "Vui lòng kiểm tra lại dữ liệu",
      });
    }
  };


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
        id: editingRecord.id,
        lyDoNhap: values.lyDoNhap,
        trangThai: values.trangThai,
        ngayXuat: values.ngayXuat
          ? dayjs(values.ngayXuat).toISOString()
          : null,
      });
      notification.success({ message: "Cập nhật nhập viện thành công" });
      setOpenEditModal(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Cập nhật thất bại",
        description:
          error?.response?.data?.message || "Vui lòng kiểm tra lại",
      });
    }
  };


  const onDelete = async (id: string) => {
    try {
      // axios interceptor chuyển 400 thành resolved value
      // nên phải kiểm tra message thủ công
      const res: any = await deleteAdmission(id);

      if (res?.message && res.message !== "Xóa thành công.") {
        notification.error({
          message: "Xóa thất bại",
          description: res.message,
        });
        return;
      }

      notification.success({ message: "Đã xóa phiếu nhập viện" });
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Xóa thất bại",
        description:
          error?.response?.data?.message || "Không thể xóa phiếu nhập viện",
      });
    }
  };

 
  const onOpenTransfer = (record: NhapVien) => {
    setTransferRecord(record);
    transferForm.resetFields();
    setOpenTransferModal(true);
  };

  const onSaveTransfer = async (values: any) => {
    if (!transferRecord) return;
    try {
      await transferBed({
        nhapVienId: transferRecord.id,
        giuongMoiId: values.giuongMoiId,
        lyDoChuyenGiuong: values.lyDoChuyenGiuong,
      });
      notification.success({ message: "Chuyển giường thành công" });
      setOpenTransferModal(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({
        message: "Chuyển giường thất bại",
        description:
          error?.response?.data?.message || "Vui lòng kiểm tra lại",
      });
    }
  };


  const availableBeds = beds.filter((b) => b.trangThai === "Trống");
  const activeAdmissionsByPatient = new Map<string, NhapVien>();
  admissions.forEach((item) => {
    if (item.trangThai === "Đang điều trị") {
      activeAdmissionsByPatient.set(item.benhNhanId, item);
    }
  });
  const getStatusOrder = (status: string) => {
    if (status === "Đang điều trị") return 1;
    if (status === "Chờ xuất viện") return 2;
    if (status === "Đã xuất viện") return 3;
    return 99;
  };

  const sortedAdmissions = [...admissions].sort((a, b) => {
    const statusDiff = getStatusOrder(a.trangThai) - getStatusOrder(b.trangThai);
    if (statusDiff !== 0) return statusDiff;
    return dayjs(b.ngayNhap).valueOf() - dayjs(a.ngayNhap).valueOf();
  });
  const dischargeRows = sortedAdmissions.filter((item) => item.trangThai === "Chờ xuất viện");

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
      render: (v: string) => (v ? dayjs(v).format("DD/MM/YYYY") : "--"),
    },
    {
      title: "Ngày xuất",
      dataIndex: "ngayXuat",
      key: "ngayXuat",
      render: (v: string | null) => (v ? dayjs(v).format("DD/MM/YYYY") : "--"),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (v: string) => (
        <Tag color={trangThaiColor(v)}>{v}</Tag>
      ),
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
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <Space
      direction="vertical"
      size={16}
      style={{ width: "100%", padding: 20 }}
    >

      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Quản lý Nhập viện
        </Typography.Title>
        <Space>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={onOpenCreate}
          >
            Nhập viện mới
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchAll}
          >
            Tải lại
          </Button>
        </Space>
      </Space>

  
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
            options={departments.map((d) => ({
              label: d.tenKhoa,
              value: d.id,
            }))}
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
            onChange={(date) =>
              setFilterTuNgay(date ? date.toISOString() : undefined)
            }
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <DatePicker
            placeholder="Đến ngày"
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            onChange={(date) =>
              setFilterDenNgay(date ? date.toISOString() : undefined)
            }
          />
        </Col>
        <Col xs={24} sm={12} md={3}>
          <Space>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={onSearch}
            >
              Tìm
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={onResetFilter}
            >
              Đặt lại
            </Button>
          </Space>
        </Col>
      </Row>

   
      {activeTab === "admission" ? (
        <Table
          rowKey="id"
          loading={loading}
          dataSource={sortedAdmissions}
          columns={columns}
          scroll={{ x: 900 }}
          pagination={{
            pageSize: 10,
            showTotal: (t) => `Tổng ${t} phiếu`,
          }}
        />
      ) : (
        <Table
          rowKey="id"
          loading={loading}
          dataSource={dischargeRows}
          columns={columns}
          scroll={{ x: 900 }}
          pagination={{
            pageSize: 10,
            showTotal: (t) => `Tổng ${t} phiếu`,
          }}
        />
      )}

   
      <CreateAdmissionModal
        open={openCreateModal}
        form={createForm}
        patients={patients}
        departments={departments}
        availableBeds={availableBeds}
        onCancel={() => setOpenCreateModal(false)}
        onFinish={onSaveCreate}
      />





















































      <EditAdmissionModal
        open={openEditModal}
        form={editForm}
        onCancel={() => setOpenEditModal(false)}
        onFinish={onSaveEdit}
      />

      <TransferBedModal
        open={openTransferModal}
        form={transferForm}
        record={transferRecord}
        availableBeds={availableBeds}
        onCancel={() => setOpenTransferModal(false)}
        onFinish={onSaveTransfer}
      />
    </Space>
  );
};

export default AdmissionListPage;
