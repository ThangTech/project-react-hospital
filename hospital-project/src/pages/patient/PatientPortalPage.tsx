import { ArrowLeftOutlined, FileTextOutlined, LockOutlined, MedicineBoxOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Empty, Row, Space, Table, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAdmissions } from "../../services/api.admission.service";
import { getAllInvoices } from "../../services/api.invoice.service";
import { getAllMedicalRecords } from "../../services/api.medical-record.service";
import { getPatientById } from "../../services/api.patient.service";
import type { BenhNhan, HoaDon, HoSoBenhAn, NhapVien } from "../../types";
import { useAuth } from "../../hooks/useAuth";

const PatientPortalPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patient, setPatient] = useState<BenhNhan | null>(null);
  const [admissions, setAdmissions] = useState<NhapVien[]>([]);
  const [records, setRecords] = useState<HoSoBenhAn[]>([]);
  const [invoices, setInvoices] = useState<HoaDon[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (!user?.id) return;
    setLoading(true);
    const [patientRes, admissionList, recordList, invoiceList] = await Promise.all([
      getPatientById(user.id),
      getAllAdmissions(),
      getAllMedicalRecords(),
      getAllInvoices(),
    ]);

    if (patientRes?.data) {
      setPatient(patientRes.data);
    } else {
      setPatient(null);
    }

    setAdmissions(admissionList.filter((item) => item.benhNhanId === user.id));
    setRecords(recordList.filter((item) => item.benhNhanId === user.id));
    setInvoices(invoiceList.filter((item) => item.benhNhanId === user.id));
    setLoading(false);
  };

  useEffect(() => {
    void loadData();
  }, [user?.id]);

  const admissionColumns = [
    { title: "Lý do nhập", dataIndex: "lyDoNhap", key: "lyDoNhap" },
    { title: "Ngày nhập", dataIndex: "ngayNhap", key: "ngayNhap", render: (v: string) => (v ? dayjs(v).format("DD/MM/YYYY") : "--") },
    { title: "Ngày xuất", dataIndex: "ngayXuat", key: "ngayXuat", render: (v: string | null) => (v ? dayjs(v).format("DD/MM/YYYY") : "--") },
    { title: "Trạng thái", dataIndex: "trangThai", key: "trangThai", render: (v: string) => <Tag color={v === "Đã xuất viện" ? "success" : v === "Chờ xuất viện" ? "warning" : "processing"}>{v}</Tag> },
  ];

  const recordColumns = [
    { title: "Bác sĩ", dataIndex: "tenBacSi", key: "tenBacSi", render: (v: string | null) => v || "--" },
    { title: "Chẩn đoán", dataIndex: "chanDoanBanDau", key: "chanDoanBanDau", render: (v: string | null) => v || "--" },
    { title: "Kết quả", dataIndex: "ketQuaDieuTri", key: "ketQuaDieuTri", render: (v: string | null) => v || "--" },
  ];

  const invoiceColumns = [
    { title: "Ngày", dataIndex: "ngay", key: "ngay", render: (v: string | null) => (v ? dayjs(v).format("DD/MM/YYYY") : "--") },
    { title: "Tổng tiền", dataIndex: "tongTien", key: "tongTien", render: (v: number) => `${(v ?? 0).toLocaleString("vi-VN")} đ` },
    { title: "Trạng thái", dataIndex: "trangThai", key: "trangThai", render: (v: string) => <Tag color={v === "Đã thanh toán" ? "success" : "warning"}>{v}</Tag> },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>Quay lại trang chủ</Button>

      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              Cổng bệnh nhân
            </Typography.Title>
            <Typography.Paragraph style={{ marginBottom: 0 }}>
              Xem thông tin cá nhân, hồ sơ điều trị, hóa đơn và đổi mật khẩu.
            </Typography.Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Tag color="blue">{user?.vaiTro ?? "BenhNhan"}</Tag>
          </Col>
        </Row>
      </Card>

      <Card loading={loading}>
        <Descriptions bordered column={1} labelStyle={{ width: 220, fontWeight: 600 }}>
          <Descriptions.Item label="Tên đăng nhập">{user?.tenDangNhap || "--"}</Descriptions.Item>
          <Descriptions.Item label="Vai trò">{user?.vaiTro || "BenhNhan"}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email || "--"}</Descriptions.Item>
          <Descriptions.Item label="Họ và tên">{patient?.hoTen || "--"}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{patient?.ngaySinh ? dayjs(patient.ngaySinh).format("DD/MM/YYYY") : "--"}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">{patient?.gioiTinh || "--"}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{patient?.diaChi || "--"}</Descriptions.Item>
          <Descriptions.Item label="Số thẻ BHYT">{patient?.soTheBaoHiem || "--"}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card onClick={() => navigate("/change-password")} hoverable style={{ cursor: "pointer" }}>
            <Space direction="vertical" size={8}>
              <LockOutlined style={{ fontSize: 24 }} />
              <Typography.Text strong>Đổi mật khẩu</Typography.Text>
              <Typography.Text type="secondary">Cập nhật mật khẩu tài khoản</Typography.Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card hoverable style={{ cursor: "pointer" }}>
            <Space direction="vertical" size={8}>
              <MedicineBoxOutlined style={{ fontSize: 24 }} />
              <Typography.Text strong>Hồ sơ điều trị</Typography.Text>
              <Typography.Text type="secondary">Theo dõi nhập viện / HSBA</Typography.Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card hoverable style={{ cursor: "pointer" }}>
            <Space direction="vertical" size={8}>
              <FileTextOutlined style={{ fontSize: 24 }} />
              <Typography.Text strong>Hồ sơ thanh toán</Typography.Text>
              <Typography.Text type="secondary">Xem hóa đơn và công nợ</Typography.Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card hoverable style={{ cursor: "pointer" }}>
            <Space direction="vertical" size={8}>
              <WalletOutlined style={{ fontSize: 24 }} />
              <Typography.Text strong>Thông tin BHYT</Typography.Text>
              <Typography.Text type="secondary">Xem trạng thái thẻ bảo hiểm</Typography.Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Nhập viện" loading={loading}>
        {admissions.length > 0 ? <Table rowKey="id" columns={admissionColumns} dataSource={admissions} pagination={false} /> : <Empty description="Chưa có dữ liệu nhập viện" />}
      </Card>

      <Card title="HSBA" loading={loading}>
        {records.length > 0 ? <Table rowKey="id" columns={recordColumns} dataSource={records} pagination={false} /> : <Empty description="Chưa có hồ sơ bệnh án" />}
      </Card>

      <Card title="Hóa đơn" loading={loading}>
        {invoices.length > 0 ? <Table rowKey="id" columns={invoiceColumns} dataSource={invoices} pagination={false} /> : <Empty description="Chưa có hóa đơn" />}
      </Card>
    </Space>
  );
};

export default PatientPortalPage;
