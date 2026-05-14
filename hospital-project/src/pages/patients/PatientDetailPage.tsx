import { ArrowLeftOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Descriptions, Empty, Row, Skeleton, Space, Tag, Tabs, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAdmissions } from "../../services/api.admission.service";
import { getAllInvoices } from "../../services/api.invoice.service";
import { getAllMedicalRecords } from "../../services/api.medical-record.service";
import { getAllSurgeries } from "../../services/api.surgery.service";
import { getPatientById } from "../../services/api.patient.service";
import type { BenhNhan, HoaDon, HoSoBenhAn, LichPhauThuat, NhapVien } from "../../types";

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataDetail, setDataDetail] = useState<BenhNhan | null>(null);
  const [loading, setLoading] = useState(false);
  const [admissions, setAdmissions] = useState<NhapVien[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<HoSoBenhAn[]>([]);
  const [surgeries, setSurgeries] = useState<LichPhauThuat[]>([]);
  const [invoices, setInvoices] = useState<HoaDon[]>([]);

  const resolveImageUrl = (url?: string | null) => {
    if (!url) return undefined;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) return url;
    const baseUrl = import.meta.env.VITE_PATIENT_FILE_BASE_URL || import.meta.env.VITE_BACKEND_URL || "";
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const loadAll = async () => {
    if (!id) return;
    setLoading(true);

    const [patientRes, admissionList, medicalList, surgeryList, invoiceList] = await Promise.all([
      getPatientById(id),
      getAllAdmissions(),
      getAllMedicalRecords(),
      getAllSurgeries(),
      getAllInvoices(),
    ]);

    if (patientRes?.data) {
      setDataDetail(patientRes.data);
    } else {
      setDataDetail(null);
    }

    setAdmissions(admissionList.filter((item) => item.benhNhanId === id));
    setMedicalRecords(medicalList.filter((item) => item.benhNhanId === id));
    setSurgeries(surgeryList.filter((item) => item.benhNhanId === id));
    setInvoices(invoiceList.filter((item) => item.benhNhanId === id));
    setLoading(false);
  };

  useEffect(() => {
    void loadAll();
  }, [id]);

  let age = "--";
  if (dataDetail?.ngaySinh) {
    age = `${dayjs().diff(dayjs(dataDetail.ngaySinh), "year")} tuổi`;
  }

  let insuranceRate = "--";
  if (dataDetail?.mucHuong !== null && dataDetail?.mucHuong !== undefined) {
    insuranceRate = `${(dataDetail.mucHuong * 100).toFixed(0)}%`;
  }

  let insuranceExpiry = "--";
  if (dataDetail?.hanTheBHYT) {
    insuranceExpiry = dayjs(dataDetail.hanTheBHYT).format("DD/MM/YYYY");
  }

  let insuranceTag = <Tag>Chưa có thông tin</Tag>;
  if (dataDetail?.hanTheBHYT) {
    if (dayjs(dataDetail.hanTheBHYT).isBefore(dayjs(), "day")) {
      insuranceTag = <Tag color="red">Đã hết hạn</Tag>;
    } else {
      insuranceTag = <Tag color="green">Còn hiệu lực</Tag>;
    }
  }

  let statusTag = <Tag>--</Tag>;
  if (dataDetail?.trangThai) {
    const color = dataDetail.trangThai === "Đang điều trị" ? "processing" : "success";
    statusTag = <Tag color={color}>{dataDetail.trangThai}</Tag>;
  }

  if (loading) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  if (!dataDetail) {
    return <Empty description="Không có dữ liệu bệnh nhân" />;
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%", padding: 20 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/dashboard/patients")}>
        Quay lại danh sách
      </Button>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card>
            <Space direction="vertical" size={16} style={{ width: "100%", alignItems: "center" }}>
              <Avatar src={resolveImageUrl(dataDetail.avatar)} size={120} style={{ backgroundColor: "#1677ff", fontSize: 34 }}>
                {dataDetail.hoTen?.charAt(0).toUpperCase()}
              </Avatar>
              <div style={{ textAlign: "center" }}>
                <Typography.Title level={4} style={{ marginBottom: 4 }}>
                  {dataDetail.hoTen}
                </Typography.Title>
                <Typography.Text type="secondary">Mã BN: {dataDetail.id}</Typography.Text>
              </div>
              {statusTag}
              <Descriptions size="small" column={1} labelStyle={{ fontWeight: 600 }} style={{ width: "100%" }}>
                <Descriptions.Item label="Giới tính">{dataDetail.gioiTinh || "--"}</Descriptions.Item>
                <Descriptions.Item label="Tuổi">{age}</Descriptions.Item>
              </Descriptions>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Tabs
            items={[
              {
                key: "info",
                label: "Thông tin cá nhân",
                children: (
                  <Card>
                    <Descriptions bordered column={1} labelStyle={{ width: 220, fontWeight: 600 }}>
                      <Descriptions.Item label="Họ và tên">{dataDetail.hoTen || "--"}</Descriptions.Item>
                      <Descriptions.Item label="Ngày sinh">{dataDetail.ngaySinh ? dayjs(dataDetail.ngaySinh).format("DD/MM/YYYY") : "--"}</Descriptions.Item>
                      <Descriptions.Item label="Giới tính">{dataDetail.gioiTinh || "--"}</Descriptions.Item>
                      <Descriptions.Item label="Địa chỉ">{dataDetail.diaChi || "--"}</Descriptions.Item>
                      <Descriptions.Item label="Trạng thái điều trị">{statusTag}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                ),
              },
              {
                key: "insurance",
                label: "BHYT",
                children: (
                  <Card>
                    <Descriptions bordered column={1} labelStyle={{ width: 220, fontWeight: 600 }}>
                      <Descriptions.Item label="Số thẻ BHYT">{dataDetail.soTheBaoHiem || "--"}</Descriptions.Item>
                      <Descriptions.Item label="Mức hưởng">{insuranceRate}</Descriptions.Item>
                      <Descriptions.Item label="Hạn thẻ BHYT">{insuranceExpiry}</Descriptions.Item>
                      <Descriptions.Item label="Hiệu lực thẻ">{insuranceTag}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                ),
              },
              {
                key: "admissions",
                label: "Nhập viện",
                children: (
                  <Card>
                    <TableList
                      columns={["Lý do nhập", "Ngày nhập", "Ngày xuất", "Trạng thái"]}
                      rows={admissions.map((item) => [
                        item.lyDoNhap || "--",
                        item.ngayNhap ? dayjs(item.ngayNhap).format("DD/MM/YYYY") : "--",
                        item.ngayXuat ? dayjs(item.ngayXuat).format("DD/MM/YYYY") : "--",
                        item.trangThai,
                      ])}
                    />
                  </Card>
                ),
              },
              {
                key: "medical",
                label: "HSBA",
                children: (
                  <Card>
                    <TableList
                      columns={["Bác sĩ", "Chẩn đoán", "Kết quả"]}
                      rows={medicalRecords.map((item) => [
                        item.tenBacSi || "--",
                        item.chanDoanBanDau || "--",
                        item.ketQuaDieuTri || "--",
                      ])}
                    />
                  </Card>
                ),
              },
              {
                key: "surgery",
                label: "Phẫu thuật",
                children: (
                  <Card>
                    <TableList
                      columns={["Loại phẫu thuật", "Ngày", "Trạng thái"]}
                      rows={surgeries.map((item) => [
                        item.loaiPhauThuat || "--",
                        item.ngay ? dayjs(item.ngay).format("DD/MM/YYYY") : "--",
                        item.trangThai || "--",
                      ])}
                    />
                  </Card>
                ),
              },
              {
                key: "invoice",
                label: "Hóa đơn",
                children: (
                  <Card>
                    <TableList
                      columns={["Ngày", "Tổng tiền", "Trạng thái"]}
                      rows={invoices.map((item) => [
                        item.ngay ? dayjs(item.ngay).format("DD/MM/YYYY") : "--",
                        (item.tongTien ?? 0).toLocaleString("vi-VN") + " đ",
                        item.trangThai,
                      ])}
                    />
                  </Card>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </Space>
  );
};

const TableList = ({ columns, rows }: { columns: string[]; rows: string[][] }) => (
  <div style={{ display: "grid", gap: 8 }}>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, 1fr)`, gap: 8, fontWeight: 600 }}>
      {columns.map((col) => (
        <div key={col}>{col}</div>
      ))}
    </div>
    {rows.length > 0 ? (
      rows.map((row, index) => (
        <div key={index} style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, 1fr)`, gap: 8, padding: 8, background: "#f8fafc", borderRadius: 8 }}>
          {row.map((cell, cellIndex) => (
            <div key={`${index}-${cellIndex}`}>{cell}</div>
          ))}
        </div>
      ))
    ) : (
      <Empty description="Chưa có dữ liệu" />
    )}
  </div>
);

export default PatientDetailPage;
