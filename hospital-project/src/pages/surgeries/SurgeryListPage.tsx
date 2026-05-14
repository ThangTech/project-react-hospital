import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, Tag, Typography, notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { BacSi, LichPhauThuat, NhapVien } from "../../types";
import {
  createSurgery,
  deleteSurgery,
  getAllSurgeries,
  searchSurgeries,
  updateSurgery,
} from "../../services/api.surgery.service";
import { getAllDoctors } from "../../services/api.doctor.service";
import { getAllAdmissions } from "../../services/api.admission.service";

const trangThaiColor = (value: string | null) => {
  if (!value) return "default";
  const lower = value.toLowerCase();
  if (lower.includes("hoàn") || lower.includes("xong")) return "green";
  if (lower.includes("hủy")) return "red";
  if (lower.includes("đặt") || lower.includes("lên lịch")) return "blue";
  return "default";
};

const SurgeryListPage = () => {
  const [items, setItems] = useState<LichPhauThuat[]>([]);
  const [admissions, setAdmissions] = useState<NhapVien[]>([]);
  const [doctors, setDoctors] = useState<BacSi[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<LichPhauThuat | null>(null);
  const [form] = Form.useForm();

  const fetchAll = async () => {
    setLoading(true);
    const [surgeryList, admList, docList] = await Promise.all([
      getAllSurgeries(),
      getAllAdmissions(),
      getAllDoctors(),
    ]);
    setItems(surgeryList);
    setAdmissions(admList);
    setDoctors(docList);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onOpenCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const onOpenEdit = (record: LichPhauThuat) => {
    setEditing(record);
    form.setFieldsValue({ ...record, ngay: record.ngay ? dayjs(record.ngay) : null });
    setOpen(true);
  };

  const onSubmit = async (values: any) => {
    const payload = {
      nhapVienId: values.nhapVienId,
      bacSiChinhId: values.bacSiChinhId,
      loaiPhauThuat: values.loaiPhauThuat,
      ekip: values.ekip,
      ngay: values.ngay ? dayjs(values.ngay).toISOString() : new Date().toISOString(),
      phongMo: values.phongMo,
      chiPhi: Number(values.chiPhi || 0),
      trangThai: values.trangThai,
    };

    try {
      if (editing) await updateSurgery({ id: editing.id, ...payload });
      else await createSurgery(payload);
      notification.success({ message: editing ? "Cập nhật lịch phẫu thuật" : "Tạo lịch phẫu thuật" });
      setOpen(false);
      await fetchAll();
    } catch (error: any) {
      notification.error({ message: "Lưu thất bại", description: error?.response?.data?.message || "Vui lòng kiểm tra lại dữ liệu" });
    }
  };

  const onSearch = async () => {
    setLoading(true);
    const res = keyword.trim() ? await searchSurgeries(keyword.trim()) : await getAllSurgeries();
    setItems(res);
    setLoading(false);
  };

  const admissionOptions = admissions.map((item) => ({
    value: item.id,
    label: `${item.tenBenhNhan} - ${item.tenKhoa}`,
  }));

  const doctorOptions = doctors.map((item) => ({
    value: item.id,
    label: item.hoTen,
  }));

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "tenBenhNhan",
      key: "tenBenhNhan",
      render: (v: string | null) => v || "--",
    },
    {
      title: "Bác sĩ",
      dataIndex: "tenBacSi",
      key: "tenBacSi",
      render: (v: string | null) => v || "--",
    },
    {
      title: "Loại phẫu thuật",
      dataIndex: "loaiPhauThuat",
      key: "loaiPhauThuat",
    },
    {
      title: "Kíp",
      dataIndex: "ekip",
      key: "ekip",
      render: (v: string | null) => v || "--",
    },
    {
      title: "Ngày",
      dataIndex: "ngay",
      key: "ngay",
      render: (v: string | null) => (v ? dayjs(v).format("DD/MM/YYYY") : "--"),
    },
    {
      title: "Phòng mổ",
      dataIndex: "phongMo",
      key: "phongMo",
      render: (v: string | null) => v || "--",
    },
    {
      title: "Chi phí",
      dataIndex: "chiPhi",
      key: "chiPhi",
      render: (v: number | null) => (v ?? 0).toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (v: string | null) => <Tag color={trangThaiColor(v)}>{v || "--"}</Tag>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: LichPhauThuat) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => onOpenEdit(record)} />
          <Popconfirm
            title="Xóa lịch này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={async () => {
              await deleteSurgery(record.id);
              await fetchAll();
            }}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Lịch phẫu thuật / thủ thuật
        </Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={fetchAll}>
          Tải lại
        </Button>
      </Space>

      <Space>
        <Input
          placeholder="Tìm nhanh"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 260 }}
        />
        <Button icon={<SearchOutlined />} onClick={onSearch}>
          Tìm kiếm
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={onOpenCreate}>
          Tạo mới
        </Button>
      </Space>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={columns}
        pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} lịch` }}
        scroll={{ x: 1400 }}
      />

      <Modal
        title={editing ? "Cập nhật phẫu thuật / thủ thuật" : "Tạo phẫu thuật / thủ thuật"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
        width={720}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="nhapVienId" label="Phiếu nhập viện" rules={[{ required: true }]}>
            <Select options={admissionOptions} showSearch optionFilterProp="label" />
          </Form.Item>
          <Form.Item
            name="bacSiChinhId"
            label="Bác sĩ chính"
            rules={[{ required: true }]}
          >
            <Select options={doctorOptions} showSearch optionFilterProp="label" />
          </Form.Item>
          <Form.Item
            name="loaiPhauThuat"
            label="Loại phẫu thuật / thủ thuật"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="ekip" label="Ekip">
            <Input />
          </Form.Item>
          <Form.Item name="ngay" label="Ngày">
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="phongMo" label="Phòng mổ">
            <Input />
          </Form.Item>
          <Form.Item name="chiPhi" label="Chi phí">
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="trangThai" label="Trạng thái" initialValue="Đã lên lịch">
            <Select
              options={[
                { value: "Đã lên lịch", label: "Đã lên lịch" },
                { value: "Hoàn thành", label: "Hoàn thành" },
                { value: "Đã hủy", label: "Đã hủy" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default SurgeryListPage;
