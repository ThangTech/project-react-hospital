import { Modal, Form, Input, Select, DatePicker, InputNumber, Upload, notification} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { BenhNhan } from "../../types";
import dayjs from 'dayjs';
import { updatePatient } from "../../services/api.patient.service";

interface Props {
       dataUpdate: BenhNhan | null;
       setDataUpdate: (value: BenhNhan | null) => void;
       id: string;
       setId: (value: string) => void;
       isModalUpdateOpen: boolean;
       setIsModalUpdateOpen: (value: boolean) => void;
       onSuccess?: () => void;
}
const UpdatePatientModal = ({dataUpdate, setDataUpdate, id, setId, isModalUpdateOpen, setIsModalUpdateOpen, onSuccess}: Props) => {
       useEffect(() => {
              if(dataUpdate){
                     setId(dataUpdate.id)

                     setImageUrl(dataUpdate.avatar || null);
                     form.setFieldsValue({
                            id: dataUpdate.id,
                            hoTen: dataUpdate.hoTen,
                            ngaySinh: dataUpdate.ngaySinh ? dayjs(dataUpdate.ngaySinh) : null,
                            gioiTinh: dataUpdate.gioiTinh,
                            diaChi: dataUpdate.diaChi,
                            soTheBaoHiem: dataUpdate.soTheBaoHiem,
                            mucHuong: dataUpdate.mucHuong != null ? dataUpdate.mucHuong * 100 : null,
                            hanTheBHYT: dataUpdate.hanTheBHYT ? dayjs(dataUpdate.hanTheBHYT) : null,
                            trangThai: dataUpdate.trangThai,
                            avatar: dataUpdate.avatar
                      }); 
              }
              // console.log("avatar:", dataUpdate?.avatar);
       }, [dataUpdate]);
       const [form] = Form.useForm();
       const [file, setFile] = useState<File | null>(null);
       const [imageUrl, setImageUrl] = useState<string | null>(null);


       const handleFinish = async (values: any) => {
              try {
                     const formData = new FormData();

                     formData.append("hoTen", values.hoTen);
                     formData.append("ngaySinh", values.ngaySinh?.format("YYYY-MM-DD") || "");
                     formData.append("gioiTinh", values.gioiTinh);
                     formData.append("diaChi", values.diaChi);
                     formData.append("soTheBaoHiem", values.soTheBaoHiem || "");
                     formData.append("mucHuong", values.mucHuong ? String(values.mucHuong / 100) : "");
                     formData.append("hanTheBHYT", values.hanTheBHYT?.format("YYYY-MM-DD") || "");
                     formData.append("trangThai", values.trangThai || "Đang điều trị");

                     if (file) {
                            formData.append("avatar", file);
                     }
                     const res = await updatePatient(dataUpdate!.id, formData);
                     console.log(res)
                     if (res) {
                            form.resetFields();
                            setFile(null);
                            setImageUrl(null);
                            setIsModalUpdateOpen(false);
                            notification.success({
                                 message: "Sửa bệnh nhân",
                                 description: "Sửa bệnh nhân thành công"  
                            });
                            onSuccess?.();
                     } else {
                            throw new Error("Sửa bệnh nhân thất bại");
                     }
              } catch (error) {
                     notification.error({
                          message: "Sửa bệnh nhân",
                          description: "Sửa bệnh nhân thất bại"  
                     })
                     console.error("Lỗi khi sửa bệnh nhân:", error);
              }
       };

       const handleCancel = () => {
              form.resetFields();
              setFile(null);
              setImageUrl(null);
              setIsModalUpdateOpen(false);
              setDataUpdate(null);
       };
       const beforeUpload = (uploadedFile: File) => {
               //loại file
               const isImage = uploadedFile.type.startsWith("image/");
               if (!isImage) {
                      notification.error({
                             message: "Sai định dạng ảnh",
                             description: "Vui lòng upload đúng định ảnh"
                      });
                      return Upload.LIST_IGNORE;
               }

               //Check dung lượng (< 2MB)
               const isLt2M = uploadedFile.size / 1024 / 1024 < 2;
               if (!isLt2M) {
                      notification.error({
                             message: "Tệp quá lớn",
                             description: "Tệp tải lên phải nhỏ hơn 2MB"
                      });
                      return Upload.LIST_IGNORE;
               }

              
               setFile(uploadedFile);
              
               const url = URL.createObjectURL(uploadedFile);
               setImageUrl(url);

               //Chặn auto upload (submit cùng form)
               return false;
}
       return (

              <>
                     <Modal
                            title="Sửa bệnh nhân"
                            open={isModalUpdateOpen}
                            onOk={() => form.submit()}
                            onCancel={handleCancel}
                            width={600}
                            okText="Xác nhận"
                            cancelText="Hủy"
                            style={{ top: 0 }}
                     >
                            <Form
                                   form={form}
                                   layout="vertical"
                                   onFinish={handleFinish}
                            >
                                   <Form.Item
                                          label="Mã bệnh nhân"
                                          name="id"
                                   >
                                          <Input value={id} disabled/>
                                   </Form.Item>
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
                                          label="Hạn thẻ BHYT"
                                          name="hanTheBHYT"
                                          rules={[{ required: false, message: "Vui lòng chọn hạn thẻ" }]}
                                   >
                                          <DatePicker
                                                 style={{ width: "100%" }}
                                                 format="YYYY-MM-DD"
                                                 placeholder="Chọn hạn thẻ"
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
                                                 beforeUpload={beforeUpload}
                                          >
                                                 {imageUrl ? (
                                                        <img
                                                               src={imageUrl}
                                                               alt="avatar"
                                                               style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                                                        />
                                                 ) : (
                                                        <div>
                                                               <PlusOutlined />
                                                               <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                                        </div>
                                                 )}
                                          </Upload>
                                   </Form.Item>
                            </Form>
                     </Modal>
              </>
       )
}
export default UpdatePatientModal