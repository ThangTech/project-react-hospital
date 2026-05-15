import { DeleteOutlined, DollarOutlined, FilePdfOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, Typography, notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { HoaDon, NhapVien } from "../../types";
import {
  createInvoice,
  deleteInvoice,
  exportInvoicePdf,
  getAllInvoices,
  getInvoicePreview,
  payInvoice,
} from "../../services/api.invoice.service";
import { getAllAdmissions } from "../../services/api.admission.service";

const statusColor = (value: string) => {
  const lower = value.toLowerCase();
  if (lower.includes("đã")) return "green";
  if (lower.includes("chưa")) return "red";
  return "blue";
};

const InvoiceListPage = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<HoaDon[]>([]);
  const [admissions, setAdmissions] = useState<NhapVien[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [selectedAdmissionId, setSelectedAdmissionId] = useState<string>("");
  const [form] = Form.useForm();

  const fetchAll = async () => {
    setLoading(true);
    const [invoices, adm] = await Promise.all([
      getAllInvoices(),
      getAllAdmissions(),
    ]);
    setItems(invoices);
    setAdmissions(adm);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const onOpenCreate = () => {
    form.resetFields();
    setPreview(null);
    setSelectedAdmissionId("");
    setOpen(true);
  };

  const onPreview = async (nhapVienId?: string) => {
    const id = nhapVienId ?? selectedAdmissionId;
    if (!id) {
      notification.warning({ message: "Chọn phiếu nhập viện trước" });
      return;
    }

    const data = await getInvoicePreview(id);
    setPreview(data);
  };

  useEffect(() => {
    const nhapVienId = searchParams.get("nhapVienId");
    if (!nhapVienId) return;

    form.setFieldsValue({ nhapVienId });
    setSelectedAdmissionId(nhapVienId);
    setOpen(true);
    void onPreview(nhapVienId);
  }, [searchParams]);

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createInvoice(values.nhapVienId);
      notification.success({ message: "Tạo hóa đơn thành công" });
      setOpen(false);
      await fetchAll();
    } catch (error: any) {
      if (error?.errorFields) return;
      notification.error({
        message: "Tạo hóa đơn thất bại",
        description: error?.response?.data?.message || "Vui lòng kiểm tra lại",
      });
    }
  };

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
      key: "id",
      width: 260,
    },
    {
      title: "Bệnh nhân",
      dataIndex: "tenBenhNhan",
      key: "tenBenhNhan",
    },
    {
      title: "Nhập viện",
      dataIndex: "nhapVienId",
      key: "nhapVienId",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      render: (v: number) => (v ?? 0).toLocaleString("vi-VN") + " đ",
    },
    {
      title: "BHYT chi trả",
      dataIndex: "baoHiemChiTra",
      key: "baoHiemChiTra",
      render: (v: number) => (v ?? 0).toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Bệnh nhân trả",
      dataIndex: "benhNhanThanhToan",
      key: "benhNhanThanhToan",
      render: (v: number) => (v ?? 0).toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Ngày",
      dataIndex: "ngay",
      key: "ngay",
      render: (v: string | null) => (v ? dayjs(v).format("DD/MM/YYYY") : "--"),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (v: string) => <Tag color={statusColor(v)}>{v}</Tag>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: HoaDon) => (
        <Space>
          <Button
            size="small"
            icon={<DollarOutlined />}
            onClick={async () => {
              const soTienConLai = Math.max((record.tongTien ?? 0) - (record.baoHiemChiTra ?? 0) - (record.benhNhanThanhToan ?? 0), 0);
              if (soTienConLai <= 0) {
                notification.info({ message: "Hóa đơn đã thanh toán đủ" });
                return;
              }
              await payInvoice(record.id, soTienConLai);
              notification.success({ message: "Thanh toán thành công" });
              await fetchAll();
            }}
          >
            Thanh toán
          </Button>
          <Button
            size="small"
            icon={<FilePdfOutlined />}
            onClick={async () => {
              const res = await exportInvoicePdf(record.id);
              const blob = new Blob([res.data], { type: "application/pdf" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = `HoaDon_${record.id}.pdf`;
              link.click();
              URL.revokeObjectURL(link.href);
            }}
          >
            PDF
          </Button>
          <Popconfirm
            title="Xóa hóa đơn này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={async () => {
              await deleteInvoice(record.id);
              await fetchAll();
            }}
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filtered = keyword.trim()
    ? items.filter((x) => {
        const term = keyword.trim().toLowerCase();
        if (x.tenBenhNhan?.toLowerCase().includes(term)) {
          return true;
        }

        if (x.id.toLowerCase().includes(term)) {
          return true;
        }

        return false;
      })
    : items;

  const admissionOptions = admissions.map((a) => ({
    value: a.id,
    label: `${a.tenBenhNhan} - ${a.tenKhoa}`,
  }));

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Viện phí & Hóa đơn
        </Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={fetchAll}>
          Tải lại
        </Button>
      </Space>

      <Space>
        <Input
          placeholder="Tìm bệnh nhân / mã hóa đơn"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 280 }}
        />
        <Button icon={<SearchOutlined />} onClick={() => setKeyword(keyword)}>
          Tìm
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={onOpenCreate}>
          Tạo từ nhập viện
        </Button>
      </Space>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={filtered}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1300 }}
      />

      <Modal
        title="Tạo hóa đơn"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onSubmit}
        okText="Tạo"
        cancelText="Hủy"
        width={760}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nhapVienId"
            label="Phiếu nhập viện"
            rules={[{ required: true }]}
          >
            <Select
              options={admissionOptions}
              value={selectedAdmissionId}
              showSearch
              optionFilterProp="label"
              onChange={(value) => {
                setSelectedAdmissionId(value);
                void onPreview(value);
              }}
            />
          </Form.Item>
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={() => void onPreview()}>Xem trước</Button>
          </Space>
          {preview ? (
            <div style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
              <div>Bệnh nhân: {preview.tenBenhNhan ?? "--"}</div>
              <div>
                Tổng tiền: {(preview.tongTien ?? 0).toLocaleString("vi-VN")} đ
              </div>
              <div>
                BHYT chi trả: {(preview.baoHiemChiTra ?? 0).toLocaleString("vi-VN")} đ
              </div>
              <div>
                Bệnh nhân thanh toán: {(preview.benhNhanThanhToan ?? 0).toLocaleString("vi-VN")} đ
              </div>
            </div>
          ) : null}
        </Form>
      </Modal>
    </Space>
  );
};

export default InvoiceListPage;
