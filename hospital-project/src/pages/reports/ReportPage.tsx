import { FileExcelOutlined, FilePdfOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Select, Space, Table, Tabs, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getAllDepartments } from "../../services/api.bed-department.service";
import {
  exportBedCapacityExcel,
  exportBedCapacityPdf,
  exportTreatmentCostExcel,
  exportTreatmentCostPdf,
  getBedCapacityReport,
  getTreatmentCostReport,
} from "../../services/api.report.service";
import type { KhoaPhong } from "../../types";

const ReportPage = () => {
  const [departments, setDepartments] = useState<KhoaPhong[]>([]);
  const [loading, setLoading] = useState(false);
  const [bedRows, setBedRows] = useState<any[]>([]);
  const [costRows, setCostRows] = useState<any[]>([]);
  const [form] = Form.useForm();

  const fetchDepartments = async () => {
    setDepartments(await getAllDepartments());
  };

  const toParams = () => {
    const values = form.getFieldsValue();
    const params = {
      tuNgay: values.tuNgay ? dayjs(values.tuNgay).toISOString() : undefined,
      denNgay: values.denNgay ? dayjs(values.denNgay).toISOString() : undefined,
      khoaId: values.khoaId,
    };
    return params;
  };

  const normalizeBedRows = (data: any) => {
    if (Array.isArray(data?.departmentStats)) return data.departmentStats;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data)) return data;
    return [];
  };

  const normalizeCostRows = (data: any) => {
    if (Array.isArray(data?.chiPhiTheoKhoa)) return data.chiPhiTheoKhoa;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data)) return data;
    return [];
  };

  const fetchReports = async () => {
    setLoading(true);
    const params = toParams();
    const [bed, cost] = await Promise.all([
      getBedCapacityReport(params),
      getTreatmentCostReport(params),
    ]);
    setBedRows(normalizeBedRows(bed));
    setCostRows(normalizeCostRows(cost));
    setLoading(false);
  };

  useEffect(() => {
    void fetchDepartments();
    void fetchReports();
  }, []);

  const downloadBlob = async (res: any, name: string) => {
    const blob = new Blob([res.data], { type: res.headers?.["content-type"] || "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const exportBed = async (kind: "excel" | "pdf") => {
    const params = toParams();
    let res;
    if (kind === "excel") {
      res = await exportBedCapacityExcel(params);
    } else {
      res = await exportBedCapacityPdf(params);
    }
    await downloadBlob(res, `cong-suat-giuong.${kind === "excel" ? "xlsx" : "pdf"}`);
  };

  const exportCost = async (kind: "excel" | "pdf") => {
    const params = toParams();
    let res;
    if (kind === "excel") {
      res = await exportTreatmentCostExcel(params);
    } else {
      res = await exportTreatmentCostPdf(params);
    }
    await downloadBlob(res, `chi-phi-dieu-tri.${kind === "excel" ? "xlsx" : "pdf"}`);
  };

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Báo cáo
        </Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={() => void fetchReports()}>
          Tải lại
        </Button>
      </Space>

      <Form form={form} layout="inline">
        <Form.Item name="tuNgay" label="Từ ngày">
          <DatePicker />
        </Form.Item>
        <Form.Item name="denNgay" label="Đến ngày">
          <DatePicker />
        </Form.Item>
        <Form.Item name="khoaId" label="Khoa">
          <Select
            style={{ width: 220 }}
            allowClear
            options={departments.map((d) => ({
              value: d.id,
              label: d.tenKhoa,
            }))}
          />
        </Form.Item>
      </Form>

      <Tabs
        items={[
          {
            key: "bed",
            label: "Công suất giường",
            children: (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                  <Button type="primary" onClick={() => void fetchReports()}>Xem báo cáo</Button>
                  <Button icon={<FileExcelOutlined />} onClick={() => void exportBed("excel")}>Excel</Button>
                  <Button icon={<FilePdfOutlined />} onClick={() => void exportBed("pdf")}>PDF</Button>
                </Space>
                <Table
                  rowKey={(r, i) => `${r.id ?? "bed"}-${i}`}
                  loading={loading}
                  dataSource={bedRows}
                  columns={[
                    { title: "Khoa", dataIndex: "tenKhoa" },
                    { title: "Tổng giường", dataIndex: "tongGiuong" },
                    { title: "Giường trống", dataIndex: "giuongTrong" },
                    { title: "Giường dùng", dataIndex: "giuongDangDung" },
                    {
                      title: "Tỷ lệ",
                      dataIndex: "tyLeSuDung",
                      render: (v: number) => `${Number(v ?? 0).toFixed(0)}%`,
                    },
                  ]}
                  pagination={false}
                />
              </Space>
            ),
          },
          {
            key: "cost",
            label: "Chi phí điều trị",
            children: (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                  <Button type="primary" onClick={() => void fetchReports()}>Xem báo cáo</Button>
                  <Button icon={<FileExcelOutlined />} onClick={() => void exportCost("excel")}>Excel</Button>
                  <Button icon={<FilePdfOutlined />} onClick={() => void exportCost("pdf")}>PDF</Button>
                </Space>
                <Table
                  rowKey={(r, i) => `${r.id ?? "cost"}-${i}`}
                  loading={loading}
                  dataSource={costRows}
                  columns={[
                    { title: "Khoa", dataIndex: "tenKhoa" },
                    { title: "Lượt điều trị", dataIndex: "soLuotDieuTri" },
                    {
                      title: "Dịch vụ/giường",
                      dataIndex: "tongChiPhiDichVu",
                      render: (v: number) =>
                        (v ?? 0).toLocaleString("vi-VN") + " đ",
                    },
                    {
                      title: "Phẫu thuật/thủ thuật",
                      dataIndex: "tongChiPhiPhauThuat",
                      render: (v: number) =>
                        (v ?? 0).toLocaleString("vi-VN") + " đ",
                    },
                    {
                      title: "Xét nghiệm",
                      dataIndex: "tongChiPhiXetNghiem",
                      render: (v: number) =>
                        (v ?? 0).toLocaleString("vi-VN") + " đ",
                    },
                    {
                      title: "Tổng cộng",
                      dataIndex: "tongCong",
                      render: (v: number) =>
                        (v ?? 0).toLocaleString("vi-VN") + " đ",
                    },
                  ]}
                  pagination={false}
                />
              </Space>
            ),
          },
        ]}
      />
    </Space>
  );
};

export default ReportPage;
