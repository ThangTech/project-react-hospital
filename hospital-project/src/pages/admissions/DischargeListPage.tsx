import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select, Space, Table, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAdmissions, searchAdmissions } from "../../services/api.admission.service";
import { getAllDepartments } from "../../services/api.bed-department.service";
import type { KhoaPhong, NhapVien } from "../../types";
import { trangThaiColor } from "../../components/admissions/EditAdmissionModal";

const DischargeListPage = () => {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState<NhapVien[]>([]);
  const [departments, setDepartments] = useState<KhoaPhong[]>([]);
  const [loading, setLoading] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [filterKhoaId, setFilterKhoaId] = useState<string | undefined>();
  const [filterTuNgay, setFilterTuNgay] = useState<string | undefined>();
  const [filterDenNgay, setFilterDenNgay] = useState<string | undefined>();

  const fetchAll = async () => {
    setLoading(true);
    const [admList, deptList] = await Promise.all([getAllAdmissions(), getAllDepartments()]);
    setAdmissions(admList);
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
      trangThai: "Chờ xuất viện",
      tuNgay: filterTuNgay,
      denNgay: filterDenNgay,
    });
    setAdmissions(result.filter((item) => item.trangThai === "Chờ xuất viện"));
    setLoading(false);
  };

  const onResetFilter = () => {
    setFilterName("");
    setFilterKhoaId(undefined);
    setFilterTuNgay(undefined);
    setFilterDenNgay(undefined);
    fetchAll();
  };

  const dischargeRows = admissions.filter((item) => item.trangThai === "Chờ xuất viện");

  const columns = [
    { title: "Bệnh nhân", dataIndex: "tenBenhNhan", key: "tenBenhNhan" },
    { title: "Giường", dataIndex: "tenGiuong", key: "tenGiuong" },
    { title: "Khoa", dataIndex: "tenKhoa", key: "tenKhoa" },
    { title: "Lý do nhập", dataIndex: "lyDoNhap", key: "lyDoNhap", ellipsis: true },
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
      render: (v: string) => <Tag color={trangThaiColor(v)}>{v}</Tag>,
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Xuất viện
        </Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={fetchAll}>
          Tải lại
        </Button>
      </Space>

      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={12} md={6}>
          <Input placeholder="Tên bệnh nhân" value={filterName} onChange={(e) => setFilterName(e.target.value)} allowClear />
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
        <Col xs={12} sm={6} md={3}>
          <DatePicker placeholder="Từ ngày" style={{ width: "100%" }} format="DD/MM/YYYY" onChange={(date) => setFilterTuNgay(date ? date.toISOString() : undefined)} />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <DatePicker placeholder="Đến ngày" style={{ width: "100%" }} format="DD/MM/YYYY" onChange={(date) => setFilterDenNgay(date ? date.toISOString() : undefined)} />
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

      <Table
        rowKey="id"
        loading={loading}
        dataSource={dischargeRows}
        columns={columns}
        scroll={{ x: 900 }}
        pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} phiếu` }}
        onRow={(record) => ({
          onClick: () => navigate(`/dashboard/admissions?tab=discharge&id=${record.id}`),
        })}
      />
    </Space>
  );
};

export default DischargeListPage;
