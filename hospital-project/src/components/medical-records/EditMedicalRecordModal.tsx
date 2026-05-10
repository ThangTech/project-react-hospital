import { Alert, Form, Input, Modal, Select, type FormInstance } from "antd";
import type { BacSi } from "../../types";

interface Props {
  open: boolean;
  form: FormInstance;
  doctors: BacSi[];
  trangThaiNhapVien?: string | null; // Trạng thái nhập viện để enforce nghiệp vụ
  onCancel: () => void;
  onFinish: (values: any) => Promise<void>;
}

const EditMedicalRecordModal = ({
  open,
  form,
  doctors,
  trangThaiNhapVien,
  onCancel,
  onFinish,
}: Props) => {
  // Chỉ cho phép điền kết quả + chẩn đoán ra viện khi bệnh nhân "Chờ xuất viện"
  const coTheDienKetQua = trangThaiNhapVien === "Chờ xuất viện";

  return (
    <Modal
      title="Cập nhật hồ sơ bệnh án"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Lưu thay đổi"
      cancelText="Hủy"
      width={620}
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

        {/* ── Nhóm xuất viện: chỉ mở khi TrangThai = "Chờ xuất viện" ── */}
        {!coTheDienKetQua && (
          <Alert
            type="info"
            showIcon
            style={{ marginBottom: 12 }}
            message='Chẩn đoán ra viện và Kết quả điều trị chỉ được điền khi bệnh nhân ở trạng thái "Chờ xuất viện".'
          />
        )}

        <Form.Item name="chanDoanRaVien" label="Chẩn đoán ra viện">
          <Input.TextArea
            rows={2}
            placeholder={
              coTheDienKetQua
                ? "Nhập chẩn đoán ra viện..."
                : "Chưa đến giai đoạn xuất viện"
            }
            disabled={!coTheDienKetQua}
          />
        </Form.Item>

        <Form.Item name="ketQuaDieuTri" label="Kết quả điều trị">
          <Input.TextArea
            rows={2}
            placeholder={
              coTheDienKetQua
                ? "Ví dụ: Tốt, Khỏi, Nặng hơn..."
                : "Chưa đến giai đoạn xuất viện"
            }
            disabled={!coTheDienKetQua}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMedicalRecordModal;
