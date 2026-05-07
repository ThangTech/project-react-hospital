import { DatePicker, Form, Input, Modal, Select } from "antd";


export const TRANG_THAI_OPTIONS = [
  { label: "Đang điều trị", value: "Đang điều trị" },
  { label: "Đã xuất viện",  value: "Đã xuất viện" },
  { label: "Chờ xuất viện", value: "Chờ xuất viện" },
];

export const trangThaiColor = (tt: string): string => {
  switch (tt) {
    case "Đang điều trị":
      return "processing";
    case "Đã xuất viện":
      return "success";
    case "Chờ xuất viện":
      return "warning";
    default:
      return "default";
  }
};

// ─── Props ───────────────────────────────────────────────
interface Props {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => Promise<void>;
  form: ReturnType<typeof Form.useForm>[0];
}

// ─── Component ───────────────────────────────────────────
const EditAdmissionModal = ({ open, onCancel, onFinish, form }: Props) => {
  return (
    <Modal
      title="Cập nhật phiếu nhập viện"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Lưu thay đổi"
      cancelText="Hủy"
      width={480}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="lyDoNhap"
          label="Lý do nhập viện"
          rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="trangThai"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select options={TRANG_THAI_OPTIONS} />
        </Form.Item>

        <Form.Item
          name="ngayXuat"
          label="Ngày xuất viện (nếu có)"
        >
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAdmissionModal;
