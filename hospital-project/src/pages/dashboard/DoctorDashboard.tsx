import { useEffect, useState } from "react";
import { Pie } from "@ant-design/charts";
import { getAllAdmissions } from "../../services/api.admission.service";
import { getAllDoctors } from "../../services/api.doctor.service";
import { getAllSurgeries } from "../../services/api.surgery.service";
import { getAllMedicalRecords } from "../../services/api.medical-record.service";

const DoctorDashboard = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [surgeryCount, setSurgeryCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [dischargedCount, setDischargedCount] = useState(0);
  const [admissionRows, setAdmissionRows] = useState<any[]>([]);

  const fetchStats = async () => {
    const [admissions, doctors, surgeries, medicalRecords] = await Promise.all([
      getAllAdmissions(),
      getAllDoctors(),
      getAllSurgeries(),
      getAllMedicalRecords(),
    ]);

    let active = 0;
    let discharged = 0;
    const rows: Record<string, number> = {};

    for (const item of admissions) {
      if (item.trangThai === "Đã xuất viện") {
        discharged += 1;
      } else {
        active += 1;
      }

      const dept = item.tenKhoa || "Chưa rõ";
      if (!rows[dept]) rows[dept] = 0;
      rows[dept] += 1;
    }

    for (const record of medicalRecords) {
      if ((record.trangThaiNhapVien || "").toLowerCase() === "đã xuất viện") {
        discharged += 1;
      } else {
        active += 1;
      }
    }

    setDoctorCount(doctors.length);
    setSurgeryCount(surgeries.length);
    setActiveCount(active);
    setDischargedCount(discharged);
    setAdmissionRows(
      Object.keys(rows).map((name) => ({ name, value: rows[name] })),
    );
  };

  useEffect(() => {
    void fetchStats();
  }, []);

  return (
    <div style={{ padding: 20, background: "#f5f7fb", minHeight: "100%" }}>
      <h2 style={{ marginTop: 0 }}>Doctor Dashboard</h2>
      <p style={{ color: "#666" }}>Tổng quan bác sĩ</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Bệnh nhân đang theo dõi</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{activeCount}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Đã xuất viện</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{dischargedCount}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Bác sĩ</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{doctorCount}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Ca phẫu thuật</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{surgeryCount}</div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Tình trạng bệnh nhân</h3>
          <Pie
            data={[
              { type: "Đang điều trị", value: activeCount },
              { type: "Đã xuất viện", value: dischargedCount },
            ]}
            angleField="value"
            colorField="type"
            innerRadius={0.6}
          />
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Nhập viện theo khoa</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {admissionRows.map((row) => (
              <div key={row.name} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{row.name}</span>
                <b>{row.value}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
