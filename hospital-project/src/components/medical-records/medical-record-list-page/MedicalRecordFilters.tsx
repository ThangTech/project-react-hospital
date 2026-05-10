import { Button, Col, Input, Row, Select, Space } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import type { BacSi } from "../../../types";

interface Props {
  filterName: string;
  filterBacSiId?: string;
  doctors: BacSi[];
  onFilterNameChange: (value: string) => void;
  onFilterBacSiChange: (value: string | undefined) => void;
  onSearch: () => void;
  onReset: () => void;
}

const MedicalRecordFilters = ({ filterName, filterBacSiId, doctors, onFilterNameChange, onFilterBacSiChange, onSearch, onReset }: Props) => {
  return (
    <Row gutter={[12, 12]} align="middle">
      <Col xs={24} sm={12} md={8}>
        <Input placeholder="Tên bệnh nhân" value={filterName} onChange={(e) => onFilterNameChange(e.target.value)} allowClear />
      </Col>

      <Col xs={24} sm={12} md={7}>
        <Select
          placeholder="Lọc theo bác sĩ"
          style={{ width: "100%" }}
          value={filterBacSiId}
          onChange={onFilterBacSiChange}
          allowClear
          showSearch
          optionFilterProp="label"
          options={doctors.map((d) => ({ label: d.hoTen, value: d.id }))}
        />
      </Col>

      <Col xs={24} sm={12} md={5}>
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
