import { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import { getAllInvoices } from "../../services/api.invoice.service";

const AccountantDashboard = () => {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [invoiceRows, setInvoiceRows] = useState<any[]>([]);

  const fetchStats = async () => {
    const invoices = await getAllInvoices();

    let paid = 0;
    let unpaid = 0;

    for (const item of invoices) {
      if ((item.trangThai || "").toLowerCase().includes("đã")) {
        paid += 1;
      } else {
        unpaid += 1;
      }
    }

    setInvoiceCount(invoices.length);
    setPaidCount(paid);
    setUnpaidCount(unpaid);
    setInvoiceRows([
      { name: "Đã thanh toán", value: paid },
      { name: "Chưa thanh toán", value: unpaid },
    ]);
  };

  useEffect(() => {
    void fetchStats();
  }, []);

  const chartConfig = {
    data: invoiceRows,
    xField: "name",
    yField: "value",
    label: { position: "top", text: (d: any) => `${d.value}` },
  };

  return (
    <div style={{ padding: 20, background: "#f5f7fb", minHeight: "100%" }}>
      <h2 style={{ marginTop: 0 }}>Accountant Dashboard</h2>
      <p style={{ color: "#666" }}>Tổng quan kế toán</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Hóa đơn</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{invoiceCount}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Đã thanh toán</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{paidCount}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div>Chưa thanh toán</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{unpaidCount}</div>
        </div>
      </div>

      <div style={{ marginTop: 24, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Trạng thái hóa đơn</h3>
        <Column {...chartConfig} />
      </div>
    </div>
  );
};

export default AccountantDashboard;
