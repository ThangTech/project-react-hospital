import { Button, Descriptions, Modal, Tag } from "antd";
import dayjs from "dayjs";
import type { HoSoBenhAn } from "../../../types";

interface Props {
  open: boolean;
  record: HoSoBenhAn | null;
  onClose: () => void;
  // Giữ lại để tương thích nếu tenBenhNhan/tenBacSi null thì fallback
  getTenBenhNhanFromAdm: (nhapVienId: string) => string;
  getTenBacSi: (id: string) => string;
  ketQuaColor: (kq: string | null) => string;
}

const MedicalRecordDetailModal = ({
  open,
  record,
  onClose,
  getTenBenhNhanFromAdm,
  getTenBacSi,
  ketQuaColor,
}: Props) => {
  if (!record) return null;

  // Ưu tiên dùng field join sẵn từ backend, fallback sang lookup
  const tenBenhNhan =
    record.tenBenhNhan ||
    (record.nhapVienId ? getTenBenhNhanFromAdm(record.nhapVienId) : "--");

  const tenBacSi =
    record.tenBacSi ||
    (record.bacSiPhuTrachId ? getTenBacSi(record.bacSiPhuTrachId) : "--");

  return (
    <Modal
      title="Chi tiết hồ sơ bệnh án"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={700}
    >
      <Descriptions
        bordered
        column={1}
        size="small"
        styles={{ label: { width: 190 } }}
      >
        <Descriptions.Item label="Bệnh nhân">{tenBenhNhan}</Descriptions.Item>

        <Descriptions.Item label="Bác sĩ phụ trách">{tenBacSi}</Descriptions.Item>

        <Descriptions.Item label="Khoa / Giường">
          {[record.tenKhoa, record.tenGiuong].filter(Boolean).join(" – ") || "--"}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày nhập viện">
          {record.ngayNhap ? dayjs(record.ngayNhap).format("DD/MM/YYYY") : "--"}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày lập hồ sơ">
          {record.ngayLap ? dayjs(record.ngayLap).format("DD/MM/YYYY HH:mm") : "--"}
        </Descriptions.Item>

        <Descriptions.Item label="Lý do nhập viện">
          {record.lyDoNhap || <span style={{ color: "#aaa" }}>Không có</span>}
        </Descriptions.Item>

        <Descriptions.Item label="Tiền sử bệnh">
          {record.tienSuBenh || <span style={{ color: "#aaa" }}>Không có</span>}
        </Descriptions.Item>

        <Descriptions.Item label="Chẩn đoán ban đầu">
          {record.chanDoanBanDau || <span style={{ color: "#aaa" }}>Chưa cập nhật</span>}
        </Descriptions.Item>

        <Descriptions.Item label="Phương án điều trị">
          {record.phuongAnDieuTri || <span style={{ color: "#aaa" }}>Chưa cập nhật</span>}
        </Descriptions.Item>

        <Descriptions.Item label="Chẩn đoán ra viện">
          {record.chanDoanRaVien || <span style={{ color: "#aaa" }}>Chưa cập nhật</span>}
        </Descriptions.Item>

        <Descriptions.Item label="Kết quả điều trị">
          {record.ketQuaDieuTri ? (
            <Tag color={ketQuaColor(record.ketQuaDieuTri)}>
              {record.ketQuaDieuTri}
            </Tag>
          ) : (
            <span style={{ color: "#aaa" }}>Đang điều trị</span>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default MedicalRecordDetailModal;
