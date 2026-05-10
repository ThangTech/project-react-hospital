import { Button, Space, Typography } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

interface Props {
  onOpenCreate: () => void;
  onReload: () => void;
}

const MedicalRecordListHeader = ({ onOpenCreate, onReload }: Props) => {
  return (
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Quản lý Hồ Sơ Bệnh Án
      </Typography.Title>

      <Space>
        <Button icon={<PlusOutlined />} type="primary" onClick={onOpenCreate}>
          Tạo hồ sơ mới
        </Button>
        <Button icon={<ReloadOutlined />} onClick={onReload}>
          Tải lại
        </Button>
      </Space>
    </Space>
  );
};

export default MedicalRecordListHeader;
