import { ArrowLeftOutlined} from "@ant-design/icons";
import {
       Avatar,
       Button,
       Card,
       Col,
       Descriptions,
       Empty,
       Row,
       Skeleton,
       Space,
       Tag,
       Typography,
} from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById } from "../../services/api.patient.service";
import { useEffect, useState } from "react";
import type { BenhNhan } from "../../types";

const PatientDetailPage = () => {
       const { id } = useParams();
       const navigate = useNavigate();
       const [dataDetail, setDataDetail] = useState<BenhNhan | null>(null);
       const [loading, setLoading] = useState(false);
       const [age, setAge] = useState("--");
       const [insuranceRate, setInsuranceRate] = useState("--");
       const [insuranceExpiry, setInsuranceExpiry] = useState("--");
  const [isInsuranceExpired, setIsInsuranceExpired] = useState<boolean | null>(null);

  const resolveImageUrl = (url?: string | null) => {
    if (!url) return undefined;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) return url;
    const baseUrl = import.meta.env.VITE_PATIENT_FILE_BASE_URL || import.meta.env.VITE_BACKEND_URL || "";
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

       useEffect(() => {
              getById();
       }, [id]);

       const getById = async () => {
              if (!id) return;
              setLoading(true);
              try {
                     const res = await getPatientById(id);
                     if (res?.data) {
                            setDataDetail(res.data)
                            console.log(dataDetail?.avatar);
                     }
              } catch (error) {
                     console.log(error);
              } finally {
                     setLoading(false);
              }
       };

       useEffect(() => {
              if (!dataDetail) {
                     setAge("--");
                     setInsuranceRate("--");
                     setInsuranceExpiry("--");
                     setIsInsuranceExpired(null);
                     return;
              }

              if (dataDetail.ngaySinh) {
                     setAge(`${dayjs().diff(dayjs(dataDetail.ngaySinh), "year")} tuổi`);
              } else {
                     setAge("--");
              }

              if (dataDetail.mucHuong === null || dataDetail.mucHuong === undefined) {
                     setInsuranceRate("--");
              } else {
                     setInsuranceRate(`${(dataDetail.mucHuong * 100).toFixed(0)}%`);
              }

              if (!dataDetail.hanTheBHYT) {
                     setInsuranceExpiry("--");
                     setIsInsuranceExpired(null);
              } else {
                     setInsuranceExpiry(dayjs(dataDetail.hanTheBHYT).format("DD/MM/YYYY"));
                     setIsInsuranceExpired(dayjs(dataDetail.hanTheBHYT).isBefore(dayjs(), "day"));
              }
       }, [dataDetail]);

       const renderInsuranceTag = () => {
              if (!dataDetail?.hanTheBHYT) {
                     return <Tag>Chưa có thông tin</Tag>;
              }

              if (isInsuranceExpired) {
                     return <Tag color="red">Đã hết hạn</Tag>;
              }

              return <Tag color="green">Còn hiệu lực</Tag>;
       };

       const renderStatusTag = () => {
              if (!dataDetail?.trangThai) {
                     return <Tag>--</Tag>;
              }

              const color = dataDetail.trangThai === "Đang điều trị" ? "processing" : "success";

              return <Tag color={color}>{dataDetail.trangThai}</Tag>;
       };

       const insuranceTag = renderInsuranceTag();
       const statusTag = renderStatusTag();

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
              <Avatar
                src={resolveImageUrl(dataDetail.avatar)}
                size={120}
                style={{ backgroundColor: "#1677ff", fontSize: 34 }}
              >
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
                                                        {/* <Descriptions.Item label="Số điện thoại">
                  {dataDetail.soDienThoai ? (
                    <Space size={6}>
                      <PhoneOutlined />
                      <span>{dataDetail.soDienThoai}</span>
                    </Space>
                  ) : (
                    "--"
                  )}
                </Descriptions.Item> */}
                                                 </Descriptions>
                                          </Space>
                                   </Card>
                            </Col>

                            <Col xs={24} lg={16}>
                                   <Space direction="vertical" size={16} style={{ width: "100%" }}>
                                          <Card title="Thông tin cá nhân">
                                                 <Descriptions bordered column={1} labelStyle={{ width: 220, fontWeight: 600 }}>
                                                        <Descriptions.Item label="Họ và tên">{dataDetail.hoTen || "--"}</Descriptions.Item>
                                                        <Descriptions.Item label="Ngày sinh">
                                                               {dataDetail.ngaySinh ? dayjs(dataDetail.ngaySinh).format("DD/MM/YYYY") : "--"}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="Giới tính">{dataDetail.gioiTinh || "--"}</Descriptions.Item>
                                                        <Descriptions.Item label="Địa chỉ">{dataDetail.diaChi || "--"}</Descriptions.Item>
                                                        <Descriptions.Item label="Trạng thái điều trị">{statusTag}</Descriptions.Item>
                                                 </Descriptions>
                                          </Card>

                                          <Card title="Thông tin bảo hiểm y tế">
                                                 <Descriptions bordered column={1} labelStyle={{ width: 220, fontWeight: 600 }}>
                                                        <Descriptions.Item label="Số thẻ BHYT">{dataDetail.soTheBaoHiem || "--"}</Descriptions.Item>
                                                        <Descriptions.Item label="Mức hưởng">{insuranceRate}</Descriptions.Item>
                                                        <Descriptions.Item label="Hạn thẻ BHYT">{insuranceExpiry}</Descriptions.Item>
                                                        <Descriptions.Item label="Hiệu lực thẻ">{insuranceTag}</Descriptions.Item>
                                                 </Descriptions>
                                          </Card>

                                          <Card title="Điều trị và tài chính" extra={<Tag color="gold">Đang cập nhật</Tag>}>
                                                 <Typography.Paragraph style={{ marginBottom: 8 }}>
                                                        Khu vực này dành cho dữ liệu nhập viện, hồ sơ bệnh án, lịch phẫu thuật và hóa đơn theo bệnh nhân.
                                                 </Typography.Paragraph>
                                                 <Typography.Text type="secondary">
                                                        Gợi ý API cần ghép theo <code>benhNhanId</code>: Nhập viện, Hồ sơ bệnh án, Phẫu thuật, Hóa đơn.
                                                 </Typography.Text>
                                          </Card>
                                   </Space>
                            </Col>
                     </Row>
              </Space>
       );
};

export default PatientDetailPage;
