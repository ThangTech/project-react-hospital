import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space } from "antd";

interface Props {
  filterName: string;
  onFilterNameChange: (val: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const MedicalRecordFilters = ({
  filterName,
  onFilterNameChange,
  onSearch,
  onReset,
}: Props) => {
  return (
    <Row gutter={[12, 12]} align="middle">
      <Col xs={24} sm={12} md={10}>
        <Input
          placeholder="Tìm theo tên bệnh nhân hoặc bác sĩ..."
          value={filterName}
          onChange={(e) => onFilterNameChange(e.target.value)}
          onPressEnter={onSearch}
          allowClear
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space>
          <Button icon={<SearchOutlined />} type="primary" onClick={onSearch}>
            Tìm
          </Button>
          <Button icon={<ReloadOutlined />} onClick={onReset}>
            Đặt lại
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default MedicalRecordFilters;
