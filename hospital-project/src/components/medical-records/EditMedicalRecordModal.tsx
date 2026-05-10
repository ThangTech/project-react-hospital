import { Form, Input, Modal, Select, type FormInstance } from "antd";
import type { BacSi } from "../../types";

interface Props {
  open: boolean;
  form: FormInstance;
  doctors: BacSi[];
  onCancel: () => void;
  onFinish: (values: any) => Promise<void>;
}

const EditMedicalRecordModal = ({
  open,
  form,
  doctors,
  onCancel,
  onFinish,
}: Props) => {
  return (
    <Modal
      title="Cập nhật hồ sơ bệnh án"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Lưu thay đổi"
      cancelText="Hủy"
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="bacSiPhuTrachId"
          label="Bác sĩ phụ trách"
          rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
        >
          <Select
            showSearch
            placeholder="Chọn bác sĩ"
            optionFilterProp="label"
            options={doctors.map((d) => ({
              label: `${d.hoTen} – ${d.chuyenKhoa}`,
              value: d.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="tienSuBenh" label="Tiền sử bệnh">
          <Input.TextArea rows={2} placeholder="Nhập tiền sử bệnh..." />
        </Form.Item>

        <Form.Item name="chanDoanBanDau" label="Chẩn đoán ban đầu">
          <Input.TextArea rows={2} placeholder="Nhập chẩn đoán ban đầu..." />
        </Form.Item>

        <Form.Item name="phuongAnDieuTri" label="Phương án điều trị">
          <Input.TextArea rows={2} placeholder="Nhập phương án điều trị..." />
        </Form.Item>

        <Form.Item name="chanDoanRaVien" label="Chẩn đoán ra viện">
          <Input.TextArea rows={2} placeholder="Nhập chẩn đoán ra viện..." />
        </Form.Item>

        <Form.Item name="ketQuaDieuTri" label="Kết quả điều trị">
          <Input.TextArea rows={2} placeholder="Nhập kết quả điều trị..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMedicalRecordModal;
