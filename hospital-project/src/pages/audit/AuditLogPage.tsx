import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Table, Tabs, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { getAuditByDateRange, getAuditByUser, getMedicalRecordLogs, getSystemLogs } from "../../services/api.audit.service";

const AuditLogPage = () => {
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  const [medicalLogs, setMedicalLogs] = useState<any[]>([]);
  const [userLogs, setUserLogs] = useState<any[]>([]);
  const [dateLogs, setDateLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchAll = async () => {
    setLoading(true);
    const [system, medical] = await Promise.all([getSystemLogs(), getMedicalRecordLogs()]);
    setSystemLogs(system);
    setMedicalLogs(medical);
    setLoading(false);
  };

  useEffect(() => {
    void fetchAll();
  }, []);

  const loadByUser = async () => {
    const userId = form.getFieldValue("userId");
    if (!userId) return;
    setLoading(true);
    setUserLogs(await getAuditByUser(userId));
    setLoading(false);
  };

  const loadByDate = async () => {
    const values = form.getFieldsValue();
    const tuNgay = values.tuNgay ? dayjs(values.tuNgay).toISOString() : undefined;
    const denNgay = values.denNgay ? dayjs(values.denNgay).toISOString() : undefined;
    setLoading(true);
    setDateLogs(await getAuditByDateRange(tuNgay, denNgay));
    setLoading(false);
  };

  const systemColumns = [
    {
      title: "Thời gian",
      dataIndex: "thoiGian",
      render: (v: string) => (v ? dayjs(v).format("DD/MM/YYYY HH:mm") : "--"),
    },
    {
      title: "Người dùng",
      dataIndex: "tenNguoiDung",
      render: (v: string) => v || "--",
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (v: string) => <Tag color="blue">{v || "--"}</Tag>,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (v: string) => v || "--",
    },
  ];

  const medicalColumns = [
    {
      title: "Hồ sơ bệnh án ID",
      dataIndex: "hoSoBenhAnId",
      width: 260,
      render: (v: string) => v || "--",
    },
    {
      title: "Thời gian",
      dataIndex: "thoiGianSua",
      render: (v: string) => (v ? dayjs(v).format("DD/MM/YYYY HH:mm") : "--"),
    },
    {
      title: "Người sửa",
      dataIndex: "tenNguoiSua",
      render: (v: string) => v || "--",
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (v: string) => <Tag color="blue">{v || "--"}</Tag>,
    },
    {
      title: "Chẩn đoán cũ",
      dataIndex: "chanDoanCu",
      render: (v: string) => v || "--",
    },
    {
      title: "Kết quả cũ",
      dataIndex: "ketQuaCu",
      render: (v: string) => v || "--",
    },
  ];

  return (
    <div style={{ padding: 20, background: "#f5f7fb", minHeight: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>Audit Log</Typography.Title>

      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="userId" label="User ID">
          <Input placeholder="Nhập user id" style={{ width: 220 }} />
        </Form.Item>
        <Button onClick={loadByUser}>Lọc theo user</Button>
        <Form.Item name="tuNgay" label="Từ ngày">
          <DatePicker />
        </Form.Item>
        <Form.Item name="denNgay" label="Đến ngày">
          <DatePicker />
        </Form.Item>
        <Button onClick={loadByDate}>Lọc theo ngày</Button>
        <Button onClick={() => void fetchAll()}>Tải lại</Button>
      </Form>

      <Tabs
        items={[
          {
            key: "system",
            label: "System logs",
            children: (
              <Table
                rowKey={(r, i) => `${r.id ?? "system"}-${i}`}
                loading={loading}
                dataSource={systemLogs}
                columns={systemColumns}
                pagination={{ pageSize: 10 }}
              />
            ),
          },
          {
            key: "medical",
            label: "HSBA logs",
            children: (
              <Table
                rowKey={(r, i) => `${r.id ?? "medical"}-${i}`}
                loading={loading}
                dataSource={medicalLogs}
                columns={medicalColumns}
                pagination={{ pageSize: 10 }}
              />
            ),
          },
          {
            key: "user",
            label: "Theo user",
            children: (
              <Table
                rowKey={(r, i) => `${r.id ?? "user"}-${i}`}
                loading={loading}
                dataSource={userLogs}
                columns={systemColumns}
                pagination={{ pageSize: 10 }}
              />
            ),
          },
          {
            key: "date",
            label: "Theo ngày",
            children: (
              <Table
                rowKey={(r, i) => `${r.id ?? "date"}-${i}`}
                loading={loading}
                dataSource={dateLogs}
                columns={systemColumns}
                pagination={{ pageSize: 10 }}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AuditLogPage;
