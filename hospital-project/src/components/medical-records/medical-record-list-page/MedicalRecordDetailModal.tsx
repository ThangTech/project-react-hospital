import { Button, Descriptions, Modal, Tag } from "antd";
import dayjs from "dayjs";
import type { HoSoBenhAn } from "../../../types";

interface Props {
  open: boolean;
  record: HoSoBenhAn | null;
  onClose: () => void;
  getTenBenhNhanFromAdm: (nhapVienId: string) => string;
  getTenBacSi: (id: string) => string;
  ketQuaColor: (kq: string | null) => string;
}

const MedicalRecordDetailModal = ({ open, record, onClose, getTenBenhNhanFromAdm, getTenBacSi, ketQuaColor }: Props) => {
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
      width={680}
    >
      {record && (
        <Descriptions bordered column={1} size="small" styles={{ label: { width: 180 } }}>
          <Descriptions.Item label="Bệnh nhân">{getTenBenhNhanFromAdm(record.nhapVienId)}</Descriptions.Item>
          <Descriptions.Item label="Bác sĩ phụ trách">{getTenBacSi(record.bacSiPhuTrachId)}</Descriptions.Item>
          <Descriptions.Item label="Ngày lập">{record.ngayLap ? dayjs(record.ngayLap).format("DD/MM/YYYY HH:mm") : "--"}</Descriptions.Item>
          <Descriptions.Item label="Tiền sử bệnh">{record.tienSuBenh || <span style={{ color: "#aaa" }}>Không có</span>}</Descriptions.Item>
          <Descriptions.Item label="Chẩn đoán ban đầu">{record.chanDoanBanDau || <span style={{ color: "#aaa" }}>Chưa cập nhật</span>}</Descriptions.Item>
          <Descriptions.Item label="Phương án điều trị">{record.phuongAnDieuTri || <span style={{ color: "#aaa" }}>Chưa cập nhật</span>}</Descriptions.Item>
          <Descriptions.Item label="Chẩn đoán ra viện">{record.chanDoanRaVien || <span style={{ color: "#aaa" }}>Chưa cập nhật</span>}</Descriptions.Item>
          <Descriptions.Item label="Kết quả điều trị">
            {record.ketQuaDieuTri ? <Tag color={ketQuaColor(record.ketQuaDieuTri)}>{record.ketQuaDieuTri}</Tag> : <span style={{ color: "#aaa" }}>Đang điều trị</span>}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default MedicalRecordDetailModal;
