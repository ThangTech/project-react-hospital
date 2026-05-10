import { Form, Input, Modal, Select, type FormInstance } from "antd";
import type { BacSi, NhapVien } from "../../types";

interface Props {
  open: boolean;
  form: FormInstance;
  admissions: NhapVien[];
  doctors: BacSi[];
  onCancel: () => void;
  onFinish: (values: any) => Promise<void>;
}

const CreateMedicalRecordModal = ({
  open,
  form,
  admissions,
  doctors,
  onCancel,
  onFinish,
}: Props) => {
  return (
    <Modal
      title="Tạo hồ sơ bệnh án mới"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Tạo hồ sơ"
      cancelText="Hủy"
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="nhapVienId"
          label="Phiếu nhập viện"
          rules={[{ required: true, message: "Vui lòng chọn phiếu nhập viện" }]}
        >
          <Select
            showSearch
            placeholder="Chọn phiếu nhập viện (tên bệnh nhân)"
            optionFilterProp="label"
            options={admissions
              .filter((a) => a.trangThai === "Đang điều trị" || a.trangThai === "Chờ xuất viện")
              .map((a) => ({
                label: `${a.tenBenhNhan} – ${a.tenKhoa} [${a.trangThai}]`,
                value: a.id,
              }))}
          />
        </Form.Item>

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
      </Form>
    </Modal>
  );
};

export default CreateMedicalRecordModal;
