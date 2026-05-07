import { Form, Input, Modal, Select } from "antd";
import type { GiuongBenh, NhapVien } from "../../types";

interface Props {
  open: boolean;
  record: NhapVien | null;
  availableBeds: GiuongBenh[];
  onCancel: () => void;
  onFinish: (values: any) => Promise<void>;
  form: ReturnType<typeof Form.useForm>[0];
}

const TransferBedModal = ({
  open,
  record,
  availableBeds,
  onCancel,
  onFinish,
  form,
}: Props) => {
  return (
    <Modal
      title={`Chuyển giường — ${record?.tenBenhNhan ?? ""}`}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Xác nhận chuyển"
      cancelText="Hủy"
      width={480}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Giường hiện tại">
          <Input value={record?.tenGiuong ?? "--"} disabled />
        </Form.Item>

        <Form.Item
          name="giuongMoiId"
          label="Giường mới"
          rules={[{ required: true, message: "Vui lòng chọn giường mới" }]}
        >
          <Select
            showSearch
            placeholder="Chọn giường trống"
            optionFilterProp="label"
            options={availableBeds
              .filter((b) => b.id !== record?.giuongId)
              .map((b) => ({
                label: `${b.tenGiuong} — ${b.loaiGiuong}`,
                value: b.id,
              }))}
            notFoundContent="Không có giường trống khác"
          />
        </Form.Item>

        <Form.Item
          name="lyDoChuyenGiuong"
          label="Lý do chuyển giường"
          rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
        >
          <Input.TextArea rows={3} placeholder="Lý do chuyển giường..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransferBedModal;
