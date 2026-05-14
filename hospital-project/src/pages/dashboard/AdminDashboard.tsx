import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Column } from "@ant-design/charts";
import StatCard from "../../components/shared/StatCard";
import { getAllBeds, getAllDepartments } from "../../services/api.bed-department.service";
import { getAllInvoices } from "../../services/api.invoice.service";
import { getAllPatients } from "../../services/api.patient.service";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [patientCount, setPatientCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [freeBedCount, setFreeBedCount] = useState(0);
  const [occupiedBedCount, setOccupiedBedCount] = useState(0);
  const [departmentBeds, setDepartmentBeds] = useState<any[]>([]);

  const fetchStats = async () => {
    const [patients, beds, departments, invoices] = await Promise.all([
      getAllPatients(),
      getAllBeds(),
      getAllDepartments(),
      getAllInvoices(),
    ]);

    let freeBeds = 0;
    let occupiedBeds = 0;
    const bedMap: Record<string, number> = {};

    for (const bed of beds) {
      if (bed.trangThai === "Trống") {
        freeBeds += 1;
      } else {
        occupiedBeds += 1;
      }

      const departmentName = bed.khoa?.tenKhoa || "Chưa rõ";
      if (!bedMap[departmentName]) {
        bedMap[departmentName] = 0;
      }
      bedMap[departmentName] += 1;
    }

    const chartRows = Object.keys(bedMap).map((name) => ({
      name,
      value: bedMap[name],
    }));

    setPatientCount(patients.length);
    setBedCount(beds.length);
    setDepartmentCount(departments.length);
    setInvoiceCount(invoices.length);
    setFreeBedCount(freeBeds);
    setOccupiedBedCount(occupiedBeds);
    setDepartmentBeds(chartRows);
  };

  useEffect(() => {
    void fetchStats();
  }, []);

  const occupancyData = [
    { type: "Trống", value: freeBedCount },
    { type: "Đang dùng", value: occupiedBedCount },
  ];

  const occupancyConfig = {
    data: occupancyData,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.65,
    label: {
      text: "value",
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: 5,
      },
    },
  };

  const bedColumnConfig = {
    data: departmentBeds,
    xField: "name",
    yField: "value",
    label: {
      position: "top",
      text: (d: any) => `${d.value}`,
    },
    columnWidthRatio: 0.6,
  };

  return (
    <div style={{ padding: 20, background: "#f5f7fb", minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        <p style={{ marginTop: 6, color: "#666" }}>Tổng quan hệ thống bệnh viện</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <StatCard icon="BN" value={patientCount} label="Bệnh nhân" />
        <StatCard icon="GB" value={bedCount} label="Giường bệnh" />
        <StatCard icon="Trống" value={freeBedCount} label="Giường trống" />
        <StatCard icon="KP" value={departmentCount} label="Khoa phòng" />
      </div>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 16,
        }}
      >
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Điều hướng nhanh</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/dashboard/patients")}>Bệnh nhân</button>
            <button onClick={() => navigate("/dashboard/admissions")}>Nhập viện</button>
            <button onClick={() => navigate("/dashboard/medical-records")}>HSBA</button>
            <button onClick={() => navigate("/dashboard/surgeries")}>Phẫu thuật</button>
            <button onClick={() => navigate("/dashboard/invoices")}>Hóa đơn</button>
            <button onClick={() => navigate("/dashboard/reports")}>Báo cáo</button>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 8, color: "#666" }}>Trạng thái hệ thống</div>
            <div style={{ display: "grid", gap: 8 }}>
              <div>Tổng hóa đơn: {invoiceCount}</div>
              <div>Tổng khoa phòng: {departmentCount}</div>
              <div>Tổng giường: {bedCount}</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Việc cần xem</h3>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ padding: 12, background: "#f8fafc", borderRadius: 8 }}>
              Còn {freeBedCount} giường trống
            </div>
            <div style={{ padding: 12, background: "#f8fafc", borderRadius: 8 }}>
              {patientCount} bệnh nhân đang trong hệ thống
            </div>
            <div style={{ padding: 12, background: "#f8fafc", borderRadius: 8 }}>
              {invoiceCount} hóa đơn đã ghi nhận
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Công suất giường</h3>
          <Pie {...occupancyConfig} />
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Giường theo khoa</h3>
          <Column {...bedColumnConfig} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
