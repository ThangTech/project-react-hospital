import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, Tabs, Tag, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import type { GiuongBenh, KhoaPhong } from "../../types";
import {
  createBed,
  createDepartment,
  deleteBed,
  deleteDepartment,
  getAllBeds,
  getAllDepartments,
  searchDepartments,
  updateBed,
  updateDepartment,
} from "../../services/api.bed-department.service";

const BedListPage = () => {
  const [beds, setBeds] = useState<GiuongBenh[]>([]);
  const [departments, setDepartments] = useState<KhoaPhong[]>([]);
  const [loadingBed, setLoadingBed] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [khoaKeyword, setKhoaKeyword] = useState("");
  const [bedForm] = Form.useForm();
  const [deptForm] = Form.useForm();
  const [openBedModal, setOpenBedModal] = useState(false);
  const [openDeptModal, setOpenDeptModal] = useState(false);
  const [editingBed, setEditingBed] = useState<GiuongBenh | null>(null);
  const [editingDept, setEditingDept] = useState<KhoaPhong | null>(null);

  const fetchBeds = async () => {
    setLoadingBed(true);
    const res = await getAllBeds();
    setBeds(res);
    setLoadingBed(false);
  };

  const fetchDepartments = async () => {
    setLoadingDepartment(true);
    const res = await getAllDepartments();
    setDepartments(res);
    setLoadingDepartment(false);
  };

  useEffect(() => {
    fetchBeds();
    fetchDepartments();
  }, []);

  const onOpenCreateBed = () => {
    setEditingBed(null);
    bedForm.resetFields();
    setOpenBedModal(true);
  };

  const onOpenEditBed = (record: GiuongBenh) => {
    setEditingBed(record);
    bedForm.setFieldsValue({ ...record, khoaId: (record as any).khoaId });
    setOpenBedModal(true);
  };

  const onSaveBed = async (values: any) => {
    try {
      if (editingBed) await updateBed({ id: editingBed.id, ...values });
      else await createBed(values);
      notification.success({ message: editingBed ? "Cập nhật giường thành công" : "Thêm giường thành công" });
      setOpenBedModal(false);
      await fetchBeds();
      await fetchDepartments();
    } catch (error: any) {
      notification.error({
        message: editingBed ? "Cập nhật giường thất bại" : "Thêm giường thất bại",
        description: error?.response?.data?.message || error?.response?.data?.Msg || "Vui lòng kiểm tra lại dữ liệu",
      });
    }
  };

  const onOpenCreateDept = () => {
    setEditingDept(null);
    deptForm.resetFields();
    setOpenDeptModal(true);
  };

  const onOpenEditDept = (record: KhoaPhong) => {
    setEditingDept(record);
    deptForm.setFieldsValue(record);
    setOpenDeptModal(true);
  };

  const onSaveDept = async (values: any) => {
    try {
      if (editingDept) await updateDepartment({ id: editingDept.id, ...values });
      else await createDepartment(values);
      notification.success({ message: editingDept ? "Cập nhật khoa phòng thành công" : "Thêm khoa phòng thành công" });
      setOpenDeptModal(false);
      await fetchDepartments();
      await fetchBeds();
    } catch (error: any) {
      notification.error({
        message: editingDept ? "Cập nhật khoa phòng thất bại" : "Thêm khoa phòng thất bại",
        description: error?.response?.data?.message || error?.response?.data?.Msg || "Vui lòng kiểm tra lại dữ liệu",
      });
    }
  };

  const onSearchDepartment = async () => {
    if (!khoaKeyword.trim()) {
      fetchDepartments();
      return;
    }
    setLoadingDepartment(true);
    const keyword = khoaKeyword.trim().toLowerCase();
    const res = await searchDepartments(keyword);
    if (res.length > 0) {
      setDepartments(res);
    } else {
      const allDepartments = await getAllDepartments();
      const filtered = allDepartments.filter(
        (d) =>
          d.tenKhoa?.toLowerCase().includes(keyword) ||
          d.loaiKhoa?.toLowerCase().includes(keyword),
      );
      setDepartments(filtered);
    }
    setLoadingDepartment(false);
  };

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Quản lý Giường bệnh & Khoa phòng
        </Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={() => { fetchBeds(); fetchDepartments(); }}>
          Tải lại
        </Button>
      </Space>

      <Tabs
        items={[
          {
            key: "beds",
            label: "Giường bệnh",
            children: (
              <>
                <Space style={{ marginBottom: 12 }}>
                  <Button type="primary" icon={<PlusOutlined />} onClick={onOpenCreateBed}>Thêm giường</Button>
                </Space>
                <Table
                rowKey="id"
                loading={loadingBed}
                dataSource={beds}
                columns={[
                  { title: "Mã giường", dataIndex: "id" },
                  { title: "Tên giường", dataIndex: "tenGiuong" },
                  { title: "Loại giường", dataIndex: "loaiGiuong" },
                  {
                    title: "Giá tiền",
                    dataIndex: "giaTien",
                    render: (v: number) => (v ?? 0).toLocaleString("vi-VN") + " đ",
                  },
                  {
                    title: "Trạng thái",
                    dataIndex: "trangThai",
                    render: (v: string) => <Tag color={v === "Đang sử dụng" ? "processing" : "success"}>{v}</Tag>,
                  },
                  {
                    title: "Khoa",
                    render: (record: any) => {
                      const dept = departments.find((d) => d.id === record.khoaId);
                      if (dept) return `${dept.tenKhoa || "--"} (${dept.loaiKhoa || "--"})`;
                      return `${record.khoa?.tenKhoa || "--"} (${record.khoa?.loaiKhoa || "--"})`;
                    },
                  },
                  {
                    title: "Thao tác",
                    render: (record: GiuongBenh) => (
                      <Space>
                        <Button icon={<EditOutlined />} onClick={() => onOpenEditBed(record)} />
                        <Popconfirm title="Xóa giường này?" onConfirm={async () => { 
                            try {
                              await deleteBed(record.id); 
                              notification.success({ message: "Đã xóa giường" }); 
                              await fetchBeds();
                              await fetchDepartments();
                            } catch (error: any) {
                              notification.error({
                                message: "Xóa giường thất bại",
                                description: error?.response?.data?.message || error?.response?.data?.Msg || "Không thể xóa giường",
                              });
                            }
                            }}>
                          <Button danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                      </Space>
                    ),
                  },
                ]}
              />
              </>
            ),
          },
          {
            key: "departments",
            label: "Khoa phòng",
            children: (
              <>
                <Space style={{ marginBottom: 12 }}>
                  <Input placeholder="Tìm tên khoa hoặc loại khoa" style={{ width: 300 }} value={khoaKeyword} onChange={(e) => setKhoaKeyword(e.target.value)} />
                  <Button icon={<SearchOutlined />} onClick={onSearchDepartment}>Tìm kiếm</Button>
                  <Button icon={<ReloadOutlined />} onClick={() => { setKhoaKeyword(""); fetchDepartments(); }}>Đặt lại</Button>
                  <Button type="primary" icon={<PlusOutlined />} onClick={onOpenCreateDept}>Thêm khoa</Button>
                </Space>
                <Table
                rowKey="id"
                loading={loadingDepartment}
                dataSource={departments}
                columns={[
                  { title: "Mã khoa", dataIndex: "id" },
                  { title: "Tên khoa", dataIndex: "tenKhoa" },
                  { title: "Loại khoa", dataIndex: "loaiKhoa" },
                  {
                    title: "Sức chứa",
                    render: (record: KhoaPhong) => `${record.soGiuongHienCo ?? 0} / ${record.soGiuongTieuChuan ?? 0}`,
                  },
                  {
                    title: "Thao tác",
                    render: (record: KhoaPhong) => (
                      <Space>
                        <Button icon={<EditOutlined />} onClick={() => onOpenEditDept(record)} />
                        <Popconfirm title="Xóa khoa này?" onConfirm={async () => { await deleteDepartment(record.id); notification.success({ message: "Đã xóa khoa" }); fetchDepartments(); }}>
                          <Button danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                      </Space>
                    ),
                  },
                ]}
              />
              </>
            ),
          },
        ]}
      />

      <Modal title={editingBed ? "Cập nhật giường" : "Thêm giường"} open={openBedModal} onCancel={() => setOpenBedModal(false)} onOk={() => bedForm.submit()}>
        <Form form={bedForm} layout="vertical" onFinish={onSaveBed}>
          <Form.Item name="tenGiuong" label="Tên giường" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="khoaId" label="Khoa" rules={[{ required: true }]}>
            <Select
              options={departments.map((d) => {
                const current = d.soGiuongHienCo ?? 0;
                const max = d.soGiuongTieuChuan ?? 0;
                const isFull = max > 0 && current >= max;
                return {
                  label: `${d.tenKhoa} (${current}/${max})`,
                  value: d.id,
                  disabled: isFull,
                };
              })}
            />
          </Form.Item>
          <Form.Item name="loaiGiuong" label="Loại giường" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="giaTien" label="Giá tiền" rules={[{ required: true }]}><InputNumber style={{ width: "100%" }} min={0} /></Form.Item>
          <Form.Item name="trangThai" label="Trạng thái" rules={[{ required: true }]}><Select options={[{ label: "Trống", value: "Trống" }, { label: "Đang sử dụng", value: "Đang sử dụng" }]} /></Form.Item>
        </Form>
      </Modal>

      <Modal title={editingDept ? "Cập nhật khoa phòng" : "Thêm khoa phòng"} open={openDeptModal} onCancel={() => setOpenDeptModal(false)} onOk={() => deptForm.submit()}>
        <Form form={deptForm} layout="vertical" onFinish={onSaveDept}>
          <Form.Item name="tenKhoa" label="Tên khoa" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="loaiKhoa" label="Loại khoa" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="soGiuongTieuChuan" label="Số giường tiêu chuẩn" rules={[{ required: true, message: "Vui lòng nhập số giường tiêu chuẩn" }, { type: "number", min: 1, message: "Số giường tiêu chuẩn phải lớn hơn hoặc bằng 1" }]}><InputNumber style={{ width: "100%" }} min={1} /></Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};
export default BedListPage;
