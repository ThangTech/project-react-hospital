import { Form, Input, Modal, Select } from "antd";
import type { BenhNhan, GiuongBenh, KhoaPhong } from "../../types";

interface Props {
  open: boolean;
  patients: BenhNhan[];
  departments: KhoaPhong[];
  availableBeds: GiuongBenh[];
  onCancel: () => void;
  onFinish: (values: any) => Promise<void>;
  form: ReturnType<typeof Form.useForm>[0];
}

const CreateAdmissionModal = ({
  open,
  patients,
  departments,
  availableBeds,
  onCancel,
  onFinish,
  form,
}: Props) => {
  return (
    <Modal
      title="Nhập viện mới"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Xác nhận nhập viện"
      cancelText="Hủy"
      width={560}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="benhNhanId"
          label="Bệnh nhân"
          rules={[{ required: true, message: "Vui lòng chọn bệnh nhân" }]}
        >
          <Select
            showSearch
            placeholder="Chọn bệnh nhân"
            optionFilterProp="label"
            options={patients.map((p) => ({
              label: `${p.hoTen} — ${p.soDienThoai ?? ""}`,
              value: p.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="khoaId"
          label="Khoa"
          rules={[{ required: true, message: "Vui lòng chọn khoa" }]}
        >
          <Select
            showSearch
            placeholder="Chọn khoa"
            optionFilterProp="label"
            options={departments.map((d) => ({ label: d.tenKhoa, value: d.id }))}
          />
        </Form.Item>

        <Form.Item
          name="giuongId"
          label="Giường"
          rules={[{ required: true, message: "Vui lòng chọn giường" }]}
        >
          <Select
            showSearch
            placeholder="Chọn giường trống"
            optionFilterProp="label"
            options={availableBeds.map((b) => ({
              label: `${b.tenGiuong} — ${b.loaiGiuong}`,
              value: b.id,
            }))}
            notFoundContent="Không có giường trống"
          />
        </Form.Item>

        <Form.Item
          name="lyDoNhap"
          label="Lý do nhập viện"
          rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
        >
          <Input.TextArea rows={3} placeholder="Mô tả lý do nhập viện..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAdmissionModal;
