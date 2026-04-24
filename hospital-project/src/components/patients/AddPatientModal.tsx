import { Modal, Form, Input, Select, DatePicker, InputNumber, Upload } from "antd";
import { createPatient } from "../../services/api.patient.service";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
interface Props {
       isModalOpen: boolean;
       setIsModalOpen: (value: boolean) => void;
}

const AddPatientModal = ({ isModalOpen, setIsModalOpen }: Props) => {
       const [form] = Form.useForm();
       const [file, setFile] = useState<any>(null);

       
       const handleFinish = async (values: any) => {
              try {
                     console.log(values)
              } catch (error) {
                     console.error("Lỗi khi thêm bệnh nhân:", error);
              }
       };

       const handleCancel = () => {
              form.resetFields();
              setIsModalOpen(false);
       };
       const handleChange = (info: any) => {
              setFile(info.file.originFileObj);
       };
       return (
              <Modal
                     title="Thêm bệnh nhân"
                     open={isModalOpen}
                     onOk={() => form.submit()}
                     onCancel={handleCancel}
                     width={600}
                     okText="Thêm"
                     cancelText="Hủy"
                     style={{ top: 0 }}
              >
                     <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                     >
                            <Form.Item
                                   label="Họ tên"
                                   name="hoTen"
                                   rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                            >
                                   <Input placeholder="Nhập họ tên bệnh nhân" />
                            </Form.Item>

                            <Form.Item
                                   label="Ngày sinh"
                                   name="ngaySinh"
                                   rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                            >
                                   <DatePicker
                                          style={{ width: "100%" }}
                                          format="YYYY-MM-DD"
                                          placeholder="Chọn ngày sinh"
                                   />
                            </Form.Item>

                            <Form.Item
                                   label="Giới tính"
                                   name="gioiTinh"
                                   rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                            >
                                   <Select placeholder="Chọn giới tính">
                                          <Select.Option value="Nam">Nam</Select.Option>
                                          <Select.Option value="Nữ">Nữ</Select.Option>
                                   </Select>
                            </Form.Item>

                            <Form.Item
                                   label="Địa chỉ"
                                   name="diaChi"
                                   rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                            >
                                   <Input placeholder="Nhập địa chỉ" />
                            </Form.Item>

                            <Form.Item
                                   label="Số thẻ bảo hiểm"
                                   name="soTheBaoHiem"
                            >
                                   <Input placeholder="Nhập số thẻ bảo hiểm" />
                            </Form.Item>

                            <Form.Item
                                   label="Mức hưởng (%)"
                                   name="mucHuong"
                            >
                                   <InputNumber
                                          min={0}
                                          max={100}
                                          style={{ width: "100%" }}
                                          placeholder="Nhập mức hưởng bảo hiểm"
                                   />
                            </Form.Item>

                            <Form.Item
                                   label="Trạng thái"
                                   name="trangThai"
                                   initialValue="Đang điều trị"
                            >
                                   <Select placeholder="Chọn trạng thái">
                                          <Select.Option value="Đang điều trị">Đang điều trị</Select.Option>
                                          <Select.Option value="Đã xuất viện">Đã xuất viện</Select.Option>
                                   </Select>
                            </Form.Item>
                            <Form.Item label="Ảnh đại diện" name="avatar">
                                   <Upload
                                          listType="picture-card"
                                          showUploadList={false}
                                          // beforeUpload={beforeUpload}
                                          onChange={handleChange}
                                   >
                                          <UploadOutlined />Tải ảnh lên
                                   </Upload>
                            </Form.Item>
                     </Form>
              </Modal>
       );
};

export default AddPatientModal;