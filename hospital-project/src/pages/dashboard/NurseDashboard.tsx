import { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import { getAllAdmissions } from "../../services/api.admission.service";
import { getAllBeds } from "../../services/api.bed-department.service";

const NurseDashboard = () => {
  const [newAdmissionCount, setNewAdmissionCount] = useState(0);
  const [freeBedCount, setFreeBedCount] = useState(0);
  const [bedRows, setBedRows] = useState<any[]>([]);

  const fetchStats = async () => {
    const [admissions, beds] = await Promise.all([getAllAdmissions(), getAllBeds()]);

    let active = 0;
    const rows: Record<string, number> = {};

    for (const item of admissions) {
      if (item.trangThai === "Đang điều trị" || item.trangThai === "Chờ xuất viện") {
        active += 1;
      }
    }

    let freeBeds = 0;
    for (const bed of beds) {
      if (bed.trangThai === "Trống") {
        freeBeds += 1;
      }

      const dept = bed.khoa?.tenKhoa || "Chưa rõ";
      if (!rows[dept]) rows[dept] = 0;
      rows[dept] += 1;
    }

    setNewAdmissionCount(active);
    setFreeBedCount(freeBeds);
    setBedRows(Object.keys(rows).map((name) => ({ name, value: rows[name] })));
  };

  useEffect(() => {
    void fetchStats();
  }, []);

  const bedChartConfig = {
    data: bedRows,
    xField: "name",
    yField: "value",
    label: { position: "top", text: (d: any) => `${d.value}` },
  };

  return (
    <div style={{ padding: 20, background: "#f5f7fb", minHeight: "100%" }}>
      <h2 style={{ marginTop: 0 }}>Nurse Dashboard</h2>
      <p style={{ color: "#666" }}>Tổng quan điều dưỡng</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Nhập viện mới</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{newAdmissionCount}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Giường trống</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{freeBedCount}</div>
        </div>
      </div>

      <div style={{ marginTop: 24, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Giường theo khoa</h3>
        <Column {...bedChartConfig} />
      </div>
    </div>
  );
};

export default NurseDashboard;
