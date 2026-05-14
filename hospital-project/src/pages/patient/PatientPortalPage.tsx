import { ArrowLeftOutlined, MedicineBoxOutlined, WalletOutlined, FileTextOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Row, Space, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PatientPortalPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

      <Card>
        <Descriptions bordered column={1} labelStyle={{ width: 220, fontWeight: 600 }}>
          <Descriptions.Item label="Tên đăng nhập">{user?.tenDangNhap || "--"}</Descriptions.Item>
          <Descriptions.Item label="Vai trò">{user?.vaiTro || "BenhNhan"}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email || "--"}</Descriptions.Item>
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
    </Space>
  );
};

export default PatientPortalPage;
